# LoanFlow Frontend

## Project Description

This is the frontend foundation for LoanFlow - a fintech loan management platform. It provides a responsive, modern UI with:

- React 19 with Vite for fast development
- Tailwind CSS 4.2.1+ for styling
- Redux Toolkit for state management
- Axios for API communication
- Minimal foundation with connection testing

---

## Setup Instructions

### Prerequisites

Before you begin, make sure you have:

- Node.js 22 LTS or higher
  - Check your version: `node -v`
  - If you don't have it, download from: https://nodejs.org/
- The backend server running (see backend README)

### Installation

```bash
# Clone the repository (if using Git)
git clone <your-frontend-repo-url>
cd frontend

# Install dependencies
npm install

# Create environment file from example
cp .env.example .env

# Edit .env with your values (see below)

### Environment Variables

Create a .env file in the root directory with these variables:

Variable	        Example               	Purpose
VITE_API_URL	http://localhost:5000	Backend API URL
```

### Running the Development Server

#Start the dev server
npm run dev

# Or with specific port
npm run dev -- --port 5173

### Building for Production

#Build the project
npm run build

#Preview the build
npm run preview

### Verification
Once the server is running, you should see:

VITE v7.3.1  ready in 300 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose

### Testing Backend Connection
#Using the UI

- Open your browser to http://localhost:5173

- Click the "Test Backend Connection" button

- Watch the status change from "Ready to test" to "Testing connection..." to "Connected!" or "Failed to connect"

- Check the browser console (F12) for detailed logs

### Expected Console Logs
Success:

 Test button clicked - sending request to backend...
 Testing backend connection...
 Request: { method: 'GET', url: '/api/test', baseURL: 'http://localhost:5000' }
 Response: { status: 200, data: { ... } }
 Backend connection test successful!
 Response data: { success: true, message: "API connection successful", ... }

 ### Failure (Backend not running):

  Test button clicked - sending request to backend...
 Testing backend connection...
 Request: { method: 'GET', url: '/api/test', baseURL: 'http://localhost:5000' }
 Network Error: { message: 'No response received from server' }
 Suggestions:
   1. Check if the backend server is running
   2. Verify the API URL in .env file
   3. Check your network connection
   4. Check if CORS is properly configured
 Backend connection test failed!
 Error details: { status: 0, message: 'Network error - Could not reach server' }

 ### Folder Structure

 frontend/
├── src/
│   ├── store/
│   │   ├── apiSlice.js      # API state management
│   │   └── store.js         # Redux store configuration
│   ├── utils/
│   │   └── axiosConfig.js   # Axios instance with interceptors
│   ├── App.jsx              # Main component (heading + test button)
│   ├── main.jsx             # Entry point with Redux Provider
│   └── index.css            # Tailwind CSS import
├── .env.example             # Environment variables template
├── .gitignore               # Git ignore file
├── index.html               # HTML template
├── vite.config.js           # Vite configuration
├── package.json             # Dependencies and scripts
└── README.md                # This file

### Troubleshooting
#Backend Connection Failed

Symptoms:

- Button shows "Failed to connect"

- Console shows "Network Error: No response received from server"

Solutions:

- Make sure the backend server is running:
#In the backend directory
1. npm run dev

2. Check the VITE_API_URL in .env matches the backend URL

3. Check if CORS is properly configured on the backend

4. Check your network connection

### Tailwind CSS Not Working
Symptoms:

- Styles not applying

- Classes like text-3xl don't change anything

Solutions:

- Verify tailwindcss@4.2.1 is installed

- Check vite.config.js has tailwindcss() in plugins

- Verify @import 'tailwindcss'; is at the top of index.css

- Restart the development server

### Redux State Not Updating
Symptoms:

- Status doesn't change when clicking button

- Console shows no Redux logs

Solutions:

- Check that Provider wraps App in main.jsx

- Verify the store is properly configured

- Check that useDispatch and useSelector are used correctly

- Install Redux DevTools extension for debugging

### Module Import Errors
Symptoms: Cannot find module './something.js'

Solutions:

1. Check file paths are correct

2. Make sure files exist

3. Check for typos in imports

4. Verify the file extension (.js, .jsx)

### Links
Backend README - Documentation for the backend
