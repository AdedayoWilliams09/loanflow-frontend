// FILE: frontend/src/pages/FAQ.jsx
// CREATED: New file

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import PageHeader from '../components/faq/PageHeader';
import CategoryFilter from '../components/faq/CategoryFilter';
import SearchBar from '../components/faq/SearchBar';
import FAQAccordion from '../components/faq/FAQAccordion';
import ContactCTA from '../components/faq/ContactCTA';
import { 
  fetchFAQs, 
  fetchFAQCategories,
  setCategory,
  setSearch,
  selectFAQs,
  selectFAQCategories,
  selectActiveCategory,
  selectSearchTerm,
  selectFAQLoading,
  selectFAQError,
} from '../store/faqSlice';

/**
 * FAQ Page
 * 
 * 🧒 Child Explanation:
 * "This is the page where you can find answers to common questions
 * about loans and the platform."
 * 
 * 👨‍💻 Technical Explanation:
 * "The FAQ page with category filtering, search, and SEO."
 */
const FAQ = () => {
  const dispatch = useDispatch();
  const faqs = useSelector(selectFAQs);
  const categories = useSelector(selectFAQCategories);
  const activeCategory = useSelector(selectActiveCategory);
  const searchTerm = useSelector(selectSearchTerm);
  const loading = useSelector(selectFAQLoading);
  const error = useSelector(selectFAQError);

  // Fetch categories on mount
  useEffect(() => {
    dispatch(fetchFAQCategories());
  }, [dispatch]);

  // Fetch FAQs when category or search changes
  useEffect(() => {
    dispatch(fetchFAQs({
      category: activeCategory,
      search: searchTerm,
    }));
  }, [dispatch, activeCategory, searchTerm]);

  // Handle category change
  const handleCategoryChange = (category) => {
    dispatch(setCategory(category));
  };

  // Handle search
  const handleSearch = (term) => {
    dispatch(setSearch(term));
  };

  // Schema markup for FAQ page
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <Helmet>
        <title>FAQ - Frequently Asked Questions | LoanFlow</title>
        <meta name="description" content="Find answers to common questions about loan applications, interest rates, repayments, and account security at LoanFlow." />
        <meta name="keywords" content="FAQ, frequently asked questions, loan questions, repayment questions, account security" />
        <meta property="og:title" content="FAQ - Frequently Asked Questions | LoanFlow" />
        <meta property="og:description" content="Find answers to common questions about loan applications, interest rates, repayments, and account security." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://loanflow.com/faq" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FAQ - Frequently Asked Questions" />
        <meta name="twitter:description" content="Find answers to common questions about our loan products and services." />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gray-50 dark:bg-gray-900"
      >
        <PageHeader
          title="Frequently Asked Questions"
          subtitle="Find answers to common questions about our loan products and services"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Category Filters */}
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
            className="mb-6"
          />

          {/* Search Bar */}
          <SearchBar onSearch={handleSearch} className="mb-8" />

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Loading FAQs...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg mb-6 text-center">
              {error}
              <button 
                onClick={() => dispatch(fetchFAQs({ category: activeCategory, search: searchTerm }))}
                className="ml-2 text-blue-600 dark:text-blue-400 hover:underline"
              >
                Try again
              </button>
            </div>
          )}

          {/* FAQ Accordion */}
          {!loading && !error && (
            <FAQAccordion faqs={faqs} />
          )}
        </div>

        <ContactCTA />
      </motion.div>
    </>
  );
};

export default FAQ;