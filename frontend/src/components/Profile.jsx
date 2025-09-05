import React, { useContext } from 'react'
import axios from 'axios'
import { UserContext } from '../ContextApi/UserContext'

export default function Profile({baseUrl}) {

    const {userId, username} = useContext(UserContext)

    const [userInfo, setUserInfo] = React.useState({
        name:'',
        username: '',
    });

    const getUserData = async ()=>{
        try {
            axios.post(`${baseUrl}getUser`, {userId, username})
                .then(res=>{
                    console.log(res)
                    // console.log(res.user.username)
                    // console.log(res.user.name)
                    setUserInfo({
                        name: res.data.user.name,
                        username: res.data.user.username
                    })
                })
                .catch(err=>{
                    console.log(err)
                })
        
        } catch (error) {
            
        }
    }

    React.useEffect(()=>{
        getUserData()
        console.log(userInfo)
    }, [])

  return (
    <div className='m-5' style={{minHeight: '85vh'}}>
      <div className=''>Name : {userInfo.name}</div> <br />
      <div className=''>Username : {userInfo.username}</div>
    </div>
  )
}
