// FILE: frontend/src/components/common/FeatureCard.jsx
// CREATED: New file

import React from 'react';

/**
 * Feature Card Component
 * 
 *  Child Explanation:
 * "This shows one special thing the platform can do, like
 * 'Fast Approval' with a small description underneath."
 * 
 *  Technical Explanation:
 * "A card component for displaying product features with
 * an icon, title, and description."
 */
const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  color = 'blue',
  className = '' 
}) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
    green: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400',
    purple: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
    orange: 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400',
    red: 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400',
  };
  
  return (
    <div className={`p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${className}`}>
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${colorClasses[color] || colorClasses.blue}`}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;