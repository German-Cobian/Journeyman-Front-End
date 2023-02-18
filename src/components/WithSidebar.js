import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

function WithSidebar() {
  const { currentUser } = useSelector((state) => state.auth);
  return (
    <>
      <Sidebar currentUser={currentUser.role} />
      <Outlet />
    </>
  );
}

export default WithSidebar;
