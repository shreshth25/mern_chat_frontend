import React from "react";

const ChatBlock = ({msg, user, type}) => {
  const url = import.meta.env.VITE_REACT_APP_IMAGE_URL;
  if(msg.type=='image')
  {
    return (
      <div className={`text-${type}`}>
        <img style={{height:"200px", width:"200px"}} src={url+msg.text}></img>
      </div>
    )
  }
  return (
    <div className={`direct-chat-msg ${type}`}>
      <div className="direct-chat-infos clearfix">
        <span className="direct-chat-name float-right">
          {user.firstname}
        </span>
        <span className="direct-chat-timestamp float-left">
          {new Date(msg.timestamp).toLocaleString()}
        </span>
      </div>
      <img
        className="direct-chat-img"
        src={
          user.image ? url + user.image : "dist/img/AdminLTELogo.png"
        }
        alt="Message User Image"
      />
      <div className="direct-chat-text">
      {msg.text}
      </div>
    </div>
  );
};

export default ChatBlock;
