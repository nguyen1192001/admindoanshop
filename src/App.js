import '../src/style.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Authentication from "./Authentication";
import Shipper from "./Shipper"
import { getUser } from './Utils/Common';
import ShippingOd from './ShippingOd';

let shipper = getUser()


let ktra = () =>{
  if(shipper){
    return true
  }else{
    return false
  }
}


function App() {
  return (
    <Router>
      {/* <ShippingOd/> */}
      <Routes>
        <Route path='/' element={<Authentication/>} />
        <Route path="/Shipper" element={ktra() ? <Shipper/> : <Authentication/> } />
        
      </Routes>
    </Router>
    
  );
}

export default App;
