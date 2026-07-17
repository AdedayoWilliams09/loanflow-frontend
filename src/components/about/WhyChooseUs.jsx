// FILE: frontend/src/components/about/WhyChooseUs.jsx


import React from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircleIcon,
  ClockIcon,
  ShieldCheckIcon,
  UsersIcon,
  ChartBarIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

/**
 * Why Choose Us Component
 * 
 *  Child Explanation:
 * "This shows the reasons why people should choose LoanFlow over other options."
 * 
 *  Technical Explanation:
 * "Displays key differentiators and benefits of choosing LoanFlow."
 */
const WhyChooseUs = ({ className = '' }) => {
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

  const benefits = [
    {
      icon: ClockIcon,
      title: 'Fast Approval',
      description: 'Get approved within 24 hours with our automated system.',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Secure & Trusted',
      description: 'Bank-level security with data encryption and protection.',
    },
    {
      icon: UsersIcon,
      title: 'Customer Focused',
      description: 'We prioritize your needs with personalized support.',
    },
    {
      icon: ChartBarIcon,
      title: 'Competitive Rates',
      description: 'Transparent fees and competitive interest rates.',
    },
    {
      icon: CheckCircleIcon,
      title: 'Flexible Terms',
      description: 'Choose repayment plans that work for you.',
    },
    {
      icon: GlobeAltIcon,
      title: 'Accessible Anywhere',
      description: 'Apply from anywhere with our online platform.',
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
        >
          <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-4">
            Why Choose LoanFlow?
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-gray-600 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            We're committed to providing the best loan experience possible
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="flex items-start gap-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;