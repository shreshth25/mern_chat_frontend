// src/App.js

import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { getAPI } from "../helpers/apis";

const socket = io(import.meta.env.VITE_REACT_APP_IMAGE_URL);

function Chat() {
  const url = import.meta.env.VITE_REACT_APP_IMAGE_URL;
  const user = useSelector((state) => state.user);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState('')
  const ref = useRef(null);

  useEffect(() => {
    const lastChildElement = ref.current?.lastElementChild;
    lastChildElement?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchChats = async () => {
    const res = await getAPI("chat");
    setMessages(res.chats);
  };
  useEffect(() => {
    fetchChats();
    socket.on("chat", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
    socket.on("typing", (msg) => {
       setTyping(msg)
    });

    return () => {
      socket.off("chat");
      socket.off("typing");
    };
  }, []);

  const typingUser = (e)=>{
    setMessage(e.target.value)
    if(e.target.value)
    {
        socket.emit('typing', user.user.firstname)
    }
    else
    {
        socket.emit('typing', "")
    }
    
  }
  const sendMessage = () => {
    const data = {
      message,
      id: user.user._id,
    };

    console.log(data);
    socket.emit("chat", data);
    setMessage("");
  };

  return (
    <div className="card card-success card-outline direct-chat direct-chat-success shadow-sm">
      <div className="card-header">
        <h3 className="card-title">Group Chat</h3>
        <div className="card-tools">
          <button
            type="button"
            className="btn btn-tool"
            data-card-widget="collapse"
          >
            <i className="fas fa-minus" />
          </button>
        </div>
      </div>
      <div className="card-body">
        {messages.map((msg, index) => (
          <div className="p-2" key={index} ref={ref}>
            {msg.user._id == user.user._id ? (
              <div className="direct-chat-msg right">
                <div className="direct-chat-infos clearfix">
                  <span className="direct-chat-name float-right">
                    {msg.user.firstname}
                  </span>
                  <span className="direct-chat-timestamp float-left">
                    {msg.createdAt}
                  </span>
                </div>
                <img
                  className="direct-chat-img"
                  src={
                    msg.user.image
                      ? url + msg.user.image
                      : "dist/img/AdminLTELogo.png"
                  }
                  alt="Message User Image"
                />
                <div className="direct-chat-text">{msg.message}</div>
              </div>
            ) : (
              <div className="direct-chat-msg">
                <div className="direct-chat-infos clearfix">
                  <span className="direct-chat-name float-left">
                    {msg.user.firstname}
                  </span>
                  <span className="direct-chat-timestamp float-right">
                    {msg.createdAt}
                  </span>
                </div>
                <img
                  className="direct-chat-img"
                  src={
                    msg.user.image
                      ? url + msg.user.image
                      : "dist/img/AdminLTELogo.png"
                  }
                  alt="Message User Image"
                />
                <div className="direct-chat-text">{msg.message}</div>
              </div>
            )}
          </div>
        ))}
        <div className="text-muted ml-2">{typing}</div>
      </div>
      <div className="card-footer">
        <div>
          <div className="input-group">
            <input
              type="text"
              name="message"
              placeholder="Type Message ..."
              className="form-control"
              value={message}
              onChange={(e) => typingUser(e)}
            />
            <span className="input-group-append">
              <button
                type="submit"
                className="btn btn-success"
                onClick={sendMessage}
              >
                Send
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
