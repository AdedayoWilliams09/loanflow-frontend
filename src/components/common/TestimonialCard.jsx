// FILE: frontend/src/components/common/TestimonialCard.jsx
// CREATED: New file

import React from 'react';

/**
 * Testimonial Card Component
 * 
 *  Child Explanation:
 * "This shows what a happy customer said about the platform.
 * It includes their name, picture, and star rating."
 * 
 *  Technical Explanation:
 * "A card component for displaying customer testimonials with
 * avatars, ratings, and content."
 */
const TestimonialCard = ({ 
  testimonial, 
  className = '' 
}) => {
  const { customerName, customerRole, content, rating, avatarUrl } = testimonial;
  
  // Render star rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg 
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };
  
  // Get initials for avatar fallback
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };
  
  return (
    <div className={`p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`}>
      {/* Stars */}
      <div className="flex mb-3">
        {renderStars(rating)}
      </div>
      
      {/* Content */}
      <p className="text-gray-700 dark:text-gray-300 text-sm italic mb-4">
        "{content}"
      </p>
      
      {/* Customer Info */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        {avatarUrl ? (
          <img 
            src={avatarUrl} 
            alt={customerName}
            className="w-10 h-10 rounded-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-semibold text-sm">
            {getInitials(customerName)}
          </div>
        )}
        
        <div>
          <p className="font-semibold text-gray-900 dark:text-white text-sm">
            {customerName}
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-xs">
            {customerRole}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;