// FILE: frontend/src/pages/Login.jsx
// CREATED: New file

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import BrandHeader from '../components/auth/BrandHeader';
import LoginForm from '../components/auth/LoginForm';
import SocialLogin from '../components/auth/SocialLogin';
import AuthFooter from '../components/auth/AuthFooter';
import { selectIsAuthenticated } from '../store/authSlice';

/**
 * Login Page
 * 
 *  Child Explanation:
 * "This is the page where you type your email and password to sign in."
 * 
 *  Technical Explanation:
 * "The Login page with form, social login, and SEO."
 */
const Login = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Schema markup for login page
  const loginSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Login - LoanFlow",
    "description": "Sign in to your LoanFlow account to manage loans, track applications, and access your dashboard.",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://loanflow.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Login",
          "item": "https://loanflow.com/auth/login"
        }
      ]
    }
  };

  return (
    <>
      <Helmet>
        <title>Login - LoanFlow</title>
        <meta name="description" content="Sign in to your LoanFlow account to manage loans, track applications, and access your dashboard." />
        <meta name="robots" content="noindex, follow" />
        <meta property="og:title" content="Login - LoanFlow" />
        <meta property="og:description" content="Sign in to your LoanFlow account to manage loans, track applications, and access your dashboard." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://loanflow.com/auth/login" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Login - LoanFlow" />
        <meta name="twitter:description" content="Sign in to your LoanFlow account." />
        <script type="application/ld+json">
          {JSON.stringify(loginSchema)}
        </script>
      </Helmet>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
        <BrandHeader />
        <LoginForm />
        <div className="mt-6">
          <SocialLogin />
        </div>
        <AuthFooter />
      </div>
    </>
  );
};

export default Login;