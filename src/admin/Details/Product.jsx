import React,{useState,useEffect} from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { url } from '../../api'
import {useDispatch} from 'react-redux'
import { addToCart } from '../../redux/cartSlice'
import { useNavigate,useParams } from 'react-router-dom'
import { FaRupeeSign } from 'react-icons/fa'
const Product = () => {
  const [product,setProduct] = useState({})
  const [loading,setLoading] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams()
  const handleAddToCart=(product)=>{
    dispatch(addToCart(product))
    navigate('/cart')
  }

  useEffect(() => {
    setLoading(true)
    const fetchProduct = async () =>{
        try {
          const res = await axios.get(`${url}/product/${id}`)
          console.log(res.data)
          setProduct(res.data)
        } catch (error) {
          console.log(error)
        }
        setLoading(false)
    }
    fetchProduct()
  }, [])

  return (
    <StyleProduct>
      <ProductContainer>
        
       {
        loading ? <p>Loading..</p> : 
        (
          <ImageContainer>
            <img src={product.image?.url} alt={product.name} />
          </ImageContainer>
        )
       }
        <ProductsDetails>
         <h3>{product.name}</h3>
         <p><span>Category : {product.category}</span></p>
         <p><span>Description : {product.description}</span></p>
         <Price><FaRupeeSign/> {product.price?.toLocaleString()}</Price>
         <AddToCartButton
          onClick={()=>handleAddToCart(product)}
          className='product-add-to-cart'>
          Add to cart</AddToCartButton>
        </ProductsDetails>
      </ProductContainer>
    </StyleProduct>
  )
}

export default Product



const ImageContainer  = styled.div`
flex: 1;
   img{
    width: 100%;
   }

`

const StyleProduct  = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 3rem;
`

const ProductContainer  = styled.div`
  max-width: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: auto;
  border-radius: 5px;
  padding: 1rem 2rem;
  margin: 3rem;
  margin-left: 18rem;
  box-shadow: rgba(100,100,111,0.2) 0px 7px 29px 0px;
`

const ProductsDetails  = styled.div`
  flex: 2;
  margin-left: 2rem;
  h3{
    margin: 0.5rem 0;
    font-size: 30px;
  }
  p span{
    font-weight: bold;
    background-color: #e8e8f0;
    border-radius: 20px;
    padding: 0.3rem 0.5rem;
  }
`
const Price  = styled.div`
margin: 1re 0;
font-size: 25px;
font-weight: bold;
`
const AddToCartButton = styled.button`
  width:auto;
  padding: 0 2rem;
  margin: 0.5rem 0;
  outline: none;
  background-color: orange;
  color: #fff;
  border: none;
  padding: 0.5rem 0.8rem;
  border-radius: 5px;
`