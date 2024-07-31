import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PriveVateRoute = () => {
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PriveVateRoute;
