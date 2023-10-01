import React from 'react';
import { Outlet } from 'react-router-dom';

function WithoutSidebar() {
  return (
    <Outlet />
  );
}

export default WithoutSidebar;
