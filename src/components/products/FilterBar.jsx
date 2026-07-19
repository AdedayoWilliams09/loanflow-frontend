// FILE: frontend/src/components/products/FilterBar.jsx
// MODIFIED: Added external parent state synchronization and stabilized search auto-apply conditions.

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Button from '../common/Button';

/**
 * Filter Bar Component
 * 
 * 🧒 Child Explanation:
 * "This is like a control panel where you can choose what kind of
 * loans you want to see."
 * 
 * 👨‍💻 Technical Explanation:
 * "Filter bar with product type, amount range, duration, and search parameters.
 * Keeps local form values synchronized with upstream Redux filters using side effects."
 */
const FilterBar = ({ 
  filters = {}, 
  onFilterChange,
  onReset,
  productTypes = [],
  className = '' 
}) => {
  const [localFilters, setLocalFilters] = useState({
    type: filters.type || 'all',
    minAmount: filters.minAmount || '',
    maxAmount: filters.maxAmount || '',
    duration: filters.duration || '',
    search: filters.search || '',
  });

  // Duration options mapping array
  const durationOptions = [
    { value: '', label: 'Any Duration' },
    { value: '1', label: '1 Month' },
    { value: '3', label: '3 Months' },
    { value: '6', label: '6 Months' },
    { value: '12', label: '12 Months' },
    { value: '18', label: '18 Months' },
    { value: '24', label: '24 Months' },
  ];

  // Sync local input state if upstream Redux filters change or reset externally
  useEffect(() => {
    setLocalFilters({
      type: filters.type || 'all',
      minAmount: filters.minAmount || '',
      maxAmount: filters.maxAmount || '',
      duration: filters.duration || '',
      search: filters.search || '',
    });
  }, [filters]);

  // Auto-apply filters when search input text updates (with 500ms debounce safety check)
  useEffect(() => {
    // Safety boundary: do not auto-trigger an empty search string layout refresh during initial mount
    if (!localFilters.search.trim()) return;

    const timer = setTimeout(() => {
      handleApply();
    }, 500);

    return () => clearTimeout(timer);
  }, [localFilters.search]);

  // Handle value modifications for single control elements safely
  const handleChange = (field, value) => {
    setLocalFilters(prev => ({ ...prev, [field]: value }));
  };

  // Compile active form values and pass them up to the parent controller handler
  const handleApply = () => {
    const appliedFilters = {};
    
    if (localFilters.type && localFilters.type !== 'all') {
      appliedFilters.type = localFilters.type;
    }
    if (localFilters.minAmount) {
      appliedFilters.minAmount = parseFloat(localFilters.minAmount);
    }
    if (localFilters.maxAmount) {
      appliedFilters.maxAmount = parseFloat(localFilters.maxAmount);
    }
    if (localFilters.duration) {
      appliedFilters.duration = parseInt(localFilters.duration);
    }
    if (localFilters.search) {
      appliedFilters.search = localFilters.search.trim();
    }
    
    onFilterChange(appliedFilters);
  };

  // Hard clear all local context values and trigger master cleanup loop
  const handleReset = () => {
    setLocalFilters({
      type: 'all',
      minAmount: '',
      maxAmount: '',
      duration: '',
      search: '',
    });
    onReset();
  };

  // Fast intercept for user pressing Enter on the input text entry element
  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleApply();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`bg-white dark:bg-gray-800 shadow-sm rounded-xl p-4 ${className}`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
        {/* Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Product Type
          </label>
          <select
            value={localFilters.type}
            onChange={(e) => handleChange('type', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            {productTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Amount Range Limits */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Min (₦)
            </label>
            <input
              type="number"
              value={localFilters.minAmount}
              onChange={(e) => handleChange('minAmount', e.target.value)}
              placeholder="0"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Max (₦)
            </label>
            <input
              type="number"
              value={localFilters.maxAmount}
              onChange={(e) => handleChange('maxAmount', e.target.value)}
              placeholder="∞"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Duration Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Duration
          </label>
          <select
            value={localFilters.duration}
            onChange={(e) => handleChange('duration', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {durationOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Search Input Bar */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Search
          </label>
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={localFilters.search}
              onChange={(e) => handleChange('search', e.target.value)}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search products..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex gap-2">
          <Button
            variant="primary"
            size="md"
            onClick={handleApply}
            className="flex-1"
          >
            Apply
          </Button>
          <Button
            variant="ghost"
            size="md"
            onClick={handleReset}
            className="flex-1"
            leftIcon={<XMarkIcon className="w-4 h-4" />}
          >
            Reset
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default FilterBar;