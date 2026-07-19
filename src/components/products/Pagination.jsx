// FILE: frontend/src/components/products/Pagination.jsx


import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Button from '../common/Button';

/**
 * Pagination Component
 * 
 *  Child Explanation:
 * "This lets you flip through pages of loan products like a book."
 * 
 *  Technical Explanation:
 * "Pagination component with page navigation and page number display."
 */
const Pagination = ({ 
  currentPage = 1, 
  totalPages = 1, 
  onPageChange,
  className = '' 
}) => {
  if (totalPages <= 1) {
    return null;
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      // Calculate range around current page
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust to show more pages if possible
      if (currentPage <= 2) {
        end = Math.min(totalPages - 1, 4);
      } else if (currentPage >= totalPages - 1) {
        start = Math.max(2, totalPages - 3);
      }
      
      // Add ellipsis if needed
      if (start > 2) {
        pages.push('...');
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      // Add ellipsis if needed
      if (end < totalPages - 1) {
        pages.push('...');
      }
      
      // Always show last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex items-center justify-center gap-2 py-6 ${className}`}
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={handlePrevious}
        disabled={currentPage <= 1}
        leftIcon={<ChevronLeftIcon className="w-4 h-4" />}
      >
        Previous
      </Button>

      <div className="flex items-center gap-1">
        {pageNumbers.map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            className={`
              min-w-[40px] h-10 flex items-center justify-center rounded-lg text-sm font-medium
              transition-colors duration-200
              ${page === currentPage
                ? 'bg-blue-600 text-white'
                : page === '...'
                  ? 'text-gray-400 cursor-default'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }
            `}
            disabled={page === '...'}
          >
            {page}
          </button>
        ))}
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={handleNext}
        disabled={currentPage >= totalPages}
        rightIcon={<ChevronRightIcon className="w-4 h-4" />}
      >
        Next
      </Button>
    </motion.div>
  );
};

export default Pagination;