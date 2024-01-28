import React from "react";

const ChatBlock = ({msg, user, type}) => {

  const datefunction = (date)=>{
    var today = new Date();
    var s_date = new Date(date)
    if(today.setHours(0,0,0,0) == s_date.setHours(0,0,0,0))
    { 
      return "Today"; 
    }
    else { return s_date.toLocaleString() } 
  }
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
         {
          type=='right'?'':user.firstname
         }
        </span>
        <span className="direct-chat-timestamp float-left">
         {datefunction(msg.timestamp)}
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
