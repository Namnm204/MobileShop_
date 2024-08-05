import { Navigate, Outlet } from "react-router-dom";

const PriveVateRoute = ({ allowedRole }) => {
  const role = JSON.parse(localStorage.getItem("user") || "{}").user?.role;

  // Kiểm tra nếu có token và role hợp lệ
  if (role === allowedRole) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PriveVateRoute;
