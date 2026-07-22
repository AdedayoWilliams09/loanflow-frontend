

import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../common/Logo';

/**
 * Brand Header Component
 * 
 *  Child Explanation:
 * "This shows the logo and welcome message at the top."
 * 
 *  Technical Explanation:
 * "Brand header with logo and welcome text for auth pages."
 */
const BrandHeader = ({ title = 'Welcome Back', subtitle = 'Sign in to your account' }) => {
  return (
    <div className="text-center mb-8">
      <Link to="/" className="inline-block">
        <Logo showText={false} size="lg" />
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
        {title}
      </h1>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        {subtitle}
      </p>
    </div>
  );
};

export default BrandHeader;