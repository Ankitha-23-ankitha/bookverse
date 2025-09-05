import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Book } from 'lucide-react'
import '../App.css'

export default function Start() {

    const navigate = useNavigate()

  return (
    <div className='d-flex flex-column justify-content-center align-items-center vh-100 gap-3' style={{backgroundColor:'#FBFAEF', fontFamily:'Parkinsans, sans-serif'}}>
      <div className="d-flex align-items-center" onClick={() => navigate("/bookverse")}>
          <Book strokeWidth={3} className="logo" size={45}/>
          <span className="fs-1 ps-2 logo fw-bold">BookVerse</span>
        </div>
      <div className='exploreBtn px-3 py-2 rounded' onClick={()=>navigate('/bookverse')}>Enter</div>
    </div>
  )
}
