import { ActionTypes } from "../CONTAIN/action-type";
export const setCarts = (cartItems) =>{
    return{
        type:ActionTypes.SET_CART,
        payload:cartItems
    }
}