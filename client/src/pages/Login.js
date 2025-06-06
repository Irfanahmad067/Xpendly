import { Form, message } from "antd";
import React, {useEffect, useState} from "react";
import { Input } from "antd";
import { Link , useNavigate} from "react-router-dom";
import "../resources/authentication.css";
import axios from "axios";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";


export const Login = () => {
  const url = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    try{
      setLoading(true)
      const response  = await axios.post(`${url}/api/users/login`, values)
      localStorage.setItem('track-it-user', JSON.stringify({...response.data, password:''}))
      setLoading(false)
      message.success('Login Successfully')
      navigate('/')
    }
    catch(error){
      setLoading(false)
      console.log("error2222", error)
    }
    
  };

  useEffect(() => {
    if(localStorage.getItem('track-it-user')){
      navigate('/')
    }
  },[])

  return (
    <div className="register">
      {loading && <Spinner />}
      <div className="row justify-content-center align-items-center w-100 h-100">
        <div className="col-md-5">
          <Form layout="vertical" onFinish={onFinish} className="login-form">
            <h1 className="text-center">LOGIN</h1>
            <p className="text-center subtitle">
              Welcome back! Please login to your account.
            </p>

            <Form.Item label="Email" name="email">
              <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item label="Password" name="password">
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            <div className="d-flex justify-content-between align-items-center mt-4">
              <Link to="/register">Not registered yet? Sign up</Link>
              <button className="btn btn-glow" type="submit">
                LOGIN
              </button>
            </div>
          </Form>
        </div>

        {/* <div className="col-md-5 d-none d-md-block">
          <div className="auth-image-wrapper">
            <img
              src=""
              alt="Login Illustration"
              className="img-fluid auth-image"
            />
          </div>
        </div> */}
      </div>
    </div>
  );
};
