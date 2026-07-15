// FILE: frontend/src/components/common/Logo.jsx



import { Link } from 'react-router-dom';

/**
 * Logo Component
 * 
 *  Child Explanation:
 * "This is the brand name that appears at the top of the page.
 * It changes color depending on whether it's day or night mode."
 * 
 *  Technical Explanation:
 * "A configurable logo component that supports dark/light variants
 * and responsive sizing. Links to the homepage."
 */
const Logo = ({ 
  className = '', 
  showText = true,
  size = 'md'
}) => {
  // Determine size classes
  const sizeClasses = {
    sm: 'w-6 h-6 text-lg',
    md: 'w-10 h-10 text-xl',
    lg: 'w-12 h-12 text-2xl',
  };
  
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <div className={`relative ${sizeClasses[size]}`}>
        <div className="w-full h-full bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
          LF
        </div>
      </div>
      
      {showText && (
        <span className={`font-bold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent ${size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl' : 'text-xl'}`}>
          LoanFlow
        </span>
      )}
    </Link>
  );
};

export default Logo;