import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'; 

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);  // Access AuthContext

  if (!currentUser) {
    // If no user is logged in, redirect to the login page
    return <Navigate to="/auth"/>;
  }

  // If the user is logged in, render the children components
  return children;
};

export default ProtectedRoute;