import React, { useEffect, useState, useRef } from "react";
import { getAPI, postAPI } from "../helpers/apis";
import { useSelector } from "react-redux";

const AIChat = () => {
  const url = import.meta.env.VITE_REACT_APP_IMAGE_URL;
  const ref = useRef(null);
  const user = useSelector((state) => state.user);
  const token = user.token;
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chat, setChat] = useState("");

  useEffect(() => {
    const lastChildElement = ref.current?.lastElementChild;
    lastChildElement?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getChats = async () => {
    const res = await getAPI("aichat/chats", token);
    setMessages(res.chats);
  };

  useEffect(() => {
    getChats();
  }, []);

  const submitChat = async (e) => {
    setIsLoading(true)
    e.preventDefault();
    const data = {
      chat,
    };
    const res = await postAPI("aichat/ask", data, token);
    setChat("");
    getChats();
    setIsLoading(false)
  };

  return (
    <div className="card card-primary card-outline">
      <div
        className="card-body"
        style={{ height: "500px", overflow: "scroll" }}
      >
        {messages.map((item, index) => (
          <div key={index} className="my-2 border p-2" ref={ref}>
            {item.role === "user" ? (
              <div className="text-right">
                <img
                  src={
                    user.user.image
                      ? url + user.user.image
                      : "dist/img/AdminLTELogo.png"
                  }
                  style={{
                    height: "20px",
                    width: "20px",
                    borderRadius: "50%",
                    marginRight: "10px",
                  }}
                />
                {item.content}
              </div>
            ) : (
              <div>
                <img
                  src="dist/img/AdminLTELogo.png"
                  style={{
                    height: "20px",
                    width: "20px",
                    borderRadius: "50%",
                    marginRight: "10px",
                  }}
                />
                {item.content}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="card-footer">
        <form onSubmit={(e) => submitChat(e)} method="post">
          <div className="input-group">
            <input
              type="text"
              name="message"
              placeholder="Type Message ..."
              className="form-control"
              value={chat}
              onChange={(e) => {
                setChat(e.target.value);
              }}
            />
            <span className="input-group-append">
              <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading?'Wait':'Send'}
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AIChat;
