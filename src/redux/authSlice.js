import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import {url} from '../api'
import {toast} from 'react-hot-toast'
import jwtDecode from 'jwt-decode'

const initialState = {
    token : localStorage.getItem('token'),
    name : "",
    email : "",
    password : "",
    _id : "",
    isAdmin : "",
    registerStatus : "",
    registerError : "",
    loginStatus : "",
    loginError : "",
    urlLoaded: null
 }

export const registerUser = createAsyncThunk(
    "userauth/registerUser", 
    async (value, {rejectWithValue}) =>{
           try {
             const token = await axios.post(`${url}/user/register`,{
                name : value.name,
                email : value.email,
                password : value.password
               })
               localStorage.setItem('token', token.data)
            //    toast.success('Registration Successfull')
               return token.data
           } catch (error) {
              console.log(error)
              return rejectWithValue(error.res.data)
           }
    }
);


export const loginUser = createAsyncThunk(
    "userauth/loginUser", 
    async (user, {rejectWithValue}) =>{
           try {
             const res = await axios.post(`${url}/user/login`,{
                email : user.email,
                password : user.password
               })
               localStorage.setItem('token', res.data)
               toast.success('Login  Successfull')

               return res.data
           } catch (error) {
              console.log(error.res.data)
              return rejectWithValue(error.res.data)
           }
    }
) 

 const authSlice = createSlice({
    name : 'userauth',
    initialState,
    reducers :{
        loadUser (state,action) {
            const token = state.token;
            console.log('auth slice token', token)
            if(token){
                const user = jwtDecode(token)
                return {
                    ...state,
                    token,
                    name:  user.name,
                    email:  user.email,
                    _id:  user._id,
                    isAdmin : user.isAdmin,
                    urlLoaded:  true,
                }
            }
        },
        logoutUser (state,action){
            localStorage.removeItem('token')

            return {
                ...state,
                token : "",
                name : "",
                email : "",
                _id : "",
                registerStatus : "",
                registerError : "",
                loginStatus : "",
                loginError : "",
                urlLoaded: false
            }
        }
    },
    
    extraReducers : (builder) => {

        builder.addCase(registerUser.pending, (state,action) =>{
             return {...state, registerStatus : "pending"}
        });

        builder.addCase(registerUser.fulfilled, (state,action) =>{
            if(action.payload) {
                const user = jwtDecode(action.payload)
                return {
                    ...state,
                    token : action.payload,
                    name:  user.name,
                    email:  user.email,
                    _id:  user._id,
                    isAdmin : user.isAdmin,
                    registerStatus : "success"
                }
            }else {
                return state
            }
        });

        builder.addCase(registerUser.rejected, (state,action) =>{
            return {
                     ...state, 
                      registerStatus : "rejected", 
                      registerError : action.payload}
        });


        builder.addCase(loginUser.pending, (state,action) =>{
            return {...state, loginStatus : "pending"}
       });

       builder.addCase(loginUser.fulfilled, (state,action) =>{
           if(action.payload) {
               const user = jwtDecode(action.payload)
               return {
                   ...state,
                   token : action.payload,
                   name:  user.name,
                   email:  user.email,
                   _id:  user._id,
                   isAdmin : user.isAdmin,
                   loginStatus : "success"
               }
           }else {
               return state
           }
       });

       builder.addCase(loginUser.rejected, (state,action) =>{
           return {
                    ...state, 
                     loginStatus : "rejected", 
                     loginError : action.payload}
       });

    }

})

export const {loadUser,logoutUser} = authSlice.actions
export default authSlice.reducer