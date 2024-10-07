import { Navigate } from 'react-router-dom';
import useAuthen from '../hooks/useAuthen';


const ProtectedRoutes = ({ children, allowedRoles }) => {
    const { userRole, loading } = useAuthen(); 
    console.log("userRole: " + userRole);
    console.log("loading: " + loading);
    
    
  
    if (loading) {
      return <div>Loading...</div>; // Hiển thị trong lúc đang xác thực token
    }
  
    if (!userRole) {
      return <Navigate to="/login" />; // Nếu không có role, chuyển hướng đến trang đăng nhập
    }
  
    return allowedRoles.includes(userRole) ? children : <Navigate to="/unauthorized" />;
  };
export default ProtectedRoutes;  