import React from 'react';
import { Navigate } from 'react-router-dom';

// The ProtectedRoute component checks if the user is authenticated.
// If authenticated, it renders the children (ProtectedLayout).
// If not, it redirects to the login page.

function ProtectedRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem("auth_token");

  // If authenticated, render children (ProtectedLayout and its routes)
  // If not authenticated, redirect to /auth (login page)
  return isAuthenticated ? children : <Navigate to="/auth" />;
}

export default ProtectedRoute;
