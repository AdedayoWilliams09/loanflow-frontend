// FILE: frontend/src/components/contact/ContactInfo.jsx
// CREATED: New file

import React from 'react';
import { motion } from 'framer-motion';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon, 
  ClockIcon 
} from '@heroicons/react/24/outline';

/**
 * Contact Info Component
 * 
 *  Child Explanation:
 * "This shows all the ways you can contact us."
 * 
 *  Technical Explanation:
 * "Contact information cards with icons."
 */
const ContactInfo = ({ className = '' }) => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const contactItems = [
    {
      icon: EnvelopeIcon,
      title: 'Email Us',
      details: 'support@loanflow.com',
      action: 'mailto:support@loanflow.com',
      color: 'blue',
    },
    {
      icon: PhoneIcon,
      title: 'Call Us',
      details: '+234 800 000 0000',
      action: 'tel:+2348000000000',
      color: 'green',
    },
    {
      icon: MapPinIcon,
      title: 'Visit Us',
      details: 'Lagos, Nigeria',
      action: null,
      color: 'purple',
    },
    {
      icon: ClockIcon,
      title: 'Working Hours',
      details: 'Mon-Fri, 9AM - 6PM',
      action: null,
      color: 'orange',
    },
  ];

  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    green: 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400',
    purple: 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
    orange: 'bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className={`space-y-4 ${className}`}
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Contact Information
      </h2>

      {contactItems.map((item, index) => {
        const IconComponent = item.icon;
        const Wrapper = item.action ? 'a' : 'div';

        return (
          <motion.div
            key={index}
            variants={fadeInUp}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow duration-200"
          >
            <Wrapper
              href={item.action}
              className={`flex items-start gap-4 ${item.action ? 'cursor-pointer' : ''}`}
              {...(item.action ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <div className={`p-3 rounded-lg ${colorClasses[item.color]}`}>
                <IconComponent className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-0.5">
                  {item.details}
                </p>
              </div>
            </Wrapper>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default ContactInfo;