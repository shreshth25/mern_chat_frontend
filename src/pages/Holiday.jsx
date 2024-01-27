import React, { useEffect, useState } from "react";
import { getAPI, postAPI } from "../helpers/apis";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Holiday = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [holidays, setHolidays] = useState([]);
  const [selectedHoliday, setSelectedHoliday] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const getHolidays = async () => {
    console.log("SAS")
    const res = await getAPI("holiday");
    setHolidays(res.data);
  };

  useEffect(() => {
    getHolidays();
  }, []);

  const addHoliday = async (e) => {
    e.preventDefault();
    const data = {
      name,
      date,
    };
    const res = await postAPI("holiday/add", data);
    getHolidays();
  };

  const openEditModal = (holiday) => {
    setSelectedHoliday(holiday);
    setShowEditModal(true);
  };

  const openDeleteModal = (holiday) => {
    setSelectedHoliday(holiday);
    setShowDeleteModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleInputChange = (e)=>{
    const {name, value} = e.target
    setSelectedHoliday((prevValue)=>
    ({...prevValue, 
      [name]:value}
    ))
  }

  const saveEdit = async() => {
    const data = {
      name: selectedHoliday.name,
      date: selectedHoliday.date,
      id: selectedHoliday._id
    }
    console.table(data)
    const res = await postAPI('holiday/update', data)
    if(res.status='Success')
    {
      toast.success(res.message)
    }
    getHolidays()
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">Add Holiday</div>
        <div className="card-body">
          <div className="card-text">
            <form onSubmit={(e) => addHoliday(e)}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter the Holiday Name"
                  value={name}
                  required
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Date</label>
                <input
                  type="date"
                  value={date}
                  className="form-control"
                  required
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                />
              </div>
              <button type="submit" className="btn btn-outline-primary">
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header">Holidays</div>
        <div className="card-body">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Date</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {holidays.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{item.name}</th>
                  <td>{new Date(item.date).toISOString().split('T')[0]}</td>
                  <td>
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => openEditModal(item)}
                      data-toggle="modal"
                      data-target="#editModal"
                    >
                      Edit
                    </button>
                    <button className="btn btn-outline-danger ml-2"
                    onClick={() => openDeleteModal(item)}
                    data-toggle="modal"
                    data-target="#deleteModal">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showEditModal && (
        <div
          className="modal fade"
          id="editModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="editModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Holiday</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={closeEditModal}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter the Holiday Name"
                      value={selectedHoliday.name}
                      required
                      onChange={handleInputChange}
                      name="name" 
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Date</label>
                    <input
                      type="date"
                      value={new Date(selectedHoliday.date).toISOString().split('T')[0]}
                      className="form-control"
                      placeholder="Enter the Holiday Name"
                      required
                      onChange={handleInputChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={saveEdit}
                >
                  Save changes
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={closeEditModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div
          className="modal fade"
          id="deleteModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="editModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete Holiday</h5>
                <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={closeDeleteModal}
              >
                <span aria-hidden="true">&times;</span>
              </button>
              </div>
              <div className="modal-body">
              Are you sure you want to delete this holiday ?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={saveEdit}
                >
                  Delete Anyway
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={closeDeleteModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer/>
    </div>
  );
};

export default Holiday;
