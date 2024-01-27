import React, { useState } from "react";
import { useSelector } from "react-redux";
import OneChat from "./OneChat";

const UserChat = ({ selectedUser }) => {
  const [typing, setTyping] = useState('')
  const url = import.meta.env.VITE_REACT_APP_IMAGE_URL;
  if (!selectedUser) {
    return (
      <div className="card card-default">
        <div className="card-header">
          <h3 className="card-title">
            <i className="fas fa-users mr-2"></i>
            Chat
          </h3>
        </div>

        <div className="card-body">
          <div className="row">
            <div className="text-center text-muted">
              Please select a user to start chat
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card card-default">
      <div className="card-header">
      <div className="card-tools">
      <button
        type="button"
        className="btn btn-tool"
        data-card-widget="collapse"
      >
        <i className="fas fa-minus" />
      </button>
    </div>
        <h3 className="">
        <div className="row align-items-center">
        <div className="col-1">
          <img
            src={
              selectedUser.image
                ? url + selectedUser.image
                : "dist/img/AdminLTELogo.png"
            }
            alt="User profile"
            style={{
              height: "40px",
              width: "40px",
              border: "1px solid grey",
              borderRadius: "50%",
              borderSpacing: "1px",
            }}
          />
        </div>
        <div className="col-9">
          <h6 className="mb-0">
            <h6 className="text-bold" style={{marginLeft:"10px"}}>
              {selectedUser.firstname} {selectedUser.lastname}
            </h6>
            <div className="text-muted" style={{marginLeft:"10px"}}>
             {typing}
            </div>
          </h6>
        </div>
      </div>
      
      
        </h3>
      </div>
      

      <div className="card-body">
      <OneChat selectedUser = {selectedUser} setTyping={setTyping}/>
      </div>
    </div>
  );
};

export default UserChat;
