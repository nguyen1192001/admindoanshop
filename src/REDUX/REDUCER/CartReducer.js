import { ActionTypes } from "../CONTAIN/action-type";
const initialsState = {
    cartItems:[]
}
export const cartReducer = (state = initialsState,{type,payload})=>{
    switch (type){
        case ActionTypes.SET_CART:
            return{...state,cartItems:payload}
        default:
            return state
    }
}