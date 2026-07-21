// FILE: frontend/src/pages/Contact.jsx
// CREATED: New file

import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import PageHeader from '../components/contact/PageHeader';
import ContactForm from '../components/contact/ContactForm';
import ContactInfo from '../components/contact/ContactInfo';
import LocationMap from '../components/contact/LocationMap';

/**
 * Contact Page
 * 
 *  Child Explanation:
 * "This is the page where you can send us a message."
 * 
 *  Technical Explanation:
 * "The Contact page with form, contact info, and location map."
 */
const Contact = () => {
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      }
    }
  };

  // Schema markup for contact page
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact LoanFlow",
    "description": "Get in touch with LoanFlow for support, inquiries, or feedback.",
    "mainEntity": {
      "@type": "Organization",
      "name": "LoanFlow",
      "email": "support@loanflow.com",
      "telephone": "+2348000000000",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Lagos",
        "addressCountry": "NG"
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact LoanFlow - Get in Touch</title>
        <meta name="description" content="Contact LoanFlow for support, inquiries, or feedback. Our team is ready to help you with your loan needs." />
        <meta name="keywords" content="contact, support, help, inquiry, feedback, loan support" />
        <meta property="og:title" content="Contact LoanFlow - Get in Touch" />
        <meta property="og:description" content="Contact LoanFlow for support, inquiries, or feedback. Our team is ready to help you with your loan needs." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://loanflow.com/contact" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact LoanFlow - Get in Touch" />
        <meta name="twitter:description" content="Contact us for support, inquiries, or feedback." />
        <script type="application/ld+json">
          {JSON.stringify(contactSchema)}
        </script>
      </Helmet>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gray-50 dark:bg-gray-900"
      >
        <PageHeader
          title="Get in Touch"
          subtitle="We're here to help. Reach out to us anytime."
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Contact Form - 2 columns on desktop */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>

            {/* Contact Info - 1 column on desktop */}
            <div>
              <ContactInfo />
            </div>
          </motion.div>

          {/* Location Map */}
          <div className="mt-12">
            <LocationMap />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Contact;