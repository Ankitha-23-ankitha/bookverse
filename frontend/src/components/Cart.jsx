import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../ContextApi/UserContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import 'reactjs-popup/dist/index.css';

export default function Cart({baseUrl}) {
    const [cartData, setCartData] = useState([]);
    const [totalCost, setTotalCost] = useState(0);

    const { userId, username, token } = useContext(UserContext);
    const navigate = useNavigate();

    React.useEffect(() => {
        getCartData();
    }, [userId]);

    React.useEffect(() => {
        setTotalCost(cartData.reduce((prev, item) => prev + item.total, 0));
    }, [cartData]);

    const getCartData = async () => {
        try {
            const res = await axios.post(`${baseUrl}cart/getCartData`, { userId });
            setCartData(res.data.cartData||[]);
        } catch (error) {
            console.log(error.message);
        }
    };

    const remove = async (bookId) => {
        try {
            const res = await axios.post(`${baseUrl}cart/removeFromCart`, { bookId, userId, username });
            setCartData(res.data.cartData|| []);
            toast(res.data.message);
        } catch (error) {
            console.log(error.message);
            setCartData([])
        }
    };


    return (
        <div className='p-3 row mx-auto' style={{ minHeight: '80vh' }}>
            {username !== '' ? (
                cartData.length > 0 ? (
                <>
                <div className='col-12 text-center h3 fw-bold'>Total items in cart: {cartData.length}</div>
                <div className='col-12 text-center h3 fw-bold'>Total cost : Rs. {totalCost}</div>

                <div className="col-12 text-center my-3">
                    <button 
                        className="btn btn-success text-white px-4 fw-semibold" 
                        onClick={()=>navigate('/bookverse/checkout', {state: {items: cartData, totalCost}})}
                    >
                        Proceed to Checkout
                    </button>
                </div>

                <div className="row justify-content-center">
                    {cartData.map((item, i) => (
                        <div className='col-lg-4 col-md-6 col-sm-12 d-flex my-2' key={i}>
                            <div className='card p-3 w-100 shadow-sm' style={{ backgroundColor: '#fce8dd', borderRadius: '10px', display: 'flex', flexDirection: 'row' }}>
                                <div className='col-4' style={{ flex: '0 0 40%' }}>
                                    <img
                                        src={item.image}
                                        className="card-img-top img-fluid rounded"
                                        alt=''
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                                        onClick={() => navigate(`/bookverse/explore/${item.bookName}`, { state: { book: item } })}
                                    />
                                </div>

                                <div 
                                    className='card-body p-3 col-auto d-flex flex-column justify-content-between' 
                                    style={{ flex: '1' }}
                                >
                                    <div>
                                        <div className='card-title fs-5 bookName fw-bold text-dark'>{item.bookName}</div>
                                        <div className='card-title fs-6 authorName text-muted'>By: {item.authorName}</div>
                                        <div className='card-title fs-4 text-danger fw-bold'>₹ {item.price}</div>
                                        <div className='fs-6'>Quantity: {item.quantity}</div>
                                        <div className='card-title fs-4 text-danger fw-bold'>Total: ₹ {item.total}</div>
                                    </div>

                                    <button className='btn btn-danger text-white fw-semibold' onClick={() => remove(item.bookId)}>
                                        <Trash2 />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                </>
                ) : (
                    <div className="text-center">Your Cart is Empty</div>
                )
            ) : (
                <div className='col-6 mx-auto d-flex flex-column gap-3 justify-content-center align-items-center'>
                    <div className='h4'>Seems like you are not logged in !</div>
                    <button className='btn btn-success' onClick={() => navigate("/bookverse/login")}>Login</button>
                </div>
            )}
            <ToastContainer />
        </div>
    );
}
