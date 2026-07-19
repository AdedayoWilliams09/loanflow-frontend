// FILE: frontend/src/store/productsSlice.js


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosConfig';

// Initial state
const initialState = {
  products: [],
  productTypes: [],
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  },
  filters: {
    type: 'all',
    minAmount: null,
    maxAmount: null,
    duration: null,
    search: null,
  },
  loading: false,
  error: null,
};

/**
 * Fetch Loan Products
 * 
 *  Child Explanation:
 * "This goes to the kitchen and gets all the loan options
 * based on what you're looking for."
 * 
 *  Technical Explanation:
 * "An async thunk that fetches loan products with filtering and pagination."
 */
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/loan-products', { 
        params: {
          page: params.page || 1,
          limit: params.limit || 10,
          ...params.filters,
        } 
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || 'Failed to fetch products');
      }
      return rejectWithValue('Network error - Could not reach server');
    }
  }
);

/**
 * Fetch Product Types
 * 
 *  Child Explanation:
 * "This gets a list of all the different types of loans available."
 * 
 *  Technical Explanation:
 * "Fetches distinct loan product types for filter dropdown."
 */
export const fetchProductTypes = createAsyncThunk(
  'products/fetchProductTypes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/loan-products/types');
      return response.data.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || 'Failed to fetch product types');
      }
      return rejectWithValue('Network error - Could not reach server');
    }
  }
);

/**
 * Products Slice
 * 
 *  Child Explanation:
 * "This controls the control room - it updates information
 * when new data arrives and remembers what's happening."
 * 
 *  Technical Explanation:
 * "A Redux slice with reducers and actions for loan products state."
 */
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = {
        type: 'all',
        minAmount: null,
        maxAmount: null,
        duration: null,
        search: null,
      };
      state.pagination.page = 1;
    },
    setPage: (state, action) => {
      state.pagination.page = action.payload;
    },
    resetProducts: (state) => {
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data;
        state.pagination = action.payload.pagination;
        // Update filters from response
        // if (action.payload.filters) {
        //   state.filters = {
        //     type: action.payload.filters.type || 'all',
        //     minAmount: action.payload.filters.minAmount || null,
        //     maxAmount: action.payload.filters.maxAmount || null,
        //     duration: action.payload.filters.duration || null,
        //     search: action.payload.filters.search || null,
        //   };
        // }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch products';
      })
      // Fetch Product Types
      .addCase(fetchProductTypes.fulfilled, (state, action) => {
        state.productTypes = action.payload;
      })
      .addCase(fetchProductTypes.rejected, (state, action) => {
        console.error('Failed to fetch product types:', action.payload);
      });
  },
});

// Export actions
export const { setFilters, resetFilters, setPage, resetProducts } = productsSlice.actions;

// Selectors
export const selectProducts = (state) => state.products.products;
export const selectProductTypes = (state) => state.products.productTypes;
export const selectPagination = (state) => state.products.pagination;
export const selectFilters = (state) => state.products.filters;
export const selectProductsLoading = (state) => state.products.loading;
export const selectProductsError = (state) => state.products.error;

export default productsSlice.reducer;