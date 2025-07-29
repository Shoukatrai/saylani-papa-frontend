import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
const ClientRoutes = () => {
 const token  = Cookies.get("token")
  

  if (!token) {
    return <Navigate to="/login" />;
  }

 const userType  = Cookies.get("type")

  if (userType === 'customer') {
    return <Outlet />;
  } else if (userType === 'admin') {
    return <Navigate to="/admin-dashboard" />;
  } else if (userType === 'vendor') {
    return <Navigate to="/vendor-dashboard" />;
  } else {
    return <Navigate to="/unauthorized" />;
  }
};



export default ClientRoutes
