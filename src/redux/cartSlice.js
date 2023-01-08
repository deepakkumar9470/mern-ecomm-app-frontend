import {createSlice} from '@reduxjs/toolkit'



import {toast} from 'react-hot-toast'
const initialState = {
  cartItems : localStorage.getItem('cartitems') ? 
              JSON.parse(localStorage.getItem('cartitems')): [],
  cartTotalQuantity :0,
  cartTotalAmount :0,
}


 const cartSlice = createSlice({
    name : 'cart',
    initialState,
    reducers :{
        addToCart(state,action){
        const itemIndex =  state.cartItems.findIndex(item => item._id === action.payload._id)
        if(itemIndex >=0){
            state.cartItems[itemIndex].cartQuantity += 1
            toast.success(`Increased ${state.cartItems[itemIndex].name} cart quantity`)
        }else{
            const tempProduct = {...action.payload, cartQuantity : 1};
            state.cartItems.push(tempProduct)
            toast.success(`${action.payload.name} added to cart successfylly`)
        }

        localStorage.setItem('cartitems', JSON.stringify(state.cartItems))
           
        },

        removeFromcart(state,action) {
           const nextCartItems =  state.cartItems.filter(item => item._id !== action.payload._id)
           state.cartItems = nextCartItems;
           localStorage.setItem('cartitems', JSON.stringify(state.cartItems));
           toast.error(`${action.payload.name} removed from cart`)

        },

        decreaseQuantity : (state,action) =>{
           const itemIndex = state.cartItems.findIndex(item => item._id === action.payload._id)
           if(state.cartItems[itemIndex].cartQuantity > 1){
              state.cartItems[itemIndex].cartQuantity -= 1;
              toast.success(` decreased ${action.payload.name} item`)
           }else if(state.cartItems[itemIndex].cartTotalQuantity === 1){

            const nextCartItems =  state.cartItems.filter(item => item._id !== action.payload._id)
            state.cartItems = nextCartItems;
            toast.error(`${action.payload.name} removed from cart`)
            localStorage.setItem('cartitems', JSON.stringify(state.cartItems));

           }
        },

        increaseQuantity : (state,action) =>{
            const itemIndex = state.cartItems.findIndex(item => item._id === action.payload._id)
            if(state.cartItems[itemIndex].cartQuantity < 1){
               state.cartItems[itemIndex].cartQuantity += 1;
               toast.success(` decreased ${action.payload.name} item`)
            }else if(state.cartItems[itemIndex].cartTotalQuantity === 1){
 
             const nextCartItems =  state.cartItems.filter(item => item._id !== action.payload._id)
             state.cartItems = nextCartItems;
             toast.error(`${action.payload.name} removed from cart`)
             localStorage.setItem('cartitems', JSON.stringify(state.cartItems));
 
            }
         },

         getTotalAmount : (state,action) =>{
           let {total,quantity} = state.cartItems.reduce(
            (cartTotal,cartItem)=>{
                const {price,cartQuantity} = cartItem
                const itemTotal = price * cartQuantity
                cartTotal.total += itemTotal
                cartTotal.quantity += cartQuantity
                 return cartTotal
            }, 
                
            {
               total : 0,
               quantity : 0
            })

            state.cartTotalQuantity = quantity
            state.cartTotalAmount = total
         }
    },
    
    extraReducers : {
      
    }

})

export const {addToCart,removeFromcart,decreaseQuantity,increaseQuantity,getTotalAmount} = cartSlice.actions
export default cartSlice.reducer