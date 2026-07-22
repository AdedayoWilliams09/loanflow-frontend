

import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/authSlice';

/**
 * Dashboard Page
 * 
 * 🧒 Child Explanation:
 * "This is your special area after you log in."
 * 
 * 👨‍💻 Technical Explanation:
 * "Protected dashboard page for authenticated users."
 */
const Dashboard = () => {
  const user = useSelector(selectUser);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Welcome back, {user?.firstName || 'User'}!
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          This is your dashboard. More features coming soon!
        </p>
      </div>
    </div>
  );
};

export default Dashboard;