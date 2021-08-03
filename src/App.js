import '../src/style.css'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCarts } from './REDUX/ACTION/cartAction'
function App() {
  const oderCart = useSelector((state) => state.allCarts.cartItems)
  const dispatch = useDispatch()
  const fetchCartItems = async () => {
    const response = await axios.get("http://localhost:4000/cart/")
      .catch((err) => {
        console.log("error: ", err)
      })
    dispatch(setCarts(response.data))
  }
  useEffect(() => {
    fetchCartItems()
  }, [])

  
  const renderOder = oderCart.map((item)=>{
     
    return item[0].map((e)=>{  
      console.log("price " ,e.price) 
      console.log(e.title)
      return (
        <div className="oder_product_cart">
        <div className="oder_product-img">
          <img src="./image/pc4.png" alt="" />
        </div>
        <h5>{e.title}</h5>
        <div className="oder_total-price">${e.price}</div>
      </div>
      )
    })
  })
  console.log({renderOder}) 


  
  const renderCustomer = oderCart.map((item) => {
    console.log(item[0])
    return (
      
        <div className="customer">
          <h3>khách hàng</h3>
          <h4> <span>Tên:</span>{item[1].name}</h4>
          <h4> <span>Địa chỉ:</span>{item[1].adress}</h4>
          <h4><span>SĐT:</span>{item[1].phone}</h4>
        </div>
    )
  })
  console.log(renderCustomer)


  return (
    <header id="home" className="header">
      <nav className="nav">
        <div className="navigation container">
          <div className="logo">
            <h1>shivan</h1>
          </div>
        </div>
      </nav>
      <div className="order_container">

      {renderCustomer}
      <div className="order">
          {
            renderOder
           
          }
        </div>

      </div>
    </header>
  );
}

export default App;
