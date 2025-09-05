import React from 'react'
import axios from 'axios'
import { useContext } from 'react'
import {UserContext} from '../ContextApi/UserContext'
import { useNavigate } from 'react-router-dom'

export default function Login({baseUrl}) {

    const [data, setData] = React.useState({
        username: '',
        password: ''
    })

    const navigate = useNavigate()

    const {setUsername, setToken, setName, setUserId, setIsAdmin} = useContext(UserContext)

    const changeFxn = (e)=>{
        const {name, value} = e.target
        setData(prev=>{
            return{
                ...prev,
                [name]: value
            }
        })
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        axios.post(`${baseUrl}auth/login`, {data})
            .then(res=>{
                console.log(res.data)
                if(res.data.success){
                    setUsername(res.data.username)
                    setToken(res.data.token)
                    setName(res.data.name)
                    setUserId(res.data.userId)
                    setIsAdmin(res.data.isAdmin)
                    localStorage.setItem('token', res.data.token)
                    localStorage.setItem('username', res.data.username)
                    localStorage.setItem('name', res.data.name)
                    localStorage.setItem('userId', res.data.userId)
                    localStorage.setItem('isAdmin', res.data.isAdmin===true? 'true': 'false')
                    navigate('/bookverse')
                }else{
                    console.log(res.data.message)
                }
                alert(res.data.message)
            })
            .catch(err=>console.log(err))
    }

  return (
    <div className="d-flex justify-content-center align-items-center m-5" style={{ height: '60vh' }}>
    <form 
        className="bg-light p-4 rounded shadow-lg text-center d-flex flex-column gap-3"
        style={{ width: '100%', maxWidth: '400px' }}
        onSubmit={handleSubmit}
    >
        <div className="h3 fw-bold">Login</div>
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

        <button className="btn btn-success w-100 mt-2" type="submit">Login</button>
        <div className='d-flex'>
            <div className='me-2'>Don't have an account ?</div>
            <a 
                className="" 
                type="button" 
                onClick={() => navigate('/bookverse/register')}
            >
                Register
            </a>
        </div>
    </form>
    </div>
  )
}
