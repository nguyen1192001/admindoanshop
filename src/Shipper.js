import '../src/style.css'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCarts, setOdShipping } from './REDUX/ACTION/cartAction'
import { getUser, removeUserSession } from './Utils/Common'
import { useNavigate } from 'react-router-dom'
const qs = require('qs');

function Shipper() {
  const navigate = useNavigate();
  const oderCart = useSelector((state) => state.allCarts.cartItems)
  const listOrdered = useSelector(state => state.allCarts.oderShipping)
  const dispatch = useDispatch()
  const nguoivc = getUser()
  const [order , setOrder] = useState('chuaxacnhan')
const user = getUser();
console.log("user",user)

  const fetchCartItems = async () => {
   try {
    const response = await axios.get("http://localhost:4000/cart/")
    .catch((err) => {
      console.log("error: ", err)
    })
    console.log("data response",response.data)
   dispatch(setCarts(response.data))
   } catch (error) {
      console.log("eroor",error)
   }
  }



  //when order change get new data
  useEffect(() => {
    fetchCartItems()
  }, [order])
  
  useEffect(() => {
    axios.get('http://localhost:4000/dcShiping')
    .then(function (response) {
      console.log("doccument shippingggggg", response.data)
      dispatch(setOdShipping(response.data))
    })
    .catch(function (error) {
      console.log(error);
    });
  }, [])
  useEffect(() => {
    axios.get('http://localhost:4000/dcShiping')
    .then(function (response) {
      console.log("doccument shippingggggg", response.data)
      dispatch(setOdShipping(response.data))
    })
    .catch(function (error) {
      console.log(error);
    });
  }, [order])

  const receiveOder = (madondathang, ngaydat) => {
    var ngaygiao = new Date(ngaydat)
    ngaygiao.setDate(ngaygiao.getDate() + 4)
    let trangthai = "xacnhan"
    let data = qs.stringify({ madondathang, nguoivc, ngaygiao, trangthai });
    let config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }

    axios.post('http://localhost:4000/dcShiping', data, config)
      .then(function (response) {
        console.log("doccument shippingggggg", response.data)
        // console.log("sadffffffffffff",response.data)
        // dispatch(setOdShipping(response.data))
        // setButtonState(true)
        // get function 'NhanDoi' if u want switch tab "da nhan hang"
        // you can comment it if u don't want switch tab
        NhanDon();

      })
      .catch(function (error) {
        console.log(error);
      });


    let trangthaiddh = "danhandon"
    let dataUpdate = qs.stringify({ madondathang, 5: trangthaiddh })

    console.log("data update",dataUpdate)
    axios.post('http://localhost:4000/cart/update', dataUpdate, config)
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const successOder = (madondathang) => {
    let trangthai = "hoanthanh"
    let data = qs.stringify({ madondathang, trangthai });
    let config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    axios.post('http://localhost:4000/dcShiping/update', data, config)
      .then(function (response) {
       alert("???? x??c nh???n ho??n th??nh ????n !")
       NhanDon();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const destroyOder = (madondathang) => {
    let trangthai = "thatbai"
    let data = qs.stringify({ madondathang, trangthai });
    let config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    axios.post('http://localhost:4000/dcShiping/update', data, config)
      .then(function (response) {
        // setButtonState(true)
        // NhanDon() 
       alert("???? x??c nh???n h???y ????n !")
        NhanDon();

      })
      .catch(function (error) {
        console.log(error);
      });
  }



  const renderCustomer = oderCart.filter((item)=>{
    return item[5] === order
  }).map((item, key) => {
      return (
      <div className="order_container">
        <div key={key} className="customer">
          <h3>kh??ch h??ng</h3>
          <h4> <span>T??n:</span>{item[1].tenkh}</h4>
          <h4> <span>?????a ch???:</span>{item[1].diachi.dcchitiet + " " + item[1].diachi.quan}</h4>
          <h4><span>S??T:</span>{item[1].sdt}</h4>
          <h3><span>Ng??y ?????t:</span>{item[4]}</h3>
          <h3><span>T???ng ????n h??ng:</span>${item[3]}</h3>
          {
             (<button className="btn" onClick={() => { receiveOder(item._id, item[4]) }}>Nh???n ????n</button>) 
             
          }

        </div>
        <div className="order">
          {
            item[0].map(e => {
              console.log("item[0]",item[0])
              return (
                <div className='oder'>
                  <div className="oder_product_cart">
                    <div className="oder_product-img">
                      <img src={e.hinhanh} alt="" />
                    </div>
                    <h5>{e.tensp}</h5>
                    <div className="oder_total-price">${e.gia}</div>
                  </div>
                  <h5>--- s??? ??i???n tho???i l???y h??ng: {e.nhacc.sdt}</h5>
                  <h5>--- ?????a ch??? l???y h??ng: {e.nhacc.diachincc.quan} - {e.nhacc.diachincc.dcctiet}</h5>
                </div>
               
              )
            })
          }
        </div>
      </div>
    )

})



console.log("listOrdered",listOrdered)

const renderOrderd = listOrdered.filter((item)=>{
  return user._id === item.nguoivc._id && item.trangthai == 'xacnhan'
}).map((item, key) => {
  return (
  <div className="order_container">
    <div key={key} className="customer">
      <h3>kh??ch h??ng</h3>
      <h4> <span>T??n:</span>{item.dondathang[1].tenkh}</h4>
      <h4> <span>?????a ch???:</span>{item.dondathang[1].diachi.dcchitiet + " " + item.dondathang[1].diachi.quan}</h4>
      <h4><span>S??T:</span>{item.dondathang[1].sdt}</h4>
      <h3><span>Ng??y ?????t:</span>{item.dondathang[4]}</h3>
      <h3><span>T???ng ????n h??ng:</span>${item.dondathang[3]}</h3>
      {
          (<>
            <button className="btn" onClick={() => { successOder(item._id) ; console.log("sasdaf") }}>Ho??n th??nh</button>
            <button className="btn" onClick={() => { destroyOder(item._id) }}>H???y ????n</button>
          </>
          )
      }

    </div>
    <div className="order">
      {
        item.dondathang[0].map(e => {
          return (
            <div className="oder_product_cart">
              <div className="oder_product-img">
                <img src={e.hinhanh} alt="" />
              </div>
              <h5>{e.tensp}</h5>
              <div className="oder_total-price">${e.gia}</div>
            </div>
          )
        })
      }
    </div>
  </div>
)

})


const LogOut = () => {
  removeUserSession()
  return navigate("/")
}
const NhanDon = ()=>{
  if(order !== 'danhandon'){
    setOrder('danhandon')
  }else {
    setOrder('chuaxacnhan')
  }
}

return (
  <header id="home" className="header">
    <nav className="nav">
      <div className="navigation container">
        <div className="logo">
          <h1>shivan</h1>
          <h1 onClick={NhanDon}>{order === "danhandon" ? "???? NH???N ????N" : "CH??A NH???N ????N"}</h1>
          <h1 onClick={LogOut}> Log Out</h1>
        </div>
      </div>
    </nav>

    {order !== 'danhandon' ?  renderCustomer : renderOrderd}


  </header>
);
}

export default Shipper;
