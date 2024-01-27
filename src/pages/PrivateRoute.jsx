import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../store/slices/userSlice';

const PrivateRoute = ({ element }) => {
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(updateUser());
    }
  }, [dispatch, token]);

  if (!token) {
    return <Navigate to="/login" />;
  }
  return element;
};

export default PrivateRoute
