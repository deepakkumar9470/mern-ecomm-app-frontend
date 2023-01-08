import React,{useState,useEffect} from 'react'
import Header from '../Header/Header'
import { useDispatch} from 'react-redux'
import { addToCart } from '../../redux/cartSlice'
import {BsCartPlus} from 'react-icons/bs'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import './home.css'
import Category from '../Category/Category'
import NewsLetter from '../NewsLetter/NewsLetter'
import TestimonySlider from '../Testimony/TestimonySlider'
import { url } from '../../api'

const Home = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAddToCart=(product)=>{
    dispatch(addToCart(product))
    navigate('/cart')
  }
  const [products,setProducts] = useState([])
  useEffect(() => {
    const fetchProducts = async () =>{
        try {
          const res = await axios.get(`${url}/product`)
          console.log(res.data)
          setProducts(res.data)
        } catch (error) {
          console.log(error)
        }
    }
    fetchProducts()
  }, [])

  return (
    <div className='home_container'>
      <Header/>
           
          <>
            <h2>New Arrivals</h2>
            <div className="products">
              {products && products?.map((product) => 
              <div className='product' key={product._id}>
                 <h3>{product.name}</h3>
                 <img src={product.image.url} alt={product.name} />
                 <div className="details">
                  <span className='desc'>{product.description}</span>
                  <span className='price'>Rs {product.price}</span>
                 </div>
                 <button onClick={()=>handleAddToCart(product)}><BsCartPlus className='cart_icon'/> Add to cart</button>
              </div>
               
              )}
            </div>
            
          </>
         
      
        {/* Category items  */}

             <Category/>

        {/* News letter   */}
             <TestimonySlider/>
             <NewsLetter/>    
       
     
    </div>
  )
}

export default Home