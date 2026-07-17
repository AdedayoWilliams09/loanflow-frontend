// FILE: frontend/src/components/about/TeamSection.jsx
// CREATED: New file

import React from 'react';
import { motion } from 'framer-motion';

/**
 * Team Section Component
 * 
 *  Child Explanation:
 * "This shows the people who work at the company and what they do."
 * 
 *  Technical Explanation:
 * "Displays team members with photos, names, roles, and bios."
 */
const TeamSection = ({ teamMembers = [], className = '' }) => {
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

  if (!teamMembers || teamMembers.length === 0) {
    return null;
  }

  return (
    <section className={`py-16 bg-white dark:bg-gray-800 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-4">
            Leadership Team
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-gray-600 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Meet the people behind LoanFlow who are committed to your financial success
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member._id || index}
                variants={fadeInUp}
                className="bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="p-6 text-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 flex items-center justify-center mx-auto mb-4 overflow-hidden">
                    <img
                      src={member.photoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=6366f1&color=fff&size=128`}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;