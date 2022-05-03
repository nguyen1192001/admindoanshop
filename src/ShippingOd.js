import '../src/style.css'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, removeUserSession } from './Utils/Common'
import { useNavigate } from 'react-router-dom'
import { setOdShipping } from './REDUX/ACTION/cartAction'
const qs = require('qs');

function ShippingOd() {
    const navigate = useNavigate();
    const oderShipping = useSelector((state) => state.allCarts.oderShipping)
    const dispatch = useDispatch()
    const nguoivc = getUser()
    // const [order , setOrder] = useState('chuaxacnhan')
    const [shipping, setOrder] = useState('xacnhan')

    const fetchOderShipping = async () => {
        const response = await axios.get("http://localhost:4000/dcShiping")
            .catch((err) => {
                console.log("error: ", err)
            })
        dispatch(setOdShipping(response.data))
    }
    //when order change get new data
    useEffect(() => {
        fetchOderShipping()
    }, [shipping])

    // useEffect(() => {
    //   fetchCartItems()
    // }, [])

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
                console.log("doccument shipping", response.data)
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

        console.log("data update", dataUpdate)
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

                // setButtonState(true)

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


            })
            .catch(function (error) {
                console.log(error);
            });
    }



    const renderCustomer = oderShipping.filter((item) => {
        return item[5] === shipping
    }).map((item, key) => {

        return (

            <div className="order_container">
                <div key={key} className="customer">
                    <h3>khách hàng</h3>
                    <h4> <span>Tên:</span>{item[1].tenkh}</h4>
                    <h4> <span>Địa chỉ:</span>{item[1].diachi}</h4>
                    <h4><span>SĐT:</span>{item[1].sdt}</h4>
                    <h3><span>Ngày đặt:</span>{item[4]}</h3>
                    <h3><span>Tổng đơn hàng:</span>${item[3]}</h3>
                    {
                        item[5] === "chuaxacnhan" ? (<button className="btn" onClick={() => { receiveOder(item._id, item[4]) }}>Nhận đơn</button>) :
                            (<>
                                <button className="btn" onClick={() => { successOder(item._id) }}>Hoàn thành</button>
                                <button className="btn" onClick={() => { destroyOder(item._id) }}>Hủy đơn</button>
                            </>
                            )
                    }

                </div>
                <div className="order">
                    {
                        item[0].map(e => {
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
    const NhanDon = () => {
        if (shipping !== 'danhandon') {
            setOrder('danhandon')
        } else {
            setOrder('chuaxacnhan')
        }
    }



    return (
        <header id="home" className="header">
            <nav className="nav">
                <div className="navigation container">
                    <div className="logo">
                        <h1>shivan</h1>
                        <h1 onClick={NhanDon}>ĐÃ NHẬN ĐƠN</h1>
                        <h1 onClick={LogOut}> Log Out</h1>
                    </div>
                </div>
            </nav>

            {renderCustomer}


        </header>
    );
}

export default ShippingOd;
