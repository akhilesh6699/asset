import React from "react";
import { Navigate } from "react-router-dom";
const ProtectedRoutes = ({ children }) => {
  const result = localStorage.getItem("isLoggedIn");
  if (!result) {
    return <Navigate to="/" />;
  }
  return children;
};
export default ProtectedRoutes;
