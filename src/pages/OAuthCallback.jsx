

import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { loginSuccess } from '../store/authSlice';

/**
 * OAuth Callback Page
 * 
 *  Child Explanation:
 * "This is the page Google sends you back to after you sign in."
 * 
 *  Technical Explanation:
 * "Handles OAuth callback from Google and stores tokens."
 */
const OAuthCallback = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');
    const error = searchParams.get('error');

    if (error) {
      console.error('OAuth error:', error);
      navigate('/auth/login?error=google_auth_failed');
      return;
    }

    if (accessToken && refreshToken) {
      // Store tokens
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      
      // Fetch user data
      dispatch(loginSuccess({ accessToken, refreshToken }));
      
      // Redirect to dashboard
      navigate('/dashboard');
    } else {
      navigate('/auth/login?error=oauth_missing_tokens');
    }
  }, [searchParams, navigate, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Completing sign in...</p>
      </motion.div>
    </div>
  );
};

export default OAuthCallback;