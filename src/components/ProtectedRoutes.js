import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = ({ isAllowed, authChecked, redirectPath }) => {
  if (!authChecked) return <p>Loading...</p>;
  if (!isAllowed) return <Navigate to={redirectPath} replace />;
  return <Outlet />;
};

export default ProtectedRoutes;
