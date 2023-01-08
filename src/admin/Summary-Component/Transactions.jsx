import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { url } from '../../api'
import { setHeaders } from '../../redux/adminAPi'
import moment from 'moment'

const Transactions = () => {

    const [orders,setOrders] = useState([])
    const [isLoading,setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        const fetchOrders = async () =>{
            try {
              const res = await axios.get(`${url}/orders/?new=true`, setHeaders())
              console.log(res.data)
              setOrders(res.data)
            } catch (error) {
              console.log(error)
            }
            setIsLoading(false)
        }
        fetchOrders()
      }, [])
    

  return (
    <StyledTransactions>
        {isLoading ? <p>Loading ..</p> : 
          <>
             <h2>Latest transaction</h2>
             {
                orders?.map((order,index) => (
                    <Transaction key={index}>
                        <p>{order.shipping.name}</p>
                        <p>{(order.total / 100).toLocaleString()}</p>
                        <p>{moment(order.createdAt).fromNow()}</p>
                    </Transaction>
                ))
             }
          </>
        }
    </StyledTransactions>
  )
}

export default Transactions


const StyledTransactions = styled.div`  
    background: rgb(48,51,78);
    color: rgba(234,234,255, 0.87);
    padding: 1rem;
    border-radius: 5px;
`
const Transaction = styled.div` 
    display : flex;
    font-size: 14px;
    margin-top: 1rem;
    padding: 0.5rem;
    border-radius: 3px;
    background: rgba(38,198,249,0.12);
    p{
        flex:1;
    }
    &:nth-child(even){
        background: rgba(102,108,255, 0.12);
    }

`