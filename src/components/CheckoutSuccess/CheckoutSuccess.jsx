import React,{useEffect} from 'react'
import styled from 'styled-components'
import {useDispatch,useSelector} from 'react-redux'
import { getTotalAmount } from '../../redux/cartSlice'
const CheckoutSuccess = () => {
  const cart = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  useEffect(() => {
     dispatch(getTotalAmount())
  }, [cart,dispatch])
  
  return (
    <Container>
      <h2>Checkout Success</h2>
      <p>Your order might some time to process!</p>
      <p>For any queries related to shopping & orders contact at {" "}
         <strong>support@d-com.com</strong>
      </p>
    </Container>
  )
}

export default CheckoutSuccess

const Container = styled.div`
  max-width: 800px;
  min-height: 80vh;
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h2{
    margin-bottom: 0.5rem;
    color: #029e02;
  }
`