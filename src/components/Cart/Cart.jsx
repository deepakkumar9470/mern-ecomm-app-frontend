import React, {useEffect} from 'react'

import './cart.css'
import { Link ,useNavigate} from 'react-router-dom'
import { FaArrowLeft, FaRupeeSign } from 'react-icons/fa'
import {useDispatch, useSelector} from 'react-redux'
import {removeFromcart,decreaseQuantity, increaseQuantity,getTotalAmount} from '../../redux/cartSlice'
import PayButton from '../PayButton/PayButton'

const Cart = () => {
 
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cart = useSelector((state) =>  state.cart)
    const auth = useSelector((state) =>  state.auth)
    console.log('from cart', cart)

    const handleRemoveFromCart = (data) =>{
      
        alert('Are you sure')
        dispatch(removeFromcart(data))
    }

    const handleDecreaseCart = (data) =>{
      dispatch(decreaseQuantity(data))
    }
    const handleIncreaseCart = (data) =>{
      dispatch(increaseQuantity(data))
    }

    useEffect(() => {
       dispatch(getTotalAmount())
    }, [cart,dispatch])
    
    return (
        <div className="cart-container">
         
        <h2>Shopping Cart</h2>
       
        {cart.cartItems.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is currently empty</p>
            <div className="start-shopping">
              <Link to="/">
                <FaArrowLeft/>
                <span>Start Shopping</span>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="titles">
              <h3 className="product-title">Product</h3>
              <h3 className="price">Price</h3>
              <h3 className="quantity">Quantity</h3>
              <h3 className="total">Total</h3>
            </div>
            <div className="cart-items">
              {cart.cartItems &&
                cart.cartItems?.map((cartItem) => (
                  <div className="cart-item" key={cartItem._id}>
                    <div className="cart-product">
                      <img src={cartItem.image.url} alt={cartItem.name} />
                      <div>
                        <h3>{cartItem.name}</h3>
                        <p>{cartItem.description}</p>
                        <button onClick={()=> handleRemoveFromCart(cartItem)}>
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="cart-product-price"><FaRupeeSign/> {cartItem.price}</div>
                    <div className="cart-product-quantity">
                      <button onClick={()=>handleDecreaseCart(cartItem)}>
                        -
                      </button>
                      <div className="count">{cartItem.cartQuantity}</div>
                      <button onClick={()=>handleIncreaseCart(cartItem)}>+</button>
                    </div>
                    <div className="cart-product-total-price">
                      <FaRupeeSign/> {cartItem.price * cartItem.cartQuantity}
                    </div>
                  </div>
                ))}
            </div>
            <div className="cart-summary">
              <button className="clear-btn">
                Clear Cart
              </button>
              <div className="cart-checkout">
                <div className="subtotal">
                  <span>Subtotal</span>
                  <span className="amount"><FaRupeeSign/> {cart.cartTotalAmount}</span>
                </div>
                <p>Taxes and shipping calculated at checkout</p>
                {
                  auth._id ? (<PayButton cartitems={cart.cartItems}/>) :
                  (
                    <button className='cart_login' onClick={()=>navigate('/login')}>Check out</button>
                  )
                }
              

                <div className="continue-shopping">
                  <Link to="/">
                   <FaArrowLeft/>
                    <span>Continue Shopping</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
}

export default Cart