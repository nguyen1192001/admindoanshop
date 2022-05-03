import { ActionTypes } from "../CONTAIN/action-type";
const initialsState = {
    cartItems: [],
    oderShipping: []
}
export const cartReducer = (state = initialsState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_CART:
            return { ...state, cartItems: payload }
        case ActionTypes.SET_ODER_SHIPPING:
            return { ...state, oderShipping: payload }
        default:
            return state
    }
}