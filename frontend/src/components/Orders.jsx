import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../ContextApi/UserContext'
import axios from 'axios'

export default function Orders({baseUrl}) {

  const {userId} = useContext(UserContext)
  const [orders, setOrders] = React.useState([])

  const getOrders = async () => {
    try {
      const response = await axios.post(`${baseUrl}order/getOrders`, { userId })
      console.log(response)
      if (response.data.success) {
        setOrders(response.data.orders)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  React.useEffect(() => {
    getOrders()
  }, [userId])

  return (
    <div className='p-3 row mx-auto' style={{ minHeight: '80vh' }}>
      <div className='col-12 text-center h3 fw-bold text-dark'>My Orders</div>
      <div className='row justify-content-center'>
        {
          orders.map((item, i) => (
            <div
              className='col-lg-4 col-md-6 col-sm-12 d-flex my-2'
              key={i}
            >
              <div
                className='card p-3 w-100 shadow-lg border-0'
                style={{
                  backgroundColor: '#F5E6CC',  // Matching Theme
                  borderRadius: '12px',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'stretch',
                  transition: 'transform 0.3s ease-in-out'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                {/* Book Image */}
                <div className='col-4' style={{ flex: '0 0 40%' }}>
                  <img
                    src={item.image}
                    className="card-img-top img-fluid rounded"
                    alt=''
                    style={{
                      width: '100%', height: '100%', objectFit: 'cover',
                      borderRadius: '10px', border: '2px solid #D4A373'
                    }}
                  />
                </div>

                {/* Book Details */}
                <div
                  className='card-body p-3 col-auto d-flex flex-column justify-content-between'
                  style={{ flex: '1' }}
                >
                  <div>
                    <div className='card-title fs-5 fw-bold text-dark'>{item.bookName}</div>
                    <div className='card-title fs-6 text-muted'>By: {item.authorName}</div>
                    <div className='fs-6 text-secondary'>{item.category}</div>
                    <div className='fs-6 fw-semibold'>Ordered: {item.date.split(' ').slice(0, 5).join(' ')}</div>
                    <div className='fs-6 fw-semibold'>Quantity: {item.quantity}</div>
                  </div>

                  <div className='mt-2'>
                    <div className='fs-4 text-danger fw-bold'>₹ {item.price}</div>
                    <div className='fs-4 text-danger fw-bold'>Total: ₹ {item.amount}</div>
                    <div className='fs-6 text-muted'>Payment: {item.paymentMethod}</div>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}
