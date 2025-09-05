import React from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../ContextApi/UserContext'
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'

export default function Book({baseUrl}) {
    
    
    const {username, userId, token} = useContext(UserContext)
    
    const location = useLocation();
    
    const {book} = location.state
    const navigate = useNavigate()

    React.useEffect(()=>console.log(book), [book])


    const [authorBooks, setAuthorBooks] = React.useState([]) 
    const [quantity, setQuantity] = React.useState(1) 

    function generateConsistentCost(id) {
        let hash = 0;
        for (let i = 0; i < id.length; i++) {
          hash = (hash << 5) - hash + id.charCodeAt(i);
          hash |= 0; 
        }
        const minCost = 200;
        const maxCost = 400;
        const price = minCost + (Math.abs(hash) % (maxCost - minCost + 1));
        return price;
      }

    const handleQuantityChange = (e) => {
        let value = parseInt(e.target.value, 10);
        if (isNaN(value) || value < 1) {
            value = 1; // Prevent negative or zero quantity
        }
        setQuantity(value);
    };
    

    const getData = async()=>{

        const author = book.authorName.trim().replace(/\s+/g, '+');
        const query=`https://www.googleapis.com/books/v1/volumes?q=+inauthor:${author}`

        console.log(query)
        const res = await fetch(query)
        const books = await res.json()

        if (books && books.items) {
            const formattedData = books.items
                  .filter(item=>item.volumeInfo.imageLinks?.thumbnail)
                  .map(item => (
                    {
                    bookId: item.id,
                    bookName: item.volumeInfo.title || "Unknown Title",
                    subtitle: item.volumeInfo.subtitle || 'Unknown Subtitle',
                    authorName: item.volumeInfo.authors ? item.volumeInfo.authors[0] : "Unknown Author",
                    image: item.volumeInfo.imageLinks?.thumbnail || "default_image_url",
                    description: item.volumeInfo?.description || 'Unknown description',
                    category: item.volumeInfo.categories ? item.volumeInfo.categories[0] : 'Unknown',
                    rating: item.volumeInfo.avgRating || 4,
                    language: item.volumeInfo.language,
                    pageCount: item.volumeInfo.pageCount,
                    publisher: item.volumeInfo.publisher || 'Unknown publisher',
                    publishedDate: item.volumeInfo.publishedDate,
                    price: generateConsistentCost(item.id)
                  }));
      
            setAuthorBooks(formattedData);
          } else {
            console.log("No books found");
          }
    }


    React.useEffect(()=>{
        getData();
        console.log(authorBooks)
      }, [])

    const addToCart = async ()=>{
        axios.post(`${baseUrl}cart/addToCart`, {book: {...book, quantity}, username})
            .then(res=>{
                console.log(res.data)
                toast(res.data.message)
            })
            .catch(err=>{
                console.log(err)
            })
    }

  return (
    <div className="my-3">
    <div 
        className="card flex-column flex-md-row align-items-center px-4 py-3 mx-auto shadow-lg"
        style={{ maxWidth: '90vw', backgroundColor: '#FFF3DA', borderRadius: '15px', border: 'none' }}
    >
        <img 
        className="rounded object-fit-cover mb-3 mb-md-0 col-auto shadow" 
        src={book.image} 
        style={{ width: '250px', height: '350px', objectFit: 'cover', borderRadius: '10px' }} 
        />
        <div className="card-body d-flex flex-column justify-content-between">
        <div>
            <div className="card-title h3 fw-bold text-success">{book.bookName}</div>
            <div className="card-text h5 text-muted">{book.subtitle}</div>
            <div className="card-text h5 text-primary">Author: {book.authorName}</div>
            <hr />
            <div className="card-text text-dark">{book.description.substring(0, 200)}...</div>
            <div className="mt-2">
            <div className="card-text"><strong>Publisher:</strong> {book.publisher}</div>
            <div className="card-text"><strong>Released:</strong> {book.publishedDate}</div>
            <div className="card-text"><strong>Rating:</strong> ⭐ {book.rating}</div>
            <div className="card-text"><strong>Pages:</strong> {book.pageCount}</div>
            <div className="card-text"><strong>Category:</strong> {book.category}</div>
            </div>
        </div>
        <div className="d-flex align-items-center mt-4 p-3 rounded shadow-sm" style={{ backgroundColor: '#FCE8DD' }}>
            <div className="card-text h3 text-danger fw-bold me-3">Rs. {book.price}/-</div>
            {/* <input type="number" className="form-control w-15 me-3" style={{ width: '60px' }} /> */}
            <input type="number" className="form-control w-15 me-3" style={{ width: '60px' }}
            value={quantity} onChange={handleQuantityChange} />
            <button className="btn btn-primary me-2" onClick={() => addToCart()}>Add to cart</button>
            <button className="btn btn-warning text-white ms-3" onClick={() => navigate('/bookverse/checkout', {state: {items: [{...book, quantity, total: book.price*quantity}], totalCost: book.price*quantity}})}>Buy now</button>
        </div>
        </div>
    </div>

    <div className="h3 mt-4">Related Books</div>
    <div className="row justify-content-center">
        {authorBooks.map((item, i) => (
        <div 
            className='card m-3 p-0 shadow-lg border-0 rounded-3 overflow-hidden book-card' 
            style={{ width: '16rem', minHeight: '30rem', backgroundColor: '#F5E6CC', transition: 'transform 0.3s ease' }}
            key={i}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
            <div style={{ height: '20rem', overflow: 'hidden' }}>
            <img 
                src={item.image} 
                className="card-img-top img-fluid" 
                alt={item.bookName} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            </div>
            <div className='card-body p-3 d-flex flex-column justify-content-between'>
            <div>
                <h5 className='card-title text-dark fw-bold'>{item.bookName}</h5>
                <p className='card-text text-muted small'>By: {item.authorName}</p>
                <p className='badge bg-secondary text-wrap'>{item.category}</p>
            </div>
            <div className='d-flex justify-content-between align-items-center mt-3'>
                <div className='fs-5 fw-bold text-primary'>₹ {item.price}</div>
                <button 
                    className='btn btn-outline-primary btn-sm'
                    onClick={() => navigate(`/bookverse/explore/${item.bookName}`, { state: { book: item }})}
                >
                    View Details
                </button>
            </div>
            </div>
        </div>
        ))}
    </div>
    <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        pauseOnHover={false}
        closeOnClick
        theme="light"
      />
    </div>
  )
}
