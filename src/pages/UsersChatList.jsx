import React, { useEffect, useState } from "react";
import { getAPI } from "../helpers/apis";
import { useSelector } from "react-redux";

const UsersChatList = ({onUserSelect}) => {
  const user = useSelector((state)=>state.user)
  const url = import.meta.env.VITE_REACT_APP_IMAGE_URL;
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const res = await getAPI("users");
    const data = res.data.filter((item)=>item._id!=user.user._id)
    setUsers(data);
  };
  useEffect(() => {
    getUsers();
  }, []);

  const handleUserClick = (user) => {
    onUserSelect(user);
  };
  return (
    <div className="card card-default">
      <div className="card-header">
        <h3 className="card-title">
          <i className="fas fa-users mr-2"></i>
          Users
        </h3>
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
        {users.map((user) => (
          <div className="callout callout-warning" style={{cursor:"pointer"}}
          onClick={() => handleUserClick(user) } key={user._id}
          >
            <div className="row">
              <div className="col-3 text-center">
                <img
                  src={
                    user.image ? url + user.image : "dist/img/AdminLTELogo.png"
                  }
                  alt="User profile picture"
                  style={{ height: "20px", width: "20px", border: "1px solid grey", borderRadius:"50%", borderSpacing:"1px" }}
                />
              </div>
              <div className="col-9 text-start">
                <div className="text-muted">
                  {user.firstname} {user.lastname}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersChatList;
