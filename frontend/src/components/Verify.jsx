import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../ContextApi/UserContext'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'

export default function Verify({baseUrl}) {

    const navigate = useNavigate()

    const [searchParams, setSearchParams] = useSearchParams()

    const {token, userId} = useContext(UserContext)

    const orderId = searchParams.get('orderId')
    const success = searchParams.get('success')
    
    const verifyPayment = async ()=>{
        try {
            const res = await axios.post(`${baseUrl}verifyStripe`, {orderId, success}, {headers: {token}})
            if(res.data.success){
                toast('Payment verified and order placed')
                navigate('/bookverse/orders')
            }else{
                toast('Payment unsuccesful order cancelled')
                navigate('/bookverse')
            }
        } catch (error) {
            console.log(error.message)
            navigate('/bookverse')
        }
    }
    React.useEffect(()=>{
        verifyPayment()
    }, [])

  return (
    <div style={{minHeight: '60vh'}}>
      verify
      <ToastContainer />
    </div>
  )
}
