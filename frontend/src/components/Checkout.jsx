import React, { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { UserContext } from '../ContextApi/UserContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

export default function Checkout({baseUrl}) {

    const location = useLocation()
    const navigate = useNavigate()

    const {items, totalCost} = location.state;

    React.useEffect(()=>{
        console.log('checkout')
        console.log(items)
    }
    , [items])
    
    const address = { city: 'Hyderabad', state: 'Telangana', pin: 501510 };

    const [paymentMethod, setPaymentMethod] = React.useState('cod');

    const { userId, username, token } = useContext(UserContext);

    const placeOrder = async () => {
        if (paymentMethod === 'stripe') {
            try {
                const response = await axios.post(`${baseUrl}order/stripe`, { books: items, userId, token, address }, { headers: token });
                if (response.data.success) {
                    window.location.replace(response.data.session_url);
                }
            } catch (error) {
                console.log(error.message);
            }
        } else {
            try {
                const response = await axios.post(`${baseUrl}order/cod`, { books: items, userId, token, address });
                if (response.data.success) {
                    toast(response.data.message);
                    navigate('/bookverse/orders');
                }
            } catch (error) {
                console.log(error.message);
            }
        }
    };

  return (
    <div className='p-3 row mx-auto' style={{minHeight: '80vh'}}>
        <div className='col-8 mx-auto'>
        {/* Table Header */}
            <div className='row border py-2 fw-bold text-center'>
                <div className='col-2'>Item</div>
                <div className='col-4'>Item Name</div>
                <div className='col-2'>Price</div>
                <div className='col-2'>Quantity</div>
                <div className='col-2'>Total</div>
            </div>

            {/* Table Body */}
            <div className='row'>
                {items.map((item, index) => (
                    <div key={index} className='row border py-2 mx-auto align-items-center text-center'>
                        <div className='col-2'>
                            <img src={item.image} alt={item.bookName} className="img-fluid" style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
                        </div>
                        <div className='col-4'>{item.bookName}</div>
                        <div className='col-2'>₹{item.price}</div>
                        <div className='col-2'>{item.quantity}</div>
                        <div className='col-2 fw-semibold'>₹{item.total}</div>
                    </div>
                ))}
            </div>
            <div className='row border py-2 fw-bold text-center'>
                <div className='ms-auto col-2'>Total</div>
                <div className='col-2'>₹{totalCost}</div>
            </div>
        </div>


      {/* Payment Method Selection */}
      <div className="col-12 d-flex justify-content-center my-3">
        <div className="d-flex align-items-center gap-4 border rounded p-3">
            <div className="form-check">
                <input className="form-check-input" type="radio" name="payment" 
                    value="stripe" checked={paymentMethod === "stripe"}
                    onChange={() => setPaymentMethod("stripe")} />
                <label className="form-check-label ms-2 fw-semibold">Stripe</label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="payment"
                    value="cod" checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")} />
                <label className="form-check-label ms-2 fw-semibold">Cash on Delivery</label>
            </div>
        </div>
    </div>
        <div className="col-12 text-center my-3">
            <button className="btn btn-success text-white px-4 fw-semibold" onClick={()=>placeOrder()}>
                Place Order
            </button>
        </div>
    </div>
  )
}
