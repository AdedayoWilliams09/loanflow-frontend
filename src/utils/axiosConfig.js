// FILE: frontend/src/utils/axiosConfig.js


import axios from 'axios';

/**
 * Axios Instance Configuration
 * 
 *  Child Explanation:
 * "This is our messenger's instructions. It says: 'Always start from this address
 * (baseURL). If you don't get a reply within 10 seconds, come back. Also, write
 * down everything that happens so we can check later.'"
 * 
 *  Technical Explanation:
 * "We create a configured Axios instance with a base URL, timeout, and interceptors
 * for logging and error handling. This keeps API calls consistent and maintainable."
 */

// Determine the base URL
// In development, use localhost. In production, use the deployed URL.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Create the Axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request Interceptor
 * 
 *  Child Explanation:
 * "Before the messenger leaves, we check what they're carrying and write
 * it down in our logbook."
 * 
 *  Technical Explanation:
 * "The request interceptor runs before each request is sent. It's useful
 * for logging, adding authentication tokens, or modifying requests."
 */
axiosInstance.interceptors.request.use(
  (config) => {
    // Log the request in development
    if (import.meta.env.DEV) {
      console.log(' Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        baseURL: config.baseURL,
        data: config.data,
      });
    }
    return config;
  },
  (error) => {
    console.error(' Request Error:', error);
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * 
 *  Child Explanation:
 * "When the messenger comes back, we check what they brought and write
 * it down in our logbook. If something went wrong, we note that too."
 * 
 *  Technical Explanation:
 * "The response interceptor runs after each response is received. It's useful
 * for logging, handling errors globally, or transforming responses."
 */
axiosInstance.interceptors.response.use(
  (response) => {
    // Log the response in development
    if (import.meta.env.DEV) {
      console.log(' Response:', {
        status: response.status,
        data: response.data,
        url: response.config.url,
      });
    }
    return response;
  },
  (error) => {
    // Handle different types of errors
    if (error.response) {
      // The request was made and the server responded with a status code
      // outside of the 2xx range
      console.error(' Server Error:', {
        status: error.response.status,
        data: error.response.data,
        url: error.config?.url,
      });
      
      // Log specific error messages
      if (error.response.status === 404) {
        console.error('   → Endpoint not found. Check the URL.');
      } else if (error.response.status === 429) {
        console.error('   → Rate limit exceeded. Please wait.');
      } else if (error.response.status >= 500) {
        console.error('   → Server error. Please try again later.');
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error(' Network Error:', {
        message: 'No response received from server',
        url: error.config?.url,
      });
      
      // Provide helpful suggestions
      console.error('💡 Suggestions:');
      console.error('   1. Check if the backend server is running');
      console.error('   2. Verify the API URL in .env file');
      console.error('   3. Check your network connection');
      console.error('   4. Check if CORS is properly configured');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error(' Request Setup Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;