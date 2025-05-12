import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const user = useSelector((store) => store.user);

  // If no user is found, redirect to the login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // If user exists, render the protected content
  return children;
};

export default PrivateRoute;
