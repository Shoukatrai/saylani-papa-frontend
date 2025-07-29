import Cookies from "js-cookie";
import { Navigate, Outlet } from 'react-router-dom';
const AuthRoutes = () => {
  const userType  = Cookies.get("type")
  const token = Cookies.get("token");
  if (token) {
    if (userType === 'admin') {
      return <Navigate to="/admin-dashboard" />;
    } else if (userType === 'vendor') {
      return <Navigate to="/vendor-dashboard" />;
    } else if (userType === 'customer') {
      return <Navigate to="/" />;
    } else {
      return <Navigate to="/unauthorized" />;
    }
  }

  
  return <Outlet />;
}

export default AuthRoutes
