// FILE: frontend/src/router.jsx

import { createBrowserRouter, Link } from "react-router-dom";

// Layouts
import PublicLayout from "./layouts/PublicLayout";
import AuthLayout from './layouts/AuthLayout';

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import LoanProducts from "./pages/LoanProducts";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";

// Auth Pages
import Login from './pages/Login';
import OAuthCallback from './pages/OAuthCallback';

// Protected Components & Dashboard
import ProtectedRoute from './components/common/ProtectedRoute'; // 👈 Added missing import
import Dashboard from './pages/Dashboard';                     // 👈 Added missing import

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "loan-products",
        element: <LoanProducts />,
      },
      {
        path: "faq",
        element: <FAQ />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },

  // Auth Routes
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'oauth-callback',
        element: <OAuthCallback />,
      },
    ],
  },

  // Protected Routes
  {
    path: '/dashboard',
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },

  // 404 handler
  {
    path: "*",
    element: (
      <PublicLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-gray-900 dark:text-white">
              404
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mt-4">
              Page not found
            </p>
            <Link
              to="/"
              className="text-blue-600 dark:text-blue-400 hover:underline mt-4 inline-block"
            >
              Go back home
            </Link>
          </div>
        </div>
      </PublicLayout>
    ),
  },
]);

export default router;