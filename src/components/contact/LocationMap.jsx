// FILE: frontend/src/components/contact/LocationMap.jsx
// CREATED: New file

import React from 'react';
import { motion } from 'framer-motion';

/**
 * Location Map Component
 * 
 *  Child Explanation:
 * "This shows where we are located on a map."
 * 
 *  Technical Explanation:
 * "Google Maps embed component with responsive iframe."
 */
const LocationMap = ({ className = '' }) => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // Google Maps embed URL for Lagos, Nigeria
  const mapSrc = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253682.66470432907!2d3.1191484575792246!3d6.548181681572287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos%2C%20Nigeria!5e0!3m2!1sen!2sus!4v1700000000000';


  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className={`rounded-xl overflow-hidden shadow-sm ${className}`}
    >
      <div className="relative w-full" style={{ paddingBottom: '40%' }}>
        <iframe
          src={mapSrc}
          className="absolute inset-0 w-full h-full"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="LoanFlow Location Map"
        />
      </div>
    </motion.div>
  );
};

export default LocationMap;