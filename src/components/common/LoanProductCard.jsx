// FILE: frontend/src/components/common/LoanProductCard.jsx


import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

/**
 * Loan Product Card Component
 * 
 *  Child Explanation:
 * "This shows one type of loan you can get, like 'Personal Loan',
 * with information about how much you can borrow and the interest rate."
 * 
 *  Technical Explanation:
 * "A card component for displaying loan products with key details
 * like amount range, interest rate, and features."
 */
const LoanProductCard = ({ 
  product, 
  className = '' 
}) => {
  const {
    _id,
    name,
    description,
    minAmount,
    maxAmount,
    interestRate,
    processingFee,
    repaymentPeriod,
    features = [],
    color = 'blue',
    isActive,
  } = product;
  
  // Format amount in Nigerian Naira
  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  const colorClasses = {
    blue: 'border-blue-500 bg-blue-50 dark:bg-blue-900/20',
    green: 'border-green-500 bg-green-50 dark:bg-green-900/20',
    purple: 'border-purple-500 bg-purple-50 dark:bg-purple-900/20',
    orange: 'border-orange-500 bg-orange-50 dark:bg-orange-900/20',
  };
  
  return (
    <div className={`
      p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg 
      transition-all duration-300 hover:-translate-y-1 border-t-4 
      ${colorClasses[color] || colorClasses.blue}
      ${className}
    `}>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        {name}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
        {description}
      </p>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">Amount</span>
          <span className="font-medium text-gray-900 dark:text-white">
            {formatAmount(minAmount)} - {formatAmount(maxAmount)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">Interest Rate</span>
          <span className="font-medium text-gray-900 dark:text-white">
            {interestRate}% p.a.
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">Repayment</span>
          <span className="font-medium text-gray-900 dark:text-white">
            Up to {repaymentPeriod} months
          </span>
        </div>
        {processingFee > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Processing Fee</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {processingFee}%
            </span>
          </div>
        )}
      </div>
      
      {features.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {features.slice(0, 3).map((feature, index) => (
              <span 
                key={index}
                className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      )}
      
      <Link to={isActive ? '/auth/register' : '#'}>
        <Button 
          variant="primary" 
          size="md" 
          className="w-full"
          disabled={!isActive}
        >
          {isActive ? 'Apply Now' : 'Coming Soon'}
        </Button>
      </Link>
    </div>
  );
};

export default LoanProductCard;