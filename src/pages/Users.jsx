import React, { useEffect, useState } from "react";
import { getAPI } from "../helpers/apis";

const Users = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const res = await getAPI("users");
    setUsers(res.data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="card">
      <div className="card-header">Users</div>
      <div className="card-body">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Code</th>
              <th scope="col">Email</th>
              <th scope="col">Years Of Experience</th>
              <th scope="col">Created At</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, index) => (
              <tr key={index}>
                <td>{item.firstname} {item.lastname}</td>
                <td>{item.code}</td>
                <td>{item.email}</td>
                <td>{item.years_of_experience}</td>
                <td>{new Date(item.createdAt).toLocaleString()}</td>
                <td>
                  <button className="btn btn-outline-info">Edit</button>
                  <button className="btn btn-outline-danger ml-2">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
