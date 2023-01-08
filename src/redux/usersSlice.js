import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import {url} from '../api'

import { setHeaders } from './adminAPi'

const initialState = {
  list : [],
  status :null,
  deleteStatus : null
}

export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
   async () =>{
    try {
      const res = await axios.get(`${url}/user`, setHeaders())
      console.log(res.data)
      return res.data
    } catch (error) {
       console.log(error) 
    }
   }

)




export const deleteUser = createAsyncThunk(
  "users/deleteUser",
   async (id) =>{
    try {
      const res = await axios.delete(`${url}/user/${id}`)
      console.log(res.data)
      return res.data
    } catch (error) {
       console.log(error) 
    }
   }

)


 const userSlice = createSlice({
    name : 'users',
    initialState,
    reducers :{},
    
    extraReducers : {
      [fetchAllUsers.pending] : (state, action) =>{
            state.status = "pending"
      },
      [fetchAllUsers.fulfilled] : (state, action) =>{
        state.list = action.payload
        state.status = "success"
      },
      [fetchAllUsers.rejected] : (state, action) =>{
        state.status = "rejected"
      
       },
       [deleteUser.pending] : (state, action) =>{
        state.deleteStatus = "pending"
        },
        [deleteUser.fulfilled] : (state, action) =>{
          const userLists = state.list.filter(user => user._id !== action.payload._id)
          state.list = userLists
          state.deleteStatus = "success"
        },
        [deleteUser.rejected] : (state, action) =>{
          state.deleteStatus = "rejected"
        
        },

    }

})

export default userSlice.reducer