import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// const ProtectedRoute = ({ role, children }) => {
//   const userRole = /* Logic to retrieve user role from authentication */; // Replace with your logic

//   if (!userRole || userRole !== role) {
//     return <Navigate to="/login" replace />; // Redirect to login if not authorized
//   }

//   return children ? <Outlet /> : children; // Render child component or Outlet
// };

// export default ProtectedRoute;



const ProtectedRoute = () => {
  // No role check or redirection - allows access to any route

  return <Outlet />; // Render child component
};

export default ProtectedRoute;