import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAPI } from "../helpers/apis";

const Progress = () => {
  const user = useSelector((state) => state.user);
  const token = user.token;
  const [attendance, setAttendance] = useState([]);

  const getAttendance = async () => {
    const res = await getAPI("attendance", token);
    setAttendance(res.data);
  };

  useEffect(() => {
    getAttendance();
  }, []);


  return (
    <div className="card">
      <div className="card-header">Progress</div>
      <div className="card-body">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col" style={{ minWidth: "150px" }}>
                Date
              </th>
              <th scope="col">Hours</th>
              <th scope="col">Comment</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((item, index) => (
              <tr key={index}>
                <td>{new Date(item.date).toDateString()}</td>
                <td>{item.hours}</td>
                <td>{item.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Progress;
