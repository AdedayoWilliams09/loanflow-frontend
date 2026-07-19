// FILE: frontend/src/pages/LoanProducts.jsx
// CREATED: New file

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import PageHeader from '../components/products/PageHeader';
import FilterBar from '../components/products/FilterBar';
import ProductGrid from '../components/products/ProductGrid';
import Pagination from '../components/products/Pagination';
import CTASection from '../components/products/CTASection';
import { 
  fetchProducts, 
  fetchProductTypes,
  setFilters,
  resetFilters,
  setPage,
  selectProducts,
  selectProductTypes,
  selectPagination,
  selectFilters,
  selectProductsLoading,
  selectProductsError,
} from '../store/productsSlice';

/**
 * Loan Products Page
 * 
 *  Child Explanation:
 * "This is the page where you can see all the different types of loans
 * and filter them to find the one that's right for you."
 * 
 *  Technical Explanation:
 * "The Loan Products page with filtering, pagination, and SEO."
 */
const LoanProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const productTypes = useSelector(selectProductTypes);
  const pagination = useSelector(selectPagination);
  const filters = useSelector(selectFilters);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);

  // Fetch product types on mount
  useEffect(() => {
    dispatch(fetchProductTypes());
  }, [dispatch]);

  // Fetch products on mount and when filters/pagination change
  useEffect(() => {
    dispatch(fetchProducts({
      page: pagination.page,
      limit: pagination.limit,
      filters: filters,
    }));
  }, [dispatch, filters, pagination.page]);

  // Handle filter change
  const handleFilterChange = (newFilters) => {
    dispatch(setFilters(newFilters));
    dispatch(setPage(1)); // Reset to first page when filtering
  };

  // Handle reset filters
  const handleResetFilters = () => {
    dispatch(resetFilters());
    dispatch(setPage(1));
  };

  // Handle page change
  const handlePageChange = (page) => {
    dispatch(setPage(page));
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Schema markup for loan products
  const productsSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Loan Products",
    "description": "Browse our range of loan products designed to meet your financial goals",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": products.map((product, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "FinancialProduct",
          "name": product.name,
          "description": product.description,
          "offers": {
            "@type": "Offer",
            "priceCurrency": "NGN",
            "price": product.minAmount,
            "availability": "https://schema.org/InStock"
          }
        }
      }))
    }
  };

  return (
    <>
      <Helmet>
        <title>Loan Products - Find the Perfect Loan for Your Needs</title>
        <meta name="description" content="Browse our range of loan products including personal loans, business loans, salary advances, and student loans. Compare rates and apply online." />
        <meta name="keywords" content="loan products, personal loan, business loan, salary advance, student loan, compare loans" />
        <meta property="og:title" content="Loan Products - Find the Perfect Loan for Your Needs" />
        <meta property="og:description" content="Browse our range of loan products including personal loans, business loans, salary advances, and student loans." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://loanflow.com/loan-products" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Loan Products - Find the Perfect Loan" />
        <meta name="twitter:description" content="Browse our range of loan products designed to meet your financial goals." />
        <script type="application/ld+json">
          {JSON.stringify(productsSchema)}
        </script>
      </Helmet>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gray-50 dark:bg-gray-900"
      >
        <PageHeader
          title="Find the Perfect Loan for Your Needs"
          subtitle="Browse our range of loan products designed to meet your financial goals"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <FilterBar
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters}
            productTypes={productTypes}
            className="mb-8"
          />

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg mb-6">
              {error}
              <button 
                onClick={() => dispatch(fetchProducts({ page: pagination.page, limit: pagination.limit, filters }))}
                className="ml-2 text-blue-600 dark:text-blue-400 hover:underline"
              >
                Try again
              </button>
            </div>
          )}

          <ProductGrid products={products} loading={loading} />

          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.pages}
            onPageChange={handlePageChange}
          />
        </div>

        <CTASection />
      </motion.div>
    </>
  );
};

export default LoanProducts;