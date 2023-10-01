import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/actions/auth';

const TestPage = () => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      <h1>Test Page</h1>
      <button className="" type="button" onClick={logout}>Logout</button>
    </>
  );
};

export default TestPage;
