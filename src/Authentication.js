import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {  setUserSession } from './Utils/Common';

const qs = require('qs');


function Authentication() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    let navigate = useNavigate();
   
    const loginApi = () => {
        let data = qs.stringify({ email, password});
        let config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        axios.post('http://localhost:4000/shipper', data, config)
            .then(function (response) {
                console.log("response>>>>>.",response)
              
                if(response.data.error === false){ 
                    setUserSession(true,response.data.e)
                    return navigate("/Shipper");
                    
                }else{
                    alert("ktra dang nhap  " +    response.data)
                    setEmail("")
                    setPassword("")
                }
                
            })
            .catch(function (error) {
                console.log(error);
            });
           
    }

    
    

    return (
        <div className="cover">
            <div className="login">
                <div className="icon-login">
                    <div className="icon-circle">
                        <i className="bx bxs-home-circle" />
                    </div>
                </div>
                <h2>SHIPPER LOG IN</h2>
                <div className="form-login">
                    <div className="form-login-item">
                        <i className="bx bxs-user" />
                        <input type="text" name="email" value={email} placeholder="user name" onChange={(e) => { setEmail(e.target.value) }} />
                    </div>
                    <div className="form-login-item">
                        <i className="bx bxs-lock-alt" />
                        <input type="password" name="password" value={password} placeholder="password" onChange={(e) => { setPassword(e.target.value) }} />
                    </div>
                </div>
                <div className="btn-login" >
                    <input type="button" value="login" onClick={loginApi} />
                </div>

            </div>
        </div>
    )
}


export default Authentication;