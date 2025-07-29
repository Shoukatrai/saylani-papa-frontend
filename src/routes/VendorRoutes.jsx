import { Navigate, Outlet } from 'react-router-dom';
import Cookies from "js-cookie";
const VendorRoutes = () => {

  const token = Cookies.get("token")
  if (!token) {
    return <Navigate to="/login" />;
  } 

  const userType = Cookies.get("type");

  if (userType === 'vendor') {
    return <Outlet />;
  }

  if (userType === 'admin') {
    return <Navigate to="/admin-dashboard" />;
  }

  if (userType === 'customer') {
    return <Navigate to="/" />;
  }

  return <Navigate to="/unauthorized" />;
};

export default VendorRoutes;
