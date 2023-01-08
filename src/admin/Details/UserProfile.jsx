import axios from 'axios'
import React,{useState,useEffect} from 'react'
import toast from 'react-hot-toast'
import {useParams} from 'react-router-dom'
import styled from 'styled-components'
import { url } from '../../api'
import { setHeaders } from '../../redux/adminAPi'


const UserProfile = () => {
  const {id} = useParams()
  const [loading, setLoading] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [users, setUsers] = useState({
    name: "",
    email : "", 
    isAdmin  :false, 
    password:  ""
  })

  useEffect(() => {
    setLoading(true)
    const fecthUser = async() =>{
      try {
        const res = await axios.get(`${url}/user/find/${id}`, setHeaders())
        console.log('from userprofile ', res.data)
        setUsers({
          ...res.data,
          password : ""
        })
        console.log(res.data)
      } catch (error) {
        console.log(error)
      }

    }
    fecthUser()
    setLoading(false)
  }, [id])
  
 const handleUpdateUser =  async (e) =>{
  setUpdating(true)
  e.preventDefault()
  try {
    const res = await axios.put(`${url}/user/${id}`, 
    {...users}, setHeaders());
    setUsers({...res.data, password : ""})
    toast.success('Profile Updated Successfully')
  } catch (error) {
    console.log(error)
    
  }
  setUpdating(false)
 }
  return (
    <StyledProfile>
      <ProfileContaimer>
        {loading ? <p>Loading...</p> : (
           <form onSubmit={handleUpdateUser}>
            <h3>{users.name} Profile</h3>
            {users.isAdmin ? (<Admin>Admin</Admin>) :(<Customer>Customer</Customer>)}
             
             <label htmlFor="Name">Name</label>
             <input 
                type="text"
                value={users.name}
                onChange={(e) => setUsers({...users, name:e.target.value})} 
                name="name" />

             <label htmlFor="Name">Email</label>
             <input 
                type="text"
                value={users.email}
                onChange={(e) => setUsers({...users, email:e.target.value})} 
                name="email" />

             <label htmlFor="Name">Password</label>
             <input 
                type="password"
                value={users.password}
                onChange={(e) => setUsers({...users, password:e.target.value})} 
                name="password" />
             <button> {updating ? "Updating"  : "Update Profile"}</button>
           </form>
        )}

      </ProfileContaimer>
    </StyledProfile>
  )
}

export default UserProfile


const StyledProfile = styled.div`
  display: flex;
  justify-content: center;
  margin: 3rem;

`

const ProfileContaimer = styled.div`
  max-width: 500px;
  width: 100%;
  height: auto;
  display: flex;
  padding: 2rem;
  border-radius: 5px;
  box-shadow: rgba(100,100,111,0.2) 0px 7px 29px 0px ;
  form{
      display: flex;
      flex-direction:column;
      align-items: flex-start;
      h3{
        margin-bottom: 0.5rem;
      }
      label{
        color: gray;
        margin-bottom: 0.2rem;
      }
      input{
        margin-bottom: 1rem;
        outline: none;
        border: none;
        border-bottom: 1px solid gray;
      }
      button{
        background-color: #2bbfec;
        outline: none;
        border: none;
        font-size: 1rem;
        padding: 0.3rem 0.5rem;
        border-radius: 5px;
      }
  }

`

const Admin = styled.div`
    color: rgb(253,181,40);
    background-color: rgba(253,181,40, 0.12);
    font-size: 14px;
    padding: 3px 5px;
    border-radius: 3px;
    margin-bottom: 1rem;
`

const Customer = styled.div`
    color: rgb(38,198,249);
    background-color: rgba(38,198,249, 0.12);
    font-size: 14px;
    padding: 3px 5px;
    border-radius: 3px;
    margin-bottom: 1rem;
`