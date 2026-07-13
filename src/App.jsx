// FILE: frontend/src/App.jsx


import { useDispatch, useSelector } from 'react-redux';
import { testBackendConnection, selectApiStatus, selectApiData, selectApiError, selectLastTestTime } from './store/apiSlice';

function App() {
  const dispatch = useDispatch();
  const status = useSelector(selectApiStatus);
  const data = useSelector(selectApiData);
  const error = useSelector(selectApiError);
  const lastTestTime = useSelector(selectLastTestTime);

  /**
   * Handle Test Button Click
   * 
   *  Child Explanation:
   * "When you click the button, we send a messenger to check if the kitchen is open.
   * The console (developer tools) will show what happened."
   * 
   *  Technical Explanation:
   * "The handler dispatches the testBackendConnection async thunk. This triggers
   * the API call and updates the Redux state. All responses are logged to the
   * console for debugging."
   */
  const handleTestConnection = () => {
    console.log(' Test button clicked - sending request to backend...');
    dispatch(testBackendConnection());
  };

  // Helper to show status with colors
  const getStatusDisplay = () => {
    switch (status) {
      case 'idle':
        return { text: 'Ready to test', color: 'text-gray-500' };
      case 'loading':
        return { text: 'Testing connection...', color: 'text-blue-500 animate-pulse' };
      case 'succeeded':
        return { text: ' Connected!', color: 'text-green-600' };
      case 'failed':
        return { text: ' Failed to connect', color: 'text-red-600' };
      default:
        return { text: 'Unknown status', color: 'text-gray-500' };
    }
  };

  const statusDisplay = getStatusDisplay();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
          LoanFlow
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Foundation Phase
        </p>

        {/* Status Display */}
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Backend Status:
          </p>
          <p className={`font-semibold ${statusDisplay.color}`}>
            {statusDisplay.text}
          </p>
          {lastTestTime && (
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              Last tested: {new Date(lastTestTime).toLocaleString()}
            </p>
          )}
          {data && (
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              <p>✅ API Response: {data.message}</p>
            </div>
          )}
          {error && (
            <div className="mt-2 text-xs text-red-500 dark:text-red-400">
              <p>❌ Error: {error.message}</p>
              {error.status && <p>Status: {error.status}</p>}
            </div>
          )}
        </div>

        {/* Test Button */}
        <button
          onClick={handleTestConnection}
          disabled={status === 'loading'}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 min-h-[44px] min-w-[44px]"
        >
          {status === 'loading' ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Testing...
            </span>
          ) : (
            'Test Backend Connection'
          )}
        </button>

        {/* Instructions */}
        <div className="mt-6 text-xs text-gray-400 dark:text-gray-500 space-y-1">
          <p>📝 Check the browser console (F12) for detailed logs</p>
          <p>🔍 Network tab shows API requests and responses</p>
          <p>📋 Redux state updates automatically</p>
        </div>
      </div>
    </div>
  );
}

export default App;