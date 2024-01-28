import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { getAPI, postAPI, postFormDataAPI } from "../helpers/apis";
import EmojiPicker  from 'emoji-picker-react'
import ChatBlock from "../components/ChatBlock";
const socket = io(import.meta.env.VITE_REACT_APP_IMAGE_URL)
// const socket = io(import.meta.env.VITE_REACT_APP_IMAGE_URL);

function OneChat({ selectedUser, setTyping }) {
  const user = useSelector((state) => state.user);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [showemoji, setShowEmoji] = useState(false);
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
      if (msg.receiver == user.user._id && msg.sender == selectedUser._id) {
        setTyping("Typing...");
      } else if (
        msg.sender == user.user._id &&
        msg.receiver == selectedUser._id
      ) {
        setMessages("Typing...");
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

  const uploadImage = async(e)=>{
    const form = new FormData()
    form.append('image', e.target.files[0])
    form.append('sender',user.user._id)
    form.append('receiver', selectedUser._id)
    const res = await postFormDataAPI('chat/upload', form)
  }

  const showEmoji = () => {
    setShowEmoji((prevstate)=>!prevstate)
  };


  return (
    <div className="direct-chat direct-chat-success">
      <div style={{ height: "280px", overflow: "scroll", overflowX: "hidden" }}>
        {messages.map((msg, index) => (
          <div className="p-2" key={index} ref={ref}>
            {msg.sender == user.user._id ? (
              <ChatBlock user = {user.user} msg={msg} type="right"></ChatBlock>
            ) : (
              <ChatBlock user = {selectedUser}  msg={msg} type=""></ChatBlock>
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
            onChange={(e)=>uploadImage(e)}
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
        <label className="btn btn-info">
        🙂
        <input
        type="button"
        onClick={showEmoji}
        style={{ display: 'none' }}
      />
      </label>
        </span>
      </div>
      {
        showemoji?
        <EmojiPicker
        searchDisabled="true"
        previewConfig={{ showPreview: false }}
        emojiStyle="google"
        onEmojiClick={(e) => setMessage((input) => input + e.emoji)}
        height={200}
        width="100%"
      /> :''
      }
    </div>
    
    </div>
  );
}

export default OneChat;
