import React from 'react'
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/Home/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './components/Cart/Cart';
import Navbar from './components/Navbar/Navbar';
import {Toaster} from 'react-hot-toast'
import CheckoutSuccess from './components/CheckoutSuccess/CheckoutSuccess';
import Dashboard from './admin/Dashboard';
import Summary from './admin/Summary';
import Products from './admin/Products';
import CreateProduct from './admin/CreateProduct';
import Orders from './admin/Orders';
import Users from './admin/Users';
import { useSelector } from 'react-redux';
import Productlists from './admin/lists/Productlists';
import Product from './admin/Details/Product';
import Order from './admin/Details/Order';
import UserProfile from './admin/Details/UserProfile';
import FooterV2 from './components/Footer/FooterV2';

function App() {
  const auth = useSelector((state)=> state.auth)
  return (
    <>
           <div>
              <Toaster
                position="top-right"
                reverseOrder={false}
                toastOptions={{
                  success : {
                    theme: {
                      primary : '#4aee88',
                    },
                  },
                }}
                />
            </div>
      <BrowserRouter>
      
      <Navbar/>
         <Routes>
                <Route path="/" exact element={<Home/>}/>            
                <Route path="/cart"  element={<Cart/>}/>  
               
                {/* Display single & details components */}
                <Route path="/product/:id"  element={<Product/>}/>  
                <Route path="/order/:id"  element={<Order/>}/>  
                <Route path="/user/:id"  element={<UserProfile/>}/>  


                {/* Admin  components */}
                <Route path='/admin' element={<Dashboard/>}>
                  <Route path="products"  element={<Products/>}>
                     <Route index  element={<Productlists/>}/> 
                     <Route path='create-product' element={<CreateProduct/>}/>
                  </Route>

                  <Route path="summary"  element={<Summary/>}/>
                  <Route path="orders" element={<Orders/>}/>
                  <Route path="users" element={<Users/>}/>
               </Route>

                 {/* Auth components */}
                {
                  !auth._id && <>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/signup' element={<Register/>}/>
                  </>
                }
                <Route path='/success' element={<CheckoutSuccess/>}/>
            
         </Routes>
         
      <FooterV2/>
      </BrowserRouter>
       
    </>
  );
}

export default App;
