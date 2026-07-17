// FILE: frontend/src/components/about/MissionValues.jsx


import React from 'react';
import { motion } from 'framer-motion';
import {
  UserGroupIcon,
  EyeIcon,
  LightBulbIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

/**
 * Mission & Values Component
 * 
 *  Child Explanation:
 * "This shows what the company believes in and what it's trying to achieve."
 * 
 *  Technical Explanation:
 * "Displays the company's mission statement and core values with icons."
 */
const MissionValues = ({ data, className = '' }) => {
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

  // Icon mapping
  const iconMap = {
    UserGroupIcon: UserGroupIcon,
    EyeIcon: EyeIcon,
    LightBulbIcon: LightBulbIcon,
    ShieldCheckIcon: ShieldCheckIcon,
    HeartIcon: UserGroupIcon,
    StarIcon: LightBulbIcon,
  };

  const values = data?.values || [
    {
      title: 'Accessibility',
      description: 'Making loans available to everyone, regardless of their background or credit history.',
      icon: 'UserGroupIcon',
    },
    {
      title: 'Transparency',
      description: 'Clear terms, no hidden fees, and honest communication at every step.',
      icon: 'EyeIcon',
    },
    {
      title: 'Innovation',
      description: 'Using cutting-edge technology to make borrowing faster, simpler, and more efficient.',
      icon: 'LightBulbIcon',
    },
    {
      title: 'Integrity',
      description: 'Doing the right thing for our customers, every time, without exception.',
      icon: 'ShieldCheckIcon',
    },
  ];

  return (
    <section className={`py-16 bg-gray-50 dark:bg-gray-900 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="space-y-12"
        >
          {/* Mission Statement */}
          <motion.div variants={fadeInUp} className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Mission
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              {data?.missionStatement || 'To democratize access to affordable loans and empower individuals and businesses to achieve their financial goals.'}
            </p>
          </motion.div>

          {/* Values */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
              Our Core Values
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const IconComponent = iconMap[value.icon] || UserGroupIcon;
                return (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 text-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {value.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {value.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default MissionValues;