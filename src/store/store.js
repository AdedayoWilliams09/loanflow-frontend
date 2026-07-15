// FILE: frontend/src/store/store.js


import { configureStore } from '@reduxjs/toolkit';
import apiReducer from './apiSlice';
import homeReducer from './homeSlice';

/**
 * Redux Store Configuration
 * 
 *  Child Explanation:
 * "This creates the central control room where we keep all the important
 * information for our app."
 * 
 *  Technical Explanation:
 * "configureStore sets up the Redux store with the reducers and middleware.
 * In development, it also enables Redux DevTools for debugging."
 */
export const store = configureStore({
  reducer: {
    api: apiReducer,
    home: homeReducer,
    // Add more reducers here as the app grows
  },
  // Development tools
  devTools: import.meta.env.DEV,
  // Custom middleware can be added here
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for serializability checks
        ignoredActions: ['api/testConnection/pending'],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;