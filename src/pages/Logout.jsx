import React from "react";
import { useDispatch } from "react-redux";
import { clearUser } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout=()=>{
        localStorage.removeItem('manaze_user')
        dispatch(clearUser())
        navigate('/login')
    }

  return (
<div className="card">
  <div className="card-header">
    Logout
  </div>
  <div className="card-body">
    <h5 className="card-title"></h5>
    <p className="card-text">Are you sure you want to logout ?</p>
    <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
  </div>
</div>


  );
};

export default Logout;
