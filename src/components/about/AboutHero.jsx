// FILE: frontend/src/components/about/AboutHero.jsx


import React from 'react';
import { motion } from 'framer-motion';

/**
 * About Hero Component
 * 
 *  Child Explanation:
 * "This is the big welcome message at the top of the About page.
 * It tells you what the company is all about."
 * 
 *  Technical Explanation:
 * "Hero section for the About page with mission statement and image."
 */
const AboutHero = ({ data, className = '' }) => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className={`relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-950 py-20 lg:py-28 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="space-y-6"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {data?.heroHeading || 'Empowering Financial Freedom'}
            </h1>
            <p className="text-lg text-blue-100 leading-relaxed">
              {data?.heroSubheading || "We're on a mission to make loans accessible, transparent, and fair for everyone"}
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="inline-flex items-center gap-2 text-white bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-yellow-400">★</span>
                <span>Trusted by 10,000+ customers</span>
              </div>
            </div>
          </motion.div>
          
          {/* Image */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="flex justify-center"
          >
            <div className="w-full max-w-md">
              <img 
                src={data?.heroImageUrl || '/assets/about-hero.webp'} 
                alt="About LoanFlow" 
                className="w-full h-auto rounded-xl shadow-2xl"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
    </section>
  );
};

export default AboutHero;