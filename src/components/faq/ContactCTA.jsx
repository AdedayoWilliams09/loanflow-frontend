// FILE: frontend/src/components/faq/ContactCTA.jsx


import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { EnvelopeIcon, PhoneIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import Button from '../common/Button';

/**
 * Contact CTA Component
 * 
 *  Child Explanation:
 * "This encourages you to reach out if you still have questions."
 * 
 *  Technical Explanation:
 * "Call-to-action section for contacting support."
 */
const ContactCTA = ({ className = '' }) => {
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

  const contactMethods = [
    {
      icon: EnvelopeIcon,
      label: 'Email Us',
      description: 'support@loanflow.com',
      action: 'mailto:support@loanflow.com',
      color: 'blue',
    },
    {
      icon: PhoneIcon,
      label: 'Call Us',
      description: '+234 800 000 0000',
      action: 'tel:+2348000000000',
      color: 'green',
    },
    {
      icon: ChatBubbleLeftRightIcon,
      label: 'Live Chat',
      description: 'Available 24/7',
      action: '/contact',
      color: 'purple',
    },
  ];

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      className={`py-16 bg-gray-50 dark:bg-gray-900 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Still Have Questions?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl mx-auto">
            Our support team is here to help. Contact us for personalized assistance.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
        >
          {contactMethods.map((method, index) => {
            const IconComponent = method.icon;
            const colorClasses = {
              blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
              green: 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400',
              purple: 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
            };

            return (
              <motion.a
                key={index}
                href={method.action}
                variants={fadeInUp}
                className="block p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 text-center group"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${colorClasses[method.color]}`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {method.label}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                  {method.description}
                </p>
              </motion.a>
            );
          })}
        </motion.div>

        <motion.div variants={fadeInUp} className="text-center mt-8">
          <Link to="/contact">
            <Button variant="primary" size="lg">
              Contact Support
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ContactCTA;