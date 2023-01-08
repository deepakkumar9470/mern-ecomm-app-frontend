import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import {url} from '../api'

import toast from 'react-hot-toast'
import { setHeaders } from './adminAPi'

const initialState = {
  items : [],
  status :null,
  createStatus : null,
  deleteStatus:  null,
  editStatus:  null
}

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
   async () =>{
    try {
      const res = await axios.get(`${url}/api/product`)
      console.log(res.data)
      return res.data
    } catch (error) {
       console.log(error) 
    }
   }

)


export const addProducts = createAsyncThunk(
  "products/addProducts",
   async (values) =>{
    try {
      const res = await axios.post(`${url}/product`, values, setHeaders());
      toast.success('Product added successfully..')
      return res.data
    } catch (error) {
      toast.error(error.res?.data)
    }
   }

)

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
   async (id) =>{
    try {
      const res = await axios.delete(`${url}/product/${id}`)
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


 const productSlice = createSlice({
    name : 'products',
    initialState,
    reducers :{},
    
    extraReducers : {
      [fetchProducts.pending] : (state, action) =>{
            state.status = "pending"
      },
      [fetchProducts.fulfilled] : (state, action) =>{
        state.items = action.payload
        state.status = "success"
      },
      [fetchProducts.rejected] : (state, action) =>{
        state.status = "rejected"      
       },
       [addProducts.pending] : (state, action) =>{
        state.createStatus = "pending"
        },
        [addProducts.fulfilled] : (state, action) =>{
          state.items.push(action.payload)
          state.createStatus = "success"
        },
        [addProducts.rejected] : (state, action) =>{
          state.createStatus = "rejected"
        
        },

        [deleteProduct.pending] : (state, action) =>{
          state.deleteStatus = "pending"
          },
        [deleteProduct.fulfilled] : (state, action) =>{
            state.deleteStatus = "success"
            const  newProducts = state.items.filter((item) => item._id !== action.payload._id)
            state.items =  newProducts
            toast.error('Product deleted')
          },
        [deleteProduct.rejected] : (state, action) =>{
            state.deleteStatus = "rejected"
          
          },
          
          [editProduct.pending] : (state, action) =>{
            state.editStatus = "pending"
            },
          [editProduct.fulfilled] : (state, action) =>{
            const  updateProducts = state.items.map((product) => 
            product._id === action.payload._id ? action.payload : product)
            toast.error('Product updated successfully')
            state.items =  updateProducts
            state.editStatus = "success"
            },
          [editProduct.rejected] : (state, action) =>{
              state.editStatus = "rejected"
            
            }        
    }

})

export default productSlice.reducer