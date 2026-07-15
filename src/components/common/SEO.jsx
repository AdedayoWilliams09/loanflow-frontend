// FILE: frontend/src/components/common/SEO.jsx
// CREATED: New file

import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * SEO Component
 * 
 *  Child Explanation:
 * "This adds special tags to the page that tell Google what the page is about."
 * 
 *  Technical Explanation:
 * "A component that manages meta tags, Open Graph, and structured data for SEO."
 */
const SEO = ({ 
  title = 'LoanFlow - Get Fast & Flexible Loans Online',
  description = 'Apply for personal, business, and salary advance loans with competitive rates. Get approved within 24 hours. Trusted by 10,000+ customers.',
  keywords = 'loan, personal loan, business loan, fast loan, online loan, Nigeria',
  image = '/og-image.jpg',
  url = 'https://loanflow.com',
  type = 'website',
  schema = null,
}) => {
  const siteTitle = 'LoanFlow';
  const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteTitle} />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Structured Data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;