import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { getAPI, postAPI } from "../helpers/apis";

const socket = io(import.meta.env.VITE_REACT_APP_IMAGE_URL);

function OneChat({ selectedUser, setTyping }) {
  const url = import.meta.env.VITE_REACT_APP_IMAGE_URL;
  const user = useSelector((state) => state.user);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    const lastChildElement = ref.current?.lastElementChild;
    lastChildElement?.scrollIntoView({ behavior: "smooth" });
  }, [messages, selectedUser]);

  const fetchChats = async () => {
    const res = await postAPI("chat/privatechats", {
      sender: user.user._id,
      receiver: selectedUser._id,
    });
    setMessages(res.chats);
  };
  useEffect(() => {
    socket.emit("setUserId", user.user._id);

    fetchChats();
    socket.on("personalChat", (msg) => {
      if (msg.receiver == user.user._id && msg.sender == selectedUser._id) {
        setMessages((prevMessages) => [...prevMessages, msg]);
      }
      if (msg.sender == user.user._id && msg.receiver == selectedUser._id) {
        setMessages((prevMessages) => [...prevMessages, msg]);
      }
    });

    socket.on("typing", (msg) => {
      console.log(msg);
      if (msg.receiver == user.user._id && msg.sender == selectedUser._id) {
        setTyping(msg.name + " is typing...");
      } else if (
        msg.sender == user.user._id &&
        msg.receiver == selectedUser._id
      ) {
        setMessages(msg.name + " is typing...");
      } else {
        setTyping("");
      }
    });

    return () => {
      socket.off("personalChat");
      socket.off("typing");
    };
  }, [selectedUser]);

  const typingUser = (e) => {
    setMessage(e.target.value);
    if (e.target.value) {
      const t = {
        name: user.user.firstname,
        receiver: selectedUser._id,
        sender: user.user._id,
      };
      socket.emit("typing", t);
    } else {
      socket.emit("typing", "");
    }
  };
  const sendMessage = () => {
    const data = {
      message: message,
      receiver: selectedUser._id,
      sender: user.user._id,
    };

    socket.emit("personalChat", data);
    setMessage("");
    socket.emit("typing", "");
  };

  return (
    <div className="direct-chat direct-chat-success">
      <div style={{ height: "280px", overflow: "scroll", overflowX: "hidden" }}>
        {messages.map((msg, index) => (
          <div className="p-2" key={index} ref={ref}>
            {msg.sender == user.user._id ? (
              <div className="direct-chat-msg right">
                <div className="direct-chat-infos clearfix">
                  <span className="direct-chat-name float-right">
                    {user.user.firstname}
                  </span>
                  <span className="direct-chat-timestamp float-left">
                    {new Date(msg.timestamp).toLocaleString()}
                  </span>
                </div>
                <img
                  className="direct-chat-img"
                  src={
                    user.user.image
                      ? url + user.user.image
                      : "dist/img/AdminLTELogo.png"
                  }
                  alt="Message User Image"
                />
                <div className="direct-chat-text">{msg.text}</div>
              </div>
            ) : (
              <div className="direct-chat-msg">
                <div className="direct-chat-infos clearfix">
                  <span className="direct-chat-name float-left">
                    {selectedUser.firstname}
                  </span>
                  <span className="direct-chat-timestamp float-right">
                    {new Date(msg.timestamp).toLocaleString()}
                  </span>
                </div>
                <img
                  className="direct-chat-img"
                  src={
                    selectedUser.image
                      ? url + selectedUser.image
                      : "dist/img/AdminLTELogo.png"
                  }
                  alt="Message User Image"
                />
                <div className="direct-chat-text">{msg.text}</div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-2">
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
          <label htmlFor="profilePictureInput" className="btn btn-warning">
            <i className="fa fa-paperclip" aria-hidden="true"></i>
            <input
            type="file"
            id="profilePictureInput"
            accept="image/*"
            style={{ display: 'none' }}
          />
          </label>
          <label className="btn btn-success">
          <i className="fa fa-paper-plane" aria-hidden="true"></i>
          <input
          type="button"
          onClick={sendMessage}
          disabled={!message}
          style={{ display: 'none' }}
        />
        </label>
        </span>
      </div>
    </div>
    
    </div>
  );
}

export default OneChat;
