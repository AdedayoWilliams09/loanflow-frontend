// FILE: frontend/src/hooks/useTheme.jsx


import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

/**
 * Theme Hook
 * 
 *  Child Explanation:
 * "This gives us access to the current theme (day or night)
 * and a way to switch between them."
 * 
 *  Technical Explanation:
 * "A custom hook that provides access to the theme context,
 * including the current theme and toggle function."
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};

export default useTheme;