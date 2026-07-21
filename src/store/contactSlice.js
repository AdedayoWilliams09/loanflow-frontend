// FILE: frontend/src/store/contactSlice.js


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosConfig';

// Initial state
const initialState = {
  submissionStatus: null,
  loading: false,
  error: null,
};

/**
 * Submit Contact Form
 * 
 *  Child Explanation:
 * "This sends the message to the backend to be saved and emailed."
 * 
 *  Technical Explanation:
 * "An async thunk that submits the contact form to the backend."
 */
export const submitContact = createAsyncThunk(
  'contact/submitContact',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/contact', formData);
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: 'Network error - Could not reach server' });
    }
  }
);

/**
 * Contact Slice
 * 
 * 🧒 Child Explanation:
 * "This controls the control room - it updates information
 * when the message is sent and remembers what's happening."
 * 
 * 👨‍💻 Technical Explanation:
 * "A Redux slice with reducers and actions for contact state."
 */
const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    resetContact: (state) => {
      state.submissionStatus = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContact.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.submissionStatus = null;
      })
      .addCase(submitContact.fulfilled, (state, action) => {
        state.loading = false;
        state.submissionStatus = { type: 'success', message: action.payload.message };
        state.error = null;
      })
      .addCase(submitContact.rejected, (state, action) => {
        state.loading = false;
        state.submissionStatus = { 
          type: 'error', 
          message: action.payload?.message || 'Failed to send message' 
        };
        state.error = action.payload || { message: 'Failed to send message' };
      });
  },
});

// Export actions
export const { resetContact } = contactSlice.actions;

// Selectors
export const selectContactLoading = (state) => state.contact.loading;
export const selectContactError = (state) => state.contact.error;
export const selectSubmissionStatus = (state) => state.contact.submissionStatus;

export default contactSlice.reducer;