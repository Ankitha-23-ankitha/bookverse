import React from 'react'
import { Book } from 'lucide-react'
import { useNavigate } from 'react-router-dom'


export default function Footer() {

  const navigate = useNavigate()

  return (
    <div className='row m-0 p-4 text-dark' style={{ backgroundColor: '#f7d2a470', maxWidth: '100vw', borderRadius: '10px 10px 0 0' }}>
      {/* Logo Section */}
      <div className='col-12 d-flex justify-content-center gap-2 align-items-center text-center'>
        <Book strokeWidth={3} size={30} />
        <div className='fs-3 fw-bold'>BookVerse</div>
      </div>

      {/* Links & Contact Section */}
      <div className='row mt-3 text-center text-md-start'>
        <div className='col-md-6 col-sm-12 d-flex flex-column gap-2 align-items-center align-items-md-end'>
          <div className='fs-5 fw-semibold text-dark'>Quick Links</div>
          <div className='link' onClick={() => navigate('/bookverse/')} style={{ cursor: 'pointer', color: '#333', fontWeight: '500' }}>Home</div>
          <div className='link' onClick={() => navigate('/bookverse/explore')} style={{ cursor: 'pointer', color: '#333', fontWeight: '500' }}>Explore</div>
          <div className='link' onClick={() => navigate('/bookverse/about')} style={{ cursor: 'pointer', color: '#333', fontWeight: '500' }}>About Us</div>
        </div>

        <div className='col-md-6 col-sm-12 d-flex flex-column gap-2 align-items-center align-items-md-start mt-3 mt-md-0'>
          <div className='fs-5 fw-semibold text-dark'>Contact Us</div>
          <div className='text-muted'>abhivardhangoud12345@gmail.com</div>
          <div className='text-muted'>+91 6302108055</div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className='col-12 text-center mt-4 text-muted fs-6 fw-semibold'>
        © BookVerse 2025. All Rights Reserved.
      </div>
    </div>

  )
}
