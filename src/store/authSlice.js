import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosConfig';

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  token: localStorage.getItem('accessToken') || null,
};

/**
 * Login User
 * 
 *  Child Explanation:
 * "This sends your email and password to the backend to check if they're correct."
 * 
 *  Technical Explanation:
 * "An async thunk that authenticates user and stores tokens."
 */
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password, rememberMe }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/auth/login', {
        email,
        password,
        rememberMe,
      });
      return response.data.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: 'Network error - Could not reach server' });
    }
  }
);

/**
 * Get Current User
 * 
 *  Child Explanation:
 * "This gets your information from the backend."
 * 
 *  Technical Explanation:
 * "Fetches the current authenticated user's profile."
 */
export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/auth/me');
      return response.data.data.user;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: 'Network error - Could not reach server' });
    }
  }
);

/**
 * Logout User
 * 
 *  Child Explanation:
 * "This removes your pass and logs you out."
 * 
 *  Technical Explanation:
 * "Clears user state and removes tokens from localStorage."
 */
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.post('/auth/logout');
      return true;
    } catch (error) {
      // Even if the API call fails, we still want to clear local state
      return true;
    }
  }
);

/**
 * Auth Slice
 * 
 *  Child Explanation:
 * "This controls the control room - it updates information
 * when you log in or out."
 * 
 *  Technical Explanation:
 * "A Redux slice with reducers and actions for authentication state."
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // 🟢 OAuth / Direct Token Login Reducer
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.accessToken;
      state.loading = false;
      state.error = null;

      if (action.payload.accessToken) {
        localStorage.setItem('accessToken', action.payload.accessToken);
      }
      if (action.payload.refreshToken) {
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      }
      if (action.payload.user) {
        state.user = action.payload.user;
        localStorage.setItem('userData', JSON.stringify(action.payload.user));
      }
    },
    resetAuth: (state) => {
      state.loading = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        localStorage.setItem('userData', JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload || { message: 'Login failed' };
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userData');
      })
      // Get Current User
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload || { message: 'Failed to get user' };
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userData');
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = null;
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userData');
      });
  },
});

// Export actions
export const { loginSuccess, resetAuth, clearError, updateUser } = authSlice.actions;

// Selectors
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;
export const selectToken = (state) => state.auth.token;

export default authSlice.reducer;