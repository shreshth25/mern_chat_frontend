import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { postAPI } from "../helpers/apis";

const Register = () => {
  const navigate = useNavigate()
  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [confirm_password, setConfirmPassword] = useState('')
  const [email, setEmail] = useState('')

  const handleRegister = async(e)=>{
    e.preventDefault()
    if(password.length<6)
    {
      toast.error('Password too small atleast 6 digit is required')
      return
    }
    if(password!=confirm_password)
    {
      toast.error('Password do not Match')
      return
    }
    const data = {
      firstname,
      lastname,
      password,
      email
    }

    const response_data =await postAPI('auth/register', data)

    if(response_data['status']=='Error')
    {
      toast.error(response_data['data'])
    }
    if(response_data['status']=='Success')
    {
      toast.success(response_data['data'])
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    }
  }
  return (
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="card card-outline card-primary">
          <div className="card-header text-center">
            <a href="/register" className="h1">
              <b>Manaze </b>Portal
            </a>
          </div>
          <div className="card-body">
            <p className="login-box-msg">Create a new account</p>
            <form onSubmit={(e)=>handleRegister(e)}>
                <div className="input-group mb-3">
                <input
                type="text"
                className="form-control"
                placeholder="Firstname"
                required
                onChange={(e)=>setFirstName(e.target.value)}
                />
                <div className="input-group-append">
                    <div className="input-group-text">
                        <span className="fas fa-user" />
                    </div>
                </div>
                </div>
                <div className="input-group mb-3">
                <input
                type="text"
                className="form-control"
                placeholder="Lastname"
                required
                onChange={(e)=>setLastName(e.target.value)}
                />
                <div className="input-group-append">
                    <div className="input-group-text">
                        <span className="fas fa-user" />
                    </div>
                </div>
                </div>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  required
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
                  required
                  onChange={(e)=>setPassword(e.target.value)}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                required
                onChange={(e)=>setConfirmPassword(e.target.value)}
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
                  <button type="submit" className="btn btn-primary btn-block">
                    Sign Up
                  </button>
                </div>
              </div>
              <div className="row">
              <div className="col-12">
              <NavLink to='/login' className="btn btn-secondary btn-block mt-5">
                Already have account ? Login here  
              </NavLink>
              </div>
            </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
