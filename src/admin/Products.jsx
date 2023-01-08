import React from 'react'
import {useNavigate,Outlet} from 'react-router-dom'
import './products.css'

const Products = () => {
    const navigate = useNavigate()
  return (
    <div>
         <button 
          className="add_btn"
             onClick={() => navigate('/admin/products/create-product')}>
              Add
         </button>
        <Outlet/>

    </div>
  )
}

export default Products