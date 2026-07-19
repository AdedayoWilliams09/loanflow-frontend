// FILE: frontend/src/store/faqSlice.js


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosConfig';

// Initial state
const initialState = {
  faqs: [],
  categories: [],
  activeCategory: 'all',
  searchTerm: '',
  loading: false,
  error: null,
};

/**
 * Fetch FAQs
 * 
 *  Child Explanation:
 * "This goes to the kitchen and gets all the questions and answers
 * based on what category you're looking at."
 * 
 *  Technical Explanation:
 * "An async thunk that fetches FAQs with category filtering and search."
 */
export const fetchFAQs = createAsyncThunk(
  'faq/fetchFAQs',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/faqs', { 
        params: {
          category: params.category || 'all',
          search: params.search || '',
          limit: params.limit || 50,
        } 
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || 'Failed to fetch FAQs');
      }
      return rejectWithValue('Network error - Could not reach server');
    }
  }
);

/**
 * Fetch FAQ Categories
 * 
 *  Child Explanation:
 * "This gets a list of all the different categories of questions."
 * 
 *  Technical Explanation:
 * "Fetches distinct FAQ categories for filter pills."
 */
export const fetchFAQCategories = createAsyncThunk(
  'faq/fetchFAQCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/faqs/categories');
      return response.data.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || 'Failed to fetch categories');
      }
      return rejectWithValue('Network error - Could not reach server');
    }
  }
);

/**
 * FAQ Slice
 * 
 *  Child Explanation:
 * "This controls the control room - it updates information
 * when new data arrives and remembers what's happening."
 * 
 *  Technical Explanation:
 * "A Redux slice with reducers and actions for FAQ state."
 */
const faqSlice = createSlice({
  name: 'faq',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
    setSearch: (state, action) => {
      state.searchTerm = action.payload;
    },
    resetFAQ: (state) => {
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch FAQs
      .addCase(fetchFAQs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFAQs.fulfilled, (state, action) => {
        state.loading = false;
        state.faqs = action.payload.data;
        if (action.payload.categories) {
          state.categories = action.payload.categories;
        }
      })
      .addCase(fetchFAQs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch FAQs';
      })
      // Fetch Categories
      .addCase(fetchFAQCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchFAQCategories.rejected, (state, action) => {
        console.error('Failed to fetch categories:', action.payload);
      });
  },
});

// Export actions
export const { setCategory, setSearch, resetFAQ } = faqSlice.actions;

// Selectors
export const selectFAQs = (state) => state.faq.faqs;
export const selectFAQCategories = (state) => state.faq.categories;
export const selectActiveCategory = (state) => state.faq.activeCategory;
export const selectSearchTerm = (state) => state.faq.searchTerm;
export const selectFAQLoading = (state) => state.faq.loading;
export const selectFAQError = (state) => state.faq.error;

export default faqSlice.reducer;