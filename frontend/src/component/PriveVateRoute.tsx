import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PriveVateRoute = () => {
  const acccessToken = JSON.parse(localStorage.getItem("user"))?.accessToken;
  return acccessToken ? <Outlet /> : <Navigate to="/login" />;
};

export default PriveVateRoute;
