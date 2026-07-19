// FILE: frontend/src/components/products/CTASection.jsx
// CREATED: New file

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../common/Button';

/**
 * CTA Section Component
 * 
 *  Child Explanation:
 * "This is the 'Get Started' section that encourages you to take action."
 * 
 *  Technical Explanation:
 * "Call-to-action section for the loan products page."
 */
const CTASection = ({ className = '' }) => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      className={`py-16 bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-950 ${className}`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
          Apply for a loan today and get the financial support you need.
        </p>
        <Link to="/auth/register">
          <Button variant="primary" size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
            Get Started Today
          </Button>
        </Link>
      </div>
    </motion.section>
  );
};

export default CTASection;