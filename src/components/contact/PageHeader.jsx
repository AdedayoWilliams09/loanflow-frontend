// FILE: frontend/src/components/contact/PageHeader.jsx


import React from 'react';
import { motion } from 'framer-motion';

/**
 * Page Header Component
 * 
 *  Child Explanation:
 * "This is the title at the top of the page."
 * 
 *  Technical Explanation:
 * "Page header with title and subtitle for the Contact page."
 */
const PageHeader = ({ title, subtitle, className = '' }) => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className={`py-12 bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-950 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
          {title || 'Get in Touch'}
        </h1>
        <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
          {subtitle || "We're here to help. Reach out to us anytime."}
        </p>
      </div>
    </motion.div>
  );
};

export default PageHeader;