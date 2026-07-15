// FILE: frontend/src/hooks/useIntersectionObserver.jsx
// CREATED: New file

import { useEffect, useRef, useState } from 'react';

/**
 * Intersection Observer Hook
 * 
 *  Child Explanation:
 * "This watches an element and tells us when it comes into view
 * on the screen. It's like a lookout that says 'I see it!'"
 * 
 *  Technical Explanation:
 * "A custom hook that uses the Intersection Observer API to detect
 * when an element becomes visible in the viewport."
 */
export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, {
      threshold: 0.1,
      rootMargin: '0px',
      ...options,
    });
    
    observer.observe(element);
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [options]);
  
  return [ref, isIntersecting];
};

export default useIntersectionObserver;