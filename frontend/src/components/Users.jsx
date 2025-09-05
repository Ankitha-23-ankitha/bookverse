import React, { useContext } from 'react'
import axios from 'axios'
import { UserContext } from '../ContextApi/UserContext'

export default function Users({baseUrl}) {

  const [users, setUsers] = React.useState([])
  const [popover, setPopover] = React.useState(false)
  const {isAdmin} = useContext(UserContext)

  const getUsers = async()=>{
    try {
      axios.post(`${baseUrl}getUsers`)
        .then(res=>{
          console.log(res.data)
          setUsers(res.data.users)
        })
        .catch(err=>{
          console.log(err)
        })
    } catch (error) {
        console.log(error.message)
    } 
  }

  const removeUser = async (userId)=>{
    try {
      axios.post(`${baseUrl}removeUser`, {userId})
        .then(res=>{
            console.log(res.data)
            window.location.reload()
        })
        .catch(err=>{

        })
    } catch (error) {
      
    }
  }


  React.useEffect(()=>{
    getUsers()
  }, [])

  return (
    <div className='p-5'>
      {
        isAdmin==='true'?
        <>
        <div className=''> Existing users </div>
        <div className='row'>
          {
            users.map((user)=>{
              return(
                <div className='col-3 bg-info m-2 fs-4' style={{height: '10rem'}}>
                  <div>Name: {user.name}</div>
                  <div>Username: {user.username}</div>
                  <div>Role: {user.isAdmin?"Admin":'User'}</div>
                  <button 
                    className='btn btn-danger' 
                    disabled={user.isAdmin} 
                    onClick={()=>setPopover(true)}
                    >
                    Remove
                  </button>
                  {popover && ( // Conditional rendering for the popover
                    <div id="deleteUser" className="popover">
                      <p>Confirm delete user</p>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          removeUser(user.userId); // Perform the delete action
                          setPopover(false); // Close the popover
                        }}
                        >
                        Delete
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => setPopover(false)} // Close the popover on cancel
                        >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              )
            })
          }
        </div>
        </>
        :
        <div className=''>
          You dont have access to this page 
        </div>
      }
    </div>
  )
}
