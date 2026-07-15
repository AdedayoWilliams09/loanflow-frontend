import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosConfig';

// Initial state
const initialState = {
  hero: null,
  stats: null,
  features: null,
  steps: [
    { title: 'Create Account', description: 'Sign up and complete your profile in minutes' },
    { title: 'Apply for Loan', description: 'Choose your loan amount and submit application' },
    { title: 'Get Funded', description: 'Receive funds once approved' },
  ],
  testimonials: [],
  faqs: [],
  loanProducts: [],
  loading: false,
  error: null,
};

// Helper to delay executions and avoid rate limit bursts (429)
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Fetch homepage data
 * 
 *  Child Explanation:
 * "This goes to the kitchen and gets all the ingredients for
 * the homepage - the welcome message, customer reviews, loan options,
 * and everything else."
 * 
 *  Technical Explanation:
 * "An async thunk that fetches necessary data for the homepage sequentially
 * with minor delays to prevent triggering rate limits."
 */
export const fetchHomepageData = createAsyncThunk(
  'home/fetchHomepageData',
  async (_, { rejectWithValue }) => {
    try {
      // Fetch sequentially with slight delays to respect rate limiter
      const heroRes = await axiosInstance.get('/settings/hero');
      await delay(100);
      
      const statsRes = await axiosInstance.get('/settings/statistics');
      await delay(100);
      
      const featuresRes = await axiosInstance.get('/settings/features');
      await delay(100);
      
      const testimonialsRes = await axiosInstance.get('/testimonials?limit=3');
      await delay(100);
      
      const faqsRes = await axiosInstance.get('/faqs?limit=6');
      await delay(100);
      
      const productsRes = await axiosInstance.get('/loan-products?limit=4');
      
      return {
        hero: heroRes.data.data,
        stats: statsRes.data.data,
        features: featuresRes.data.data,
        testimonials: testimonialsRes.data.data,
        faqs: faqsRes.data.data,
        loanProducts: productsRes.data.data,
      };
    } catch (error) {
      // Return fallback data if API fails or rate limit is hit
      return {
        hero: {
          heading: 'Get Fast, Flexible Loans When You Need Them Most',
          subheading: 'Apply in minutes, get approval within 24 hours, and access funds to grow your business or handle personal needs',
          ctaText: 'Apply Now',
          ctaLink: '/auth/register',
          secondaryCtaText: 'Learn More',
          secondaryCtaLink: '#features',
        },
        stats: {
          customers: '10,000+',
          disbursed: '₦50 Billion',
          approvalRate: '98%',
          processingTime: '24-Hour',
          customersLabel: 'Happy Customers',
          disbursedLabel: 'Disbursed to Date',
          approvalRateLabel: 'Approval Rate',
          processingTimeLabel: 'Average Processing',
        },
        features: [
          {
            title: 'Fast Approval',
            description: 'Get approved within 24 hours with our automated system',
            icon: 'RocketIcon',
            color: 'blue',
          },
          {
            title: 'Flexible Repayment',
            description: 'Choose from multiple repayment options that suit your needs',
            icon: 'CalendarIcon',
            color: 'green',
          },
          {
            title: 'Low Interest Rates',
            description: 'Competitive rates with transparent fee structure',
            icon: 'ShieldCheckIcon',
            color: 'purple',
          },
          {
            title: 'Secure & Trusted',
            description: 'Bank-level security for your peace of mind',
            icon: 'LockClosedIcon',
            color: 'orange',
          },
        ],
        testimonials: [],
        faqs: [
          {
            question: 'What types of loans do you offer?',
            answer: 'We offer personal loans, business loans, salary advances, and student loans.',
          },
          {
            question: 'How long does it take to get approved?',
            answer: 'Most applications are approved within 24 hours.',
          },
          {
            question: 'What are the interest rates?',
            answer: 'Interest rates vary by product and range from 5% to 15% per annum.',
          },
        ],
        loanProducts: [],
      };
    }
  }
);

/**
 * Home Slice
 * 
 *  Child Explanation:
 * "This controls the control room - it updates information
 * when new data arrives and remembers what's happening."
 * 
 *  Technical Explanation:
 * "A Redux slice with reducers and actions for homepage state."
 */
const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    // Reset the home state
    resetHome: (state) => {
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch homepage data
      .addCase(fetchHomepageData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHomepageData.fulfilled, (state, action) => {
        state.loading = false;
        state.hero = action.payload.hero;
        state.stats = action.payload.stats;
        state.features = action.payload.features;
        state.testimonials = action.payload.testimonials;
        state.faqs = action.payload.faqs;
        state.loanProducts = action.payload.loanProducts;
      })
      .addCase(fetchHomepageData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

// Export actions
export const { resetHome } = homeSlice.actions;

// Selectors
export const selectHomeLoading = (state) => state.home.loading;
export const selectHomeError = (state) => state.home.error;
export const selectHero = (state) => state.home.hero;
export const selectStats = (state) => state.home.stats;
export const selectFeatures = (state) => state.home.features;
export const selectTestimonials = (state) => state.home.testimonials;
export const selectFAQs = (state) => state.home.faqs;
export const selectLoanProducts = (state) => state.home.loanProducts;

export default homeSlice.reducer;