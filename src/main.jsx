// FILE: frontend/src/main.jsx


import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import App from './App.jsx';
import './index.css';

/**
 * Application Entry Point
 * 
 *  Child Explanation:
 * "This is where our app starts. We wrap everything in the Redux Provider
 * so all parts of the app can talk to the control room."
 * 
 *  Technical Explanation:
 * "We render the app to the DOM, wrapping it in the Redux Provider.
 * This makes the Redux store available to all components in the app."
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);