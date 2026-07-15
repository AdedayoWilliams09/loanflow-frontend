// FILE: frontend/src/components/common/ThemeToggle.jsx



import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../../hooks/useTheme';

/**
 * Theme Toggle Component
 * 
 *  Child Explanation:
 * "This is a switch that changes the website from daytime colors
 * to nighttime colors. When it's dark, you see a moon. When it's
 * light, you see a sun."
 * 
 *  Technical Explanation:
 * "A button that toggles between light and dark themes.
 * Uses the ThemeContext to access and update the current theme."
 */
const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  
  const isDark = theme === 'dark';
  
  return (
    <button
      onClick={toggleTheme}
      className={`
        p-2 rounded-lg 
        hover:bg-gray-100 dark:hover:bg-gray-800 
        transition-colors duration-200
        min-h-[44px] min-w-[44px]
        ${className}
      `}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <SunIcon className="w-5 h-5 text-yellow-400" />
      ) : (
        <MoonIcon className="w-5 h-5 text-gray-700" />
      )}
    </button>
  );
};

export default ThemeToggle;