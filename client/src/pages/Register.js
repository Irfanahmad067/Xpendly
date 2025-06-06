import { Form, message } from "antd";
import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "../resources/authentication.css";
import axios from "axios";
import Spinner from "../components/Spinner";

export const Register = () => {
    const url = process.env.REACT_APP_BACKEND_URL;
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(true)
    const onFinish = async(values) => {
      try{
        setLoading(true)
        await axios.post(`${url}/api/users/register`, values)
        message.success('Registered Successfully',[20]);
        navigate('/login')
        setLoading(false)
      }
      catch(error){ 
        setLoading(false)
        message.error("something went wrong")
      };
    };

  useEffect(() => {
    if(localStorage.getItem('track-it-user')){
      navigate('/')
    }
      })

  return (
    <div className="register">
      {loading && <Spinner />}
      <div className="row justify-content-center align-items-center w-100 h-100">
        {/* <div className="col-md-5">
          <div className="lottie">
            <lottie-player
              src="https://assets3.lottiefiles.com/packages/lf20_06a6pf91.json"
              background="transparent"
              speed="1"
              loop
              autoplay
            ></lottie-player>
          </div>
        </div> */}

        <div className="col-md-5">
          <Form layout="vertical" onFinish={onFinish} className="login-form">
            <h1 className="text-center">REGISTER</h1>
            <p className="text-center subtitle">
              Create your account to get started
            </p>
            <Form.Item label="Name" name="name">
              <Input placeholder="Enter your Name" />
            </Form.Item>

            <Form.Item label="Email" name="email">
              <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item label="Password" name="password">
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            <div className="d-flex justify-content-between align-items-center">
              <Link to="/login">Already Registered, Click Here to Login</Link>
              <button className="secondary btn btn-glow" type="submit">
                Register
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};
