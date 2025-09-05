import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Register({baseUrl}) {

  const [data, setData] = React.useState({
    name: '',
    username: '',
    password: ''
  })

  const navigate = useNavigate()


  const changeFxn = (e)=>{
    e.preventDefault()
    const {name, value} = e.target
    setData((prev)=>{
      return{
      ...prev,
      [name]: value
    }})
  }

  const handleSubmit = async (e)=>{
    console.log(data)
    e.preventDefault()
    axios.post(`${baseUrl}auth/register`, {data})
      .then(res=>{
        console.log(res.data)
        alert(res.data.message)
        if(res.data.success) navigate('/bookverse/login')
      })
      .catch(err=>console.log(err))
  }

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
    <form 
        className="bg-light p-4 rounded shadow-lg text-center d-flex flex-column gap-3"
        style={{ width: '100%', maxWidth: '400px' }}
        onSubmit={handleSubmit}
    >
        <div className="h3 fw-bold">Register</div>

        <div className="fs-5 text-start">Name</div>
        <input
        name="name"
        type="text"
        value={data.name}
        onChange={changeFxn}
        className="form-control required"
        placeholder="Enter your name"
        />

        <div className="fs-5 text-start">Username</div>
        <input
        name="username"
        type="text"
        value={data.username}
        onChange={changeFxn}
        className="form-control required"
        placeholder="Enter your username"
        />

        <div className="fs-5 text-start">Password</div>
        <input
        type="password"
        name="password"
        value={data.password}
        onChange={changeFxn}
        className="form-control required"
        placeholder="Enter your password"
        />

        <button className="btn btn-success w-100 mt-2" type="submit">Register</button>
        <div className='d-flex'>
            <div className='me-2'>Already have an account ?</div>
            <a 
                className="" 
                type="button" 
                onClick={() => navigate('/bookverse/login')}
            >
                Login
            </a>
        </div>
    </form>
    </div>
  )
}
