// FILE: frontend/src/components/common/FAQItem.jsx


import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

/**
 * FAQ Item Component
 * 
 *  Child Explanation:
 * "This is a question that you can click to see the answer.
 * It's like a book that opens and closes when you tap it."
 * 
 *  Technical Explanation:
 * "An accordion-style FAQ item that expands to show the answer
 * when clicked. Supports keyboard navigation and ARIA attributes."
 */
const FAQItem = ({ 
  question, 
  answer, 
  isOpen = false,
  onToggle,
  className = '' 
}) => {
  const [isExpanded, setIsExpanded] = useState(isOpen);
  
  const toggle = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    if (onToggle) onToggle(newState);
  };
  
  // Handle keyboard events
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  };
  
  return (
    <div className={`border-b border-gray-200 dark:border-gray-700 ${className}`}>
      <button
        onClick={toggle}
        onKeyDown={handleKeyDown}
        className="w-full py-4 px-2 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors rounded-lg group"
        aria-expanded={isExpanded}
        aria-controls={`faq-answer-${question.slice(0, 20).replace(/\s/g, '-')}`}
      >
        <span className="text-base font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {question}
        </span>
        <span className="flex-shrink-0 ml-4">
          {isExpanded ? (
            <ChevronUpIcon className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDownIcon className="w-5 h-5 text-gray-400" />
          )}
        </span>
      </button>
      
      <div 
        className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
        `}
        id={`faq-answer-${question.slice(0, 20).replace(/\s/g, '-')}`}
      >
        <div className="pb-4 px-2 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
};

export default FAQItem;