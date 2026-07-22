

/**
 * Authentication Utilities
 * 
 *  Child Explanation:
 * "This is a helper file that checks if you're logged in and protects pages."
 * 
 *  Technical Explanation:
 * "Utility functions for authentication, including route protection."
 */

/**
 * Check if user is authenticated
 * 
 *  Child Explanation:
 * "This checks if you have a pass in your pocket."
 * 
 *  Technical Explanation:
 * "Checks for the presence of a valid access token in localStorage."
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem('accessToken');
  if (!token) return false;
  
  // Check if token is expired
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiry = payload.exp * 1000;
    const now = Date.now();
    return expiry > now;
  } catch {
    return false;
  }
};

/**
 * Get the current user from localStorage
 * 
 *  Child Explanation:
 * "This gets your information from your pocket."
 * 
 *  Technical Explanation:
 * "Retrieves the stored user data from localStorage."
 */
export const getCurrentUser = () => {
  try {
    const userData = localStorage.getItem('userData');
    if (userData) {
      return JSON.parse(userData);
    }
    return null;
  } catch {
    return null;
  }
};

/**
 * Get the authentication token
 * 
 *  Child Explanation:
 * "This gets your pass from your pocket."
 * 
 *  Technical Explanation:
 * "Retrieves the access token from localStorage."
 */
export const getToken = () => {
  return localStorage.getItem('accessToken');
};

/**
 * Get the refresh token
 * 
 *  Child Explanation:
 * "This gets your backup pass from your pocket."
 * 
 *  Technical Explanation:
 * "Retrieves the refresh token from localStorage."
 */
export const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};

/**
 * Clear all authentication data
 * 
 *  Child Explanation:
 * "This removes your pass and information from your pocket."
 * 
 *  Technical Explanation:
 * "Clears all auth-related data from localStorage."
 */
export const clearAuth = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('userData');
};

/**
 * Store authentication data
 * 
 *  Child Explanation:
 * "This puts your pass and information in your pocket."
 * 
 *  Technical Explanation:
 * "Stores auth data in localStorage."
 */
export const setAuthData = (accessToken, refreshToken, userData) => {
  if (accessToken) localStorage.setItem('accessToken', accessToken);
  if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
  if (userData) localStorage.setItem('userData', JSON.stringify(userData));
};

/**
 * Protected Route Check
 * 
 *  Child Explanation:
 * "This checks if you're allowed to enter a VIP area."
 * 
 *  Technical Explanation:
 * "Checks authentication status for route protection."
 */
export const protectRoute = () => {
  return isAuthenticated();
};

export default {
  isAuthenticated,
  getCurrentUser,
  getToken,
  getRefreshToken,
  clearAuth,
  setAuthData,
  protectRoute,
};