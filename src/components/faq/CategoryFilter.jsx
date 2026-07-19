// FILE: frontend/src/components/faq/CategoryFilter.jsx


import React from 'react';
import { motion } from 'framer-motion';

/**
 * Category Filter Component
 * 
 *  Child Explanation:
 * "This lets you choose which category of questions you want to see."
 * 
 *  Technical Explanation:
 * "Category filter pills for FAQ page."
 */
const CategoryFilter = ({ 
  categories = [], 
  activeCategory = 'all',
  onCategoryChange,
  className = '' 
}) => {
  // Category display names mapping
  const categoryLabels = {
    'all': 'All',
    'general': 'General',
    'loans': 'Loan Applications',
    'repayment': 'Repayment',
    'account': 'Account & Security',
  };

  // Default categories if none provided

  const displayCategories = Array.from(new Set(['all', ...categories]));
  

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className={`flex flex-wrap gap-2 justify-center ${className}`}
    >
      {displayCategories.map((category) => (
        <motion.button
          key={category}
          variants={fadeInUp}
          onClick={() => onCategoryChange(category)}
          className={`
            px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
            min-h-[44px] min-w-[44px]
            ${activeCategory === category
              ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }
          `}
        >
          {categoryLabels[category] || category.charAt(0).toUpperCase() + category.slice(1)}
        </motion.button>
      ))}
    </motion.div>
  );
};

export default CategoryFilter;