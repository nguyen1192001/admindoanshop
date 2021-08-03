import { cartReducer } from "./CartReducer"
import { combineReducers } from "redux"
const reducers = combineReducers({
   allCarts:cartReducer
})
export default reducers