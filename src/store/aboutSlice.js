// FILE: frontend/src/store/aboutSlice.js


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosConfig';

// Initial state
const initialState = {
  aboutSettings: null,
  teamMembers: [],
  loading: false,
  error: null,
};

/**
 * Fetch About Page Data
 * 
 *  Child Explanation:
 * "This goes to the kitchen and gets all the ingredients for
 * the About page - the mission, story, values, and team members."
 * 
 *  Technical Explanation:
 * "An async thunk that fetches about settings and team members in parallel."
 */
export const fetchAboutPageData = createAsyncThunk(
  'about/fetchAboutPageData',
  async (_, { rejectWithValue }) => {
    try {
      const [aboutRes, teamRes] = await Promise.all([
        axiosInstance.get('/settings/about'),
        axiosInstance.get('/team'),
      ]);
      
      return {
        aboutSettings: aboutRes.data.data,
        teamMembers: teamRes.data.data,
      };
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message || 'Failed to fetch about data');
      }
      return rejectWithValue('Network error - Could not reach server');
    }
  }
);

/**
 * About Slice
 * 
 * 🧒 Child Explanation:
 * "This controls the control room - it updates information
 * when new data arrives and remembers what's happening."
 * 
 * 👨‍💻 Technical Explanation:
 * "A Redux slice with reducers and actions for About page state."
 */
const aboutSlice = createSlice({
  name: 'about',
  initialState,
  reducers: {
    resetAbout: (state) => {
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAboutPageData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAboutPageData.fulfilled, (state, action) => {
        state.loading = false;
        state.aboutSettings = action.payload.aboutSettings;
        state.teamMembers = action.payload.teamMembers;
      })
      .addCase(fetchAboutPageData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch about page data';
      });
  },
});

// Export actions
export const { resetAbout } = aboutSlice.actions;

// Selectors
export const selectAboutLoading = (state) => state.about.loading;
export const selectAboutError = (state) => state.about.error;
export const selectAboutSettings = (state) => state.about.aboutSettings;
export const selectTeamMembers = (state) => state.about.teamMembers;

export default aboutSlice.reducer;