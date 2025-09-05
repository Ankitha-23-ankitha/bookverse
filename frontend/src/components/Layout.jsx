import React from 'react'
import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import {UserContext} from '../ContextApi/UserContext'
import Footer from './Footer';
import Header from './Header';

export default function Layout() {

    const navigate = useNavigate();

    const {input} = useContext(UserContext)


    const logout = ()=>{
      localStorage.removeItem('name')
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      localStorage.removeItem('userId')
      localStorage.removeItem('isAdmin')
      window.location.reload()
    }

    React.useEffect(()=>{
      if(input.trim()){
        navigate('/bookverse/explore')
      }
    }, [input])

  return (
    <div className='container-fluid pt-2 p-0 body text-dark fw-semibold' style={{ fontFamily: 'Parkinsans, sans-serif', minHeight: '100vh'}}>
        <Header />
        <Outlet />
        <Footer />
    </div>
  )
}
