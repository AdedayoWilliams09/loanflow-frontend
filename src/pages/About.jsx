// FILE: frontend/src/pages/About.jsx
// CREATED: New file

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import AboutHero from '../components/about/AboutHero';
import OurStory from '../components/about/OurStory';
import MissionValues from '../components/about/MissionValues';
import TeamSection from '../components/about/TeamSection';
import WhyChooseUs from '../components/about/WhyChooseUs';
import { fetchAboutPageData } from '../store/aboutSlice';

/**
 * About Page
 * 
 *  Child Explanation:
 * "This is the page that tells you all about the company -
 * who they are, what they believe in, and who works there."
 * 
 *  Technical Explanation:
 * "The About page component with SEO, animations, and state management."
 */
const About = () => {
  const dispatch = useDispatch();
  const { 
    aboutSettings, 
    teamMembers, 
    loading, 
    error 
  } = useSelector((state) => state.about);

  // Fetch data on mount
  useEffect(() => {
    dispatch(fetchAboutPageData());
  }, [dispatch]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="animate-pulse space-y-12">
            {/* Hero skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-4">
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
              </div>
              <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
            </div>
            {/* Story skeleton */}
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mx-auto"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400">Failed to load about page content</p>
          <button 
            onClick={() => dispatch(fetchAboutPageData())}
            className="mt-4 text-blue-600 dark:text-blue-400 hover:underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  // Schema markup for the about page
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About LoanFlow",
    "description": "Learn about LoanFlow's mission to make loans accessible, transparent, and fair for everyone.",
    "mainEntity": {
      "@type": "Organization",
      "name": "LoanFlow",
      "description": aboutSettings?.missionStatement || "To democratize access to affordable loans and empower individuals and businesses to achieve their financial goals.",
      "founders": teamMembers?.map(member => ({
        "@type": "Person",
        "name": member.name,
        "jobTitle": member.role,
        "description": member.bio,
      })) || [],
    }
  };

  return (
    <>
      <Helmet>
        <title>About LoanFlow - Our Mission & Team</title>
        <meta name="description" content="Learn about LoanFlow's mission to make loans accessible, transparent, and fair for everyone. Meet our team and discover our values." />
        <meta name="keywords" content="about LoanFlow, fintech company, loan company mission, financial inclusion" />
        <meta property="og:title" content="About LoanFlow - Our Mission & Team" />
        <meta property="og:description" content="Learn about LoanFlow's mission to make loans accessible, transparent, and fair for everyone. Meet our team and discover our values." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://loanflow.com/about" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About LoanFlow - Our Mission & Team" />
        <meta name="twitter:description" content="Learn about LoanFlow's mission to make loans accessible, transparent, and fair for everyone." />
        <script type="application/ld+json">
          {JSON.stringify(aboutSchema)}
        </script>
      </Helmet>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gray-50 dark:bg-gray-900"
      >
        <AboutHero data={aboutSettings} />
        <OurStory data={aboutSettings} />
        <MissionValues data={aboutSettings} />
        <TeamSection teamMembers={teamMembers} />
        <WhyChooseUs />
      </motion.div>
    </>
  );
};

export default About;