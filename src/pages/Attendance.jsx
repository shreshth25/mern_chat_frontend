import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postAPI } from "../helpers/apis";

const Attendance = () => {
  const user = useSelector((state) => state.user);
  const token = user.token;

  const [comment, setComments] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [hours, setHours] = useState("");

  const addAttendance = async (e) => {
    e.preventDefault();
    const data = {
      date,
      hours,
      comment,
    };
    const res = await postAPI("attendance/add", data, token);
    if (res.status == "Success") {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };
  return (
    <div className="card">
      <div className="card-header">Attendance</div>
      <div className="card-body">
        <div className="card-text">
          <form onSubmit={(e) => addAttendance(e)}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Add Comment
              </label>
              <textarea
                type="text"
                className="form-control"
                required
                onChange={(e) => {
                  setComments(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Add hours
              </label>
              <input
                type="number"
                required
                className="form-control"
                onChange={(e) => {
                  setHours(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Add Date
              </label>
              <input
                type="date"
                className="form-control"
                required
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Attendance;
