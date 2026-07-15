// FILE: frontend/src/layouts/PublicLayout.jsx


import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

/**
 * Public Layout Component
 * 
 *  Child Explanation:
 * "This is the main frame that wraps around all public pages.
 * It includes the top navigation bar and bottom footer."
 * 
 *  Technical Explanation:
 * "A layout component for public pages that includes a Navbar
 * and Footer. Uses React Router Outlet for nested routes."
 */
const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="flex-grow pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;