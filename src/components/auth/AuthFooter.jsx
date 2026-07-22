

import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Auth Footer Component
 * 
 *  Child Explanation:
 * "This has links to sign up and other auth pages."
 * 
 *  Technical Explanation:
 * "Footer with links for authentication pages."
 */
const AuthFooter = ({ 
  message = "Don't have an account?",
  linkText = 'Sign Up',
  linkTo = '/auth/register',
}) => {
  return (
    <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
      {message}{' '}
      <Link to={linkTo} className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
        {linkText}
      </Link>
    </p>
  );
};

export default AuthFooter;