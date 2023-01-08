import React,{useState,useEffect} from 'react'
import './navbar.css'
import {FaShoppingCart} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { logoutUser } from '../../redux/authSlice'
import {toast} from 'react-hot-toast'
import styled from 'styled-components'
import logo from '../../images/logo.PNG'

const Navbar = () => {
  const dispatch = useDispatch()
  const {cartTotalQuantity} = useSelector((state)=> state.cart)
  const auth = useSelector((state) => state.auth)
  const [nav, setNav] = useState(false)

  const changeColor = () =>{
    if(window.scrollY >= 100) {
      setNav(true)
    }else{
      setNav(false)
    }
  }

  useEffect(() => {
   
     changeColor()

     window.addEventListener('scroll', changeColor)
  }, [])
  

  return (
    <nav className={nav ? 'nav_bar colorChange' : 'nav_bar'}>
        <Link className='nav_link' to='/'>

        <img className="logo" src={logo} alt="logo" />
        </Link>
         
         {auth._id && (
           <div className='nav-items'>
          
           <Link className='nav_link' to='/cart'>

            <div className="cart_logo">
              <FaShoppingCart/>
              <span className="bag_quantity">
                  <span>{cartTotalQuantity}</span>
              </span>
              </div>
            </Link>
      
        </div>
         )}

     {auth._id ? (
      
        <Links>
         <p style={{marginRight : '10px'}}>{auth.name}</p>
          {auth.isAdmin ? (
            <div>
              <Link className='nav_link' to="/admin/summary">Admin</Link>
            </div>
          ) : null}
          <div
            onClick={() => {
              dispatch(logoutUser(null));
              toast.success("Logged out!");
            }}
          >
            Logout
          </div>
         
        </Links>
      ) : (
        <AuthLinks>
          <Link to="/login" className='nav_link'>Login</Link>
          <Link to="signup" className='nav_link'>Register</Link>
        </AuthLinks>
      )}
         
    </nav>
  )
}

export default Navbar

const LogOut = styled.div`
  font-size: 1.2rem;
  text-transform: uppercase;
  color: #000;
  font-family: 'Rubik', sans-serif;
  cursor: pointer;
`
const Links = styled.div`
  color: #39311D;
  display: flex;
  font-family: 'Rubik', sans-serif;
 
  div {
    cursor: pointer;
    &:last-child {
      margin-left: 2rem;
    }
  }
`;
const AuthLinks = styled.div`
a{
  text-decoration: none;
  color: #000;
  font-family: 'Rubik', sans-serif;
  
}
  a {
    &:last-child {
      margin-left: 2rem;
    }
  }
`