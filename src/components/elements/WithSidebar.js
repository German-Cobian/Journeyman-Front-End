import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

function WithSidebar() {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
}
export default WithSidebar;
