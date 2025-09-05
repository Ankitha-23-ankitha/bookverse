import React from 'react'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { useNavigate, Outlet } from 'react-router-dom';
import Select from 'react-select'
import { useContext } from 'react';
import { UserContext } from '../ContextApi/UserContext';


export default function Explore() {


  const navigate = useNavigate()

  const {input, setInput, selectValue, setSelectValue, } = useContext(UserContext)

  const options = [ 
        { value: "All", label: "All" },
        { value: "Book", label: "Book" },
        { value: "Author", label: "Author" },
        { value: "Genre", label: "Genre" },
      ];
  
  React.useEffect(()=>{
    if(input.trim()){
      navigate('/bookverse/explore')
    }
  }, [input])


  return (
    <div className='p-3 mx-3 mx-md-5'>
      <div className='row justify-content-center'>
        <div className='col-12 col-md-8 col-lg-6 d-flex align-items-center gap-2'>
          <input 
            type='text'
            value={input}
            className='inputBox flex-grow-1 p-2 ps-3'
            placeholder='Search by books, authors, genres...'
            onChange={e => setInput(e.target.value)}
          />  
          <Select
            className="flex-shrink-1"
            value={selectValue}
            options={options}
            defaultValue={options[0]}
            onChange={(opt) => setSelectValue(opt)}
          />
        </div>
      </div>
      <Outlet />
    </div>
  )
}
