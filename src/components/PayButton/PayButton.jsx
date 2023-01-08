import React from 'react'

import {url} from '../../api'
import { useSelector } from 'react-redux'
import {FaStripe} from 'react-icons/fa'
import axios from 'axios'
const PayButton = ({cartitems}) => {

    const user = useSelector((state) => state.auth)
     
    const handlePayment = () =>{
       axios.post(`${url}/stripe/create-checkout-session`,{
        cartitems,
        userId : user._id
       }).then((res) => {
          if(res.data.url){
            window.location.href = res.data.url
          }  
       }).catch((err)=> console.log(err.message))
    }
  return (
    <div>
        <button onClick={() => handlePayment()}><FaStripe fontSize={40} color='white'/> Pay Now</button>
    </div>
  )
}

export default PayButton