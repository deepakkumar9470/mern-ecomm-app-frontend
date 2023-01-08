import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {configureStore} from '@reduxjs/toolkit'
import {Provider} from 'react-redux'
import productReducer, { fetchProducts } from './redux/productSlice'
import cartReducer, { getTotalAmount } from './redux/cartSlice'
import { loadUser } from './redux/authSlice'
// import {productsApi} from './redux/productsApi'
import authReducer from './redux/authSlice';
import userReducer from './redux/usersSlice';
import orderReducer from './redux/orderSlice';

const store = configureStore({
   reducer  : {
    users : userReducer,
    products : productReducer,
    cart : cartReducer,
    auth : authReducer,
    orders:  orderReducer,
   }
});


store.dispatch(fetchProducts())
store.dispatch(getTotalAmount())
store.dispatch(loadUser(null))

ReactDOM.render(
    <Provider store={store}>

        <App />
    </Provider>,
document.getElementById('root'));


