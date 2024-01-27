import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginUser } from "../store/slices/userSlice";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const handleLogin = async(e)=>{
    e.preventDefault()
    const data = {
      password,
      email
    }

    const result = await dispatch(loginUser(data));
    if(result.payload && result.payload.status=='Error')
    {
      toast.error(result.payload.message)
    }
    if(result.payload && result.payload.status=='Success')
    {
      toast.success(result.payload.message)
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }

  }
  return (
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="card card-outline card-primary">
          <div className="card-header text-center">
            <a href="../../index2.html" className="h1">
              <b>Manaze </b>Portal
            </a>
          </div>
          <div className="card-body">
            <p className="login-box-msg">Sign in to start your session</p>
            <form action="../../index3.html" method="post">
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  onChange={(e)=>setEmail(e.target.value)}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={(e)=>setPassword(e.target.value)}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-8">
                  <div className="icheck-primary">
                    <input type="checkbox" id="remember" />
                    <label htmlFor="remember">Remember Me</label>
                  </div>
                </div>
                <div className="col-4">
                  <button type="submit" className="btn btn-primary btn-block" onClick={(e)=>handleLogin(e)}>
                    Sign In
                  </button>
                </div>
              </div>
            </form>
            <div className="row">
            <div className="col-12">
            <NavLink to='/register' className="btn btn-secondary btn-block mt-5 mb-2">
              Don't have account ? Create one now  
            </NavLink>
            </div>
            </div>
            <p className="mb-1">
              <a href="forgot-password.html">I forgot my password</a>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
