// FILE: frontend/src/components/contact/ContactForm.jsx
// CREATED: New file

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { submitContact } from '../../store/contactSlice';

/**
 * Contact Form Component
 * 
 *  Child Explanation:
 * "This is the form where you type your message to send to us."
 * 
 *  Technical Explanation:
 * "Contact form with validation, loading states, and success/error handling."
 */
const ContactForm = ({ className = '' }) => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const subjectOptions = [
    'General Inquiry',
    'Loan Application Support',
    'Repayment Help',
    'Feedback',
    'Complaint',
    'Other',
  ];

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const result = await dispatch(submitContact(data)).unwrap();
      setSubmitStatus({ type: 'success', message: result.message });
      reset();
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: error.message || 'Failed to send message. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 md:p-8 ${className}`}
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Send Us a Message
      </h2>

      {submitStatus && (
        <div className={`
          p-4 rounded-lg mb-6
          ${submitStatus.type === 'success' 
            ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' 
            : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
          }
        `}>
          {submitStatus.message}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            {...register('name', { 
              required: 'Name is required',
              maxLength: { value: 100, message: 'Name cannot exceed 100 characters' }
            })}
            className={`
              w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 
              text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
              focus:ring-2 focus:ring-blue-500 focus:border-transparent
              ${errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
            `}
            placeholder="John Doe"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            type="email"
            className={`
              w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 
              text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
              focus:ring-2 focus:ring-blue-500 focus:border-transparent
              ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
            `}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Phone Number
          </label>
          <input
            {...register('phone', {
              pattern: {
                value: /^[0-9+\-\s()]{10,15}$/,
                message: 'Invalid phone number'
              }
            })}
            className={`
              w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 
              text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
              focus:ring-2 focus:ring-blue-500 focus:border-transparent
              ${errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
            `}
            placeholder="+234 800 000 0000"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        {/* Subject */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Subject <span className="text-red-500">*</span>
          </label>
          <select
            {...register('subject', { required: 'Subject is required' })}
            className={`
              w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 
              text-gray-900 dark:text-white
              focus:ring-2 focus:ring-blue-500 focus:border-transparent
              ${errors.subject ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
            `}
          >
            <option value="">Select a subject...</option>
            {subjectOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          {errors.subject && (
            <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register('message', { 
              required: 'Message is required',
              minLength: { value: 10, message: 'Message must be at least 10 characters' },
              maxLength: { value: 5000, message: 'Message cannot exceed 5000 characters' }
            })}
            rows="5"
            className={`
              w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 
              text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
              focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none
              ${errors.message ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
            `}
            placeholder="How can we help you?"
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`
            w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold 
            py-3 px-6 rounded-lg transition-colors duration-200
            min-h-[48px] flex items-center justify-center
            ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}
          `}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default ContactForm;