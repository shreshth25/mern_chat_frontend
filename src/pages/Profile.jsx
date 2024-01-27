import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postAPI, postFormDataAPI } from '../helpers/apis';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateUser } from '../store/slices/userSlice';

const Profile = () => {
  const url = import.meta.env.VITE_REACT_APP_IMAGE_URL;

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch()
  const user_data = user.user;
  const token = user.token;

  const handleFileChange = async(e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    const data = await postFormDataAPI('auth/update-image', formData, token)
    await dispatch(updateUser())
    if(data.status=='SUCCESS')
    {
      toast.success(data.message)
    }
    
  };


  const [formData, setFormData] = useState({
    firstname: user_data.firstname,
    lastname: user_data.lastname,
    dob: user_data.dob,
    years_of_experience: user_data.years_of_experience,
    fathers_name: user_data.fathers_name,
    mothers_name: user_data.mothers_name,
    joining_date: user_data.joining_date,
    age: user_data.age,
  });

  const updateProfile = async (e) => {
    e.preventDefault();

    const res = await postAPI('auth/update', formData, token);
    await dispatch(updateUser())
    toast.success(res.message)
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="card card-primary card-outline">
      <div className="card-body box-profile">
        <div className="text-center">
        <label htmlFor="profilePictureInput" style={{ cursor: 'pointer' }}>
        <img
          className="profile-user-img img-fluid img-circle"
          src={user.user.image ? url+user.user.image : 'dist/img/AdminLTELogo.png'}
          alt="User profile picture"
        />
        <input
          type="file"
          id="profilePictureInput"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </label>
        </div>
        <h3 className="profile-username text-center">{user_data.firstname} {user_data.lastname}</h3>
        <p className="text-muted text-center">{user_data.code}</p>
        <form onSubmit={(e) => updateProfile(e)}>
          <div className='mb-3'>
            <label>Email</label>
            <input className='form-control' placeholder='Email' value={user_data.email} readOnly></input>
          </div>
          <div className='mb-3'>
            <label>First Name</label>
            <input
              type='text'
              className='form-control'
              placeholder='First Name'
              value={formData.firstname}
              name="firstname"
              onChange={(e)=>handleInputChange(e)}
            />
          </div>
          <div className='mb-3'>
            <label>Last Name</label>
            <input
              type='text'
              className='form-control'
              placeholder='Last Name'
              value={formData.lastname}
              name="lastname"
              onChange={handleInputChange}
            />
          </div>
          <div className='mb-3'>
            <label>Role</label>
            <input className='form-control' placeholder='Role' value={user_data.role} readOnly></input>
          </div>
          <div className='mb-3'>
            <label>DOB</label>
            <input
              type='date'
              className='form-control'
              placeholder='DOB'
              value={formData.dob}
              name="dob"
              onChange={handleInputChange}
            />
          </div>
          <div className='mb-3'>
            <label>Years of Experience</label>
            <input
              type='number'
              className='form-control'
              placeholder='Years of Experience'
              value={formData.years_of_experience}
              name="years_of_experience"
              onChange={handleInputChange}
            />
          </div>
          <div className='mb-3'>
            <label>Father's Name</label>
            <input
              type='text'
              className='form-control'
              placeholder="Father's Name"
              value={formData.fathers_name}
              name="fathers_name"
              onChange={handleInputChange}
            />
          </div>
          <div className='mb-3'>
            <label>Mother's Name</label>
            <input
              type='text'
              className='form-control'
              placeholder="Mother's Name"
              value={formData.mothers_name}
              name="mothers_name"
              onChange={handleInputChange}
            />
          </div>
          <div className='mb-3'>
            <label>Age</label>
            <input
              type='number'
              className='form-control'
              placeholder='Age'
              value={formData.age}
              name="age"
              onChange={handleInputChange}
            />
          </div>
          <div className='mb-3'>
            <label>Joining Date</label>
            <input
              type='date'
              className='form-control'
              placeholder='Joining Date'
              value={formData.joining_date}
              name="joining_date"
              onChange={handleInputChange}
            />
          </div>
          <div className='mb-3'>
          <label>Profile Picture</label>
          <input
            type='date'
            className='form-control'
            placeholder='Update Picture'
            value=''
            name="profile"
            onChange={handleInputChange}
          />
        </div>
          <div className='mb-3 text-center'>
            <button className='btn btn-outline-info' type='submit'>Update Profile</button>
          </div>
        </form>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Profile;
