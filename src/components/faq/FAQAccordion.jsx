// FILE: frontend/src/components/faq/FAQAccordion.jsx
// MODIFIED: Replaced Set tracking state with a single active string ID to enforce the auto-close behavior.

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

/**
 * FAQ Accordion Component
 * 
 *  Child Explanation:
 * "This shows a list of questions. When you click a new question, the old one 
 * automatically tucks itself away so the page stays neat and clean!"
 * 
 *  Technical Explanation:
 * "Accordion component for FAQ items. Enforces a single-active-panel paradigm 
 * by tracking the active ID as a string primitive instead of a collection Set."
 */
const FAQAccordion = ({ faqs = [], className = '' }) => {
  //  Track only a single active item ID string, or null if everything is closed
  const [activeId, setActiveId] = useState(null);

  // Category display names mapping
  const categoryLabels = {
    'general': 'General',
    'loans': 'Loan Applications',
    'repayment': 'Repayment',
    'account': 'Account & Security',
  };

  // Get category badge color
  const getCategoryColor = (category) => {
    const colors = {
      'general': 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
      'loans': 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
      'repayment': 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
      'account': 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
    };
    return colors[category] || colors.general;
  };

  //  Toggle mechanism: if clicking the already open item, close it; otherwise open the new one
  const toggleItem = (id) => {
    setActiveId(prevId => (prevId === id ? null : id));
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  if (!faqs || faqs.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        <p>No FAQs found matching your criteria.</p>
        <p className="text-sm mt-2">Try adjusting your filters or search.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className={`max-w-3xl mx-auto divide-y divide-gray-200 dark:divide-gray-700 ${className}`}
    >
      {faqs.map((faq) => {
        // ✅ A panel is open only if its ID matches the activeId state
        const isOpen = activeId === faq._id;
        const categoryLabel = categoryLabels[faq.category] || faq.category;

        return (
          <motion.div
            key={faq._id}
            variants={fadeInUp}
            className="py-4"
          >
            <button
              onClick={() => toggleItem(faq._id)}
              className="w-full flex items-center justify-between text-left group"
              aria-expanded={isOpen}
            >
              <div className="flex-1 pr-4">
                <span className="text-base font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {faq.question}
                </span>
                <span className={`ml-3 text-xs px-2 py-1 rounded-full ${getCategoryColor(faq.category)}`}>
                  {categoryLabel}
                </span>
              </div>
              <span className="flex-shrink-0 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                {isOpen ? (
                  <ChevronUpIcon className="w-5 h-5" />
                ) : (
                  <ChevronDownIcon className="w-5 h-5" />
                )}
              </span>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="pt-3 pb-2 pl-1 pr-4 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default FAQAccordion;