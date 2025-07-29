import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from "js-cookie"

const AdminRoutes = () => {
  
  const token = Cookies.get("token")
  const userType  = Cookies.get("type")
  if (!token) {
    return <Navigate to="/login" />;
  }

  if (userType === 'admin') {
    return <Outlet />;
  } else if (userType === 'customer') {
    return <Navigate to="/" />;
  } else if (userType === 'vendor') {
    return <Navigate to="/vendor-dashboard" />;
  } else {
    return <Navigate to="/unauthorized" />; 
  }
};

export default AdminRoutes;
