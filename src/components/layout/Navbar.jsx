// FILE: frontend/src/components/layout/Navbar.jsx
// CREATED: New file

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../common/Logo';
import ThemeToggle from '../common/ThemeToggle';
import Button from '../common/Button';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

/**
 * Navbar Component
 * 
 * 🧒 Child Explanation:
 * "This is the top bar of the website. It shows the logo, links
 * to different pages, and buttons to log in or sign up."
 * 
 * 👨‍💻 Technical Explanation:
 * "The main navigation component with responsive behavior.
 * Shows different content based on authentication status."
 */
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // For now, we'll use a mock auth state
  // This will be replaced with real auth in the next phase
  const isAuthenticated = false;
  const user = null;
  
  // Navigation links
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/loan-products', label: 'Loan Products' },
    { path: '/faq', label: 'FAQ' },
    { path: '/contact', label: 'Contact' },
  ];
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);
  
  // Check if link is active
  const isActiveLink = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };
  
  return (
    <nav 
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled 
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-md' 
          : 'bg-transparent'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo showText={true} size="md" />
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  px-3 py-2 rounded-lg text-sm font-medium transition-colors
                  ${isActiveLink(link.path)
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }
                `}
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            
            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-2">
              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <Link to="/dashboard">
                    <Button variant="outline" size="sm">
                      Dashboard
                    </Button>
                  </Link>
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-semibold">
                    {user?.firstName?.[0] || user?.email?.[0] || 'U'}
                  </div>
                </div>
              ) : (
                <>
                  <Link to="/auth/login">
                    <Button variant="ghost" size="sm">
                      Log In
                    </Button>
                  </Link>
                  <Link to="/auth/register">
                    <Button variant="primary" size="sm">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors min-h-[44px] min-w-[44px]"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <Bars3Icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={`
          md:hidden fixed inset-x-0 top-16 bg-white dark:bg-gray-900 shadow-lg transition-all duration-300 ease-in-out
          ${isMobileMenuOpen 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 -translate-y-4 pointer-events-none'
          }
        `}
      >
        <div className="px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`
                block px-4 py-3 rounded-lg text-base font-medium transition-colors
                ${isActiveLink(link.path)
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                  : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }
              `}
            >
              {link.label}
            </Link>
          ))}
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard">
                  <Button variant="primary" size="md" className="w-full">
                    Dashboard
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/auth/login">
                  <Button variant="ghost" size="md" className="w-full">
                    Log In
                  </Button>
                </Link>
                <Link to="/auth/register">
                  <Button variant="primary" size="md" className="w-full">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;