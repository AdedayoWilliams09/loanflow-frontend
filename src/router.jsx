// FILE: frontend/src/router.jsx


import { createBrowserRouter, Link } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import Home from './pages/Home';
import About from './pages/About';
import LoanProducts from './pages/LoanProducts';
import FAQ from './pages/FAQ';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: 'about',
        element: <About />,
      },
       {
        path: 'loan-products',
        element: <LoanProducts />,
      },
       {
        path: 'faq',
        element: <FAQ />,
      },
      // More public routes will be added here
    ],
  },
  // 404 handler
  {
    path: '*',
    element: (
      <PublicLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-gray-900 dark:text-white">404</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mt-4">Page not found</p>
            <Link to="/" className="text-blue-600 dark:text-blue-400 hover:underline mt-4 inline-block">
              Go back home
            </Link>
          </div>
        </div>
      </PublicLayout>
    ),
  },
]);

export default router;