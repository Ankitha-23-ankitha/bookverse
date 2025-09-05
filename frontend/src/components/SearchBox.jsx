import React from 'react'
import Select from 'react-select'
import { useContext } from 'react';
import { UserContext } from '../ContextApi/UserContext';

export default function SearchBox() {

    const {input, setInput, selectValue, setSelectValue} = useContext(UserContext)

    
    const options = [
        { value: "All", label: "All" },
        { value: "Book", label: "Book" },
        { value: "Author", label: "Author" },
        { value: "Genre", label: "Genre" },
      ];
  

  return (
    <div className='row inpContaine'>
        <input 
          type='text'
          className='inputBox col-6 p-2 my-2'
          placeholder='Search by books, authors, genres...'
          onChange={e=>setInput(e.target.value)}
        />
        <Select
          className="col-auto my-2"
          value={options.value}
          options={options}
          defaultValue={options[0]}
          onChange={(opt)=>setSelectValue(opt.value)}
        />
    </div>
  )
}
