import React, { useState } from "react";
import UsersChatList from "./UsersChatList";
import UserChat from "./UserChat";

const PrivateChat = () => {
   const [selectedUser, setSelectedUser] = useState(null);

    const handleUserSelect = (user) => {
      setSelectedUser(user);
    };
  
  return (
      <div className="row">
        <div className="col-md-3">
          <UsersChatList onUserSelect={handleUserSelect}  />
        </div>
        <div className="col-md-9">
          <UserChat selectedUser={selectedUser} />
        </div>
      </div>
  );
};

export default PrivateChat;
