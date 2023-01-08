import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import {url} from '../api'

import toast from 'react-hot-toast'
import { setHeaders } from './adminAPi'

const initialState = {
  list : [],
  status :null,
}

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
   async () =>{
    try {
      const res = await axios.get(`${url}/orders`, setHeaders())
      console.log(res.data)
      return res.data
    } catch (error) {
       console.log(error) 
    }
   }

)





export const editProduct = createAsyncThunk(
  "products/editProduct",
   async (values) =>{
    try {
      const res = await axios.put(`${url}/product/${values.product._id}`, values, setHeaders());
      return res.data
    } catch (error) {
      toast.error(error.res?.data)
    }
   }

)


 const orderSlice = createSlice({
    name : 'orders',
    initialState,
    reducers :{},
    
    extraReducers : {
      [fetchOrders.pending] : (state, action) =>{
            state.status = "pending"
      },
      [fetchOrders.fulfilled] : (state, action) =>{
          state.list = action.payload
          state.status = "success"
      },
      [fetchOrders.rejected] : (state, action) =>{
        state.status = "rejected"      
       },


       
    }

})

export default orderSlice.reducer