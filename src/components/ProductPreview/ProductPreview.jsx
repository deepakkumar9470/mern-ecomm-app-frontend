import React from 'react'

import './productPreview.css'

const ProductPreview = () => {
  return (
    <div className='product_preview container'>

     <div className="product_preview_list">
            <img src="https://images.pexels.com/photos/12488382/pexels-photo-12488382.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="myimg" />

            <div className="product_preview_details">
                <h1>Nike Shoe</h1>
                <p className='price'>Rs 999 /-</p>
                <p>Lorem ipsum dolor sit, amet consectetur</p>
            </div>
        </div>

    </div>
  )
}

export default ProductPreview