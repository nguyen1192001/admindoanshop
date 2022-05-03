import { ActionTypes } from "../CONTAIN/action-type";
export const setCarts = (cartItems) =>{
    console.log("cartItem",cartItems)
    return{
        type:ActionTypes.SET_CART,
        payload:cartItems
    }
}
export const setOdShipping = (shipping) =>{
    return{
        type:ActionTypes.SET_ODER_SHIPPING,
        payload:shipping
    }
}