

import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * Auth Layout Component
 * 
 *  Child Explanation:
 * "This is the special layout for login and signup pages."
 * 
 *  Technical Explanation:
 * "Layout component for authentication pages with centered content."
 */
const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Outlet />
      </motion.div>
    </div>
  );
};

export default AuthLayout;