

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../../store/authSlice';

/**
 * Protected Route Component
 * 
 *  Child Explanation:
 * "This is like a VIP area that only logged-in people can enter."
 * 
 *  Technical Explanation:
 * "Protected route component that redirects to login if not authenticated."
 */
const ProtectedRoute = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const token = localStorage.getItem('accessToken');

  // Check if user is authenticated
  const isAuth = isAuthenticated || token;

  if (!isAuth) {
    // Redirect to login with return URL
    return <Navigate to="/auth/login" state={{ from: window.location.pathname }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;