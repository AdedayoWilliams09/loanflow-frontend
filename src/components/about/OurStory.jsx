// FILE: frontend/src/components/about/OurStory.jsx


import React from 'react';
import { motion } from 'framer-motion';

/**
 * Our Story Component
 * 
 *  Child Explanation:
 * "This tells the story of how the company started and why it exists."
 * 
 *  Technical Explanation:
 * "Displays the company's origin story with founder photos."
 */
const OurStory = ({ data, className = '' }) => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

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

  // Mock founder data - will be replaced with real data from API
  const founders = [
    { name: 'Adedayo Williams', role: 'CEO & Co-Founder', image: '/assets/founders/chidi.jpg' },
    { name: 'Amina Bello', role: 'CTO & Co-Founder', image: '/assets/founders/amina.jpg' },
    { name: 'Emeka Okafor', role: 'Head of Operations', image: '/assets/founders/emeka.jpg' },
  ];

  return (
    <section className={`py-16 bg-white dark:bg-gray-800 ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="space-y-8"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-gray-900 dark:text-white text-center">
            {data?.storyTitle || 'Our Story'}
          </motion.h2>
          
          <motion.div variants={fadeInUp} className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {data?.storyContent || 'LoanFlow was founded in 2020 with a simple vision: to make borrowing simple, fast, and fair for everyone. We saw that traditional banks were slow, opaque, and often rejected qualified borrowers. We built LoanFlow to change that.\n\nToday, we\'ve helped thousands of customers access the funds they need to grow their businesses, pay for education, and achieve their dreams. We\'re proud to be a trusted partner in financial empowerment.'}
            </p>
          </motion.div>
          
          {/* Founder Photos */}
          <motion.div variants={fadeInUp} className="pt-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-6">
              Meet Our Founders
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {founders.map((founder, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="text-center"
                >
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 flex items-center justify-center mx-auto mb-3 overflow-hidden">
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(founder.name)}&background=6366f1&color=fff&size=96`;
                      }}
                    />
                  </div>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">
                    {founder.name}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">
                    {founder.role}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default OurStory;