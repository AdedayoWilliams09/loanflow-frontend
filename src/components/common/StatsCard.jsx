// FILE: frontend/src/components/common/StatsCard.jsx

import React from 'react';  

/**
 * Stats Card Component
 * 
 * Child Explanation:
 * "This shows an impressive number like '10,000+' with a small
 * explanation underneath. It's used to show how popular or
 * successful the platform is."
 * 
 * Technical Explanation:
 * "A card component for displaying statistics with animated
 * counters and optional icons."
 */
const StatsCard = ({ 
  number, 
  label, 
  icon, 
  delay = 0,
  className = '' 
}) => {
  const [count, setCount] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef(null);
  
  // Parse number to extract prefix, numeric value, and suffix
  const parseNumber = (value) => {
    const stringValue = String(value).trim();
    
    // Extract the numeric part
    const numeric = parseFloat(stringValue.replace(/[^0-9.]/g, '')) || 0;
    
    // Check if there is a leading currency symbol (e.g., ₦, $, €)
    const prefixMatch = stringValue.match(/^[^0-9.]+/);
    const prefix = prefixMatch ? prefixMatch[0].trim() : '';
    
    // The rest of the non-numeric characters at the end become the suffix
    const suffix = stringValue
      .substring(prefix.length) // ignore the prefix
      .replace(/[0-9.]/g, '')   // strip out the numbers
      .trim();
      
    return { prefix, numeric, suffix, stringValue };
  };
  
  const { prefix, numeric, suffix } = parseNumber(number);
  
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );
    
    if (ref.current) {
      
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  React.useEffect(() => {
    if (!isVisible) return;
    
    // Animate counter
    const duration = 2000;
    const startTime = Date.now() + delay;
    
    const animate = () => {
      const now = Date.now();
      if (now < startTime) {
        requestAnimationFrame(animate);
        return;
      }
      
      const progress = Math.min((now - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease out
      const currentCount = Math.round(easedProgress * numeric);
      
      setCount(currentCount);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isVisible, numeric, delay]);
  
  return (
    <div 
      ref={ref}
      className={`text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`}
    >
      {icon && (
        <div className="flex justify-center mb-3">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full">
            {icon}
          </div>
        </div>
      )}
      <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
        {/* Render prefix (e.g., ₦) before the animated number */}
        {prefix && <span className="text-blue-600 dark:text-blue-400 mr-0.5">{prefix}</span>}
        {isVisible ? count.toLocaleString() : '0'}
        {/* Render suffix (e.g., Billion or +) after the number */}
        {suffix && <span className="text-blue-600 dark:text-blue-400 ml-1">{suffix}</span>}
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{label}</p>
    </div>
  );
};

export default StatsCard;