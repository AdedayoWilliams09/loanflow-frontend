// FILE: frontend/src/components/faq/SearchBar.jsx


import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

/**
 * Search Bar Component
 * 
 *  Child Explanation:
 * "This lets you type in words to find questions that contain them."
 * 
 *  Technical Explanation:
 * "Search bar for FAQ page with debounced input."
 */
const SearchBar = ({ onSearch, className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, onSearch]);

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className={`max-w-2xl mx-auto ${className}`}
    >
      <div className={`
        relative flex items-center rounded-xl transition-all duration-200
        ${isFocused 
          ? 'ring-2 ring-blue-500 shadow-lg' 
          : 'ring-1 ring-gray-200 dark:ring-gray-700'
        }
      `}>
        <MagnifyingGlassIcon className="absolute left-4 w-5 h-5 text-gray-400" />
        
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search for answers..."
          className="
            w-full pl-12 pr-12 py-3 bg-white dark:bg-gray-800 
            rounded-xl text-gray-900 dark:text-white
            placeholder-gray-400 dark:placeholder-gray-500
            focus:outline-none
            text-base
          "
        />
        
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute right-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Clear search"
          >
            <XMarkIcon className="w-5 h-5 text-gray-400" />
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default SearchBar;