import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser && currentUser.email !== null ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
