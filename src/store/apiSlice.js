// FILE: frontend/src/store/apiSlice.js


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosConfig';

/**
 * Async Thunk for Testing Backend Connection
 * 
 *  Child Explanation:
 * "This is like sending a messenger to the kitchen with a special test message.
 * We wait for them to come back and tell us if everything is working."
 * 
 *  Technical Explanation:
 * "createAsyncThunk creates an action creator that handles async logic.
 * It automatically dispatches pending/fulfilled/rejected actions based on
 * the promise state."
 */
export const testBackendConnection = createAsyncThunk(
  'api/testConnection',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/api/test');
      return response.data;
    } catch (error) {
      // Return error response to be handled by reducers
      if (error.response) {
        // Server responded with error
        return rejectWithValue({
          status: error.response.status,
          data: error.response.data,
          message: error.response.data.message || 'Server error',
        });
      } else if (error.request) {
        // No response received
        return rejectWithValue({
          status: 0,
          data: null,
          message: 'Network error - Could not reach server',
        });
      } else {
        // Request setup error
        return rejectWithValue({
          status: 0,
          data: null,
          message: error.message || 'Request failed',
        });
      }
    }
  }
);

/**
 * API Slice
 * 
 *  Child Explanation:
 * "This is the control room that keeps track of what's happening with our
 * messages to the kitchen. It remembers if we're waiting, if we succeeded,
 * or if something went wrong."
 * 
 *  Technical Explanation:
 * "The slice contains the reducer and actions for API-related state.
 * It handles loading states, success states, and error states for the
 * test connection API call."
 */
const apiSlice = createSlice({
  name: 'api',
  initialState: {
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    data: null,
    error: null,
    lastTestTime: null,
  },
  reducers: {
    // Reset the API state
    resetApiState: (state) => {
      state.status = 'idle';
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // When the test starts
      .addCase(testBackendConnection.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        console.log(' Testing backend connection...');
      })
      // When the test succeeds
      .addCase(testBackendConnection.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.lastTestTime = new Date().toISOString();
        console.log(' Backend connection test successful!');
        console.log(' Response data:', action.payload);
      })
      // When the test fails
      .addCase(testBackendConnection.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || { message: 'Unknown error occurred' };
        console.error(' Backend connection test failed!');
        console.error(' Error details:', state.error);
      });
  },
});

// Export actions
export const { resetApiState } = apiSlice.actions;

// Selectors
export const selectApiStatus = (state) => state.api.status;
export const selectApiData = (state) => state.api.data;
export const selectApiError = (state) => state.api.error;
export const selectLastTestTime = (state) => state.api.lastTestTime;

export default apiSlice.reducer;