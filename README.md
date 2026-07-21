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
git clone https://github.com/AdedayoWilliams09/loanflow-frontend
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



## Homepage Implementation

### New Page/Feature
- **Homepage** (`/`) - Complete marketing page with all sections

### New Components Created
| Component | Purpose |
|-----------|---------|
| `Button` | Reusable button with variants and sizes |
| `Logo` | Brand logo with dark/light variants |
| `ThemeToggle` | Light/dark mode toggle |
| `StatsCard` | Animated statistics card |
| `FeatureCard` | Feature display card |
| `LoanProductCard` | Loan product display card |
| `TestimonialCard` | Customer testimonial card |
| `FAQItem` | Accordion-style FAQ item |
| `SEO` | Meta tags and structured data |

### New Redux Slices
- **homeSlice**: Manages homepage data state
  - `fetchHomepageData`: Fetches all homepage data from API
  - Selectors: `selectHero`, `selectStats`, `selectFeatures`, etc.

### New Environment Variables
None added in this phase

### New Dependencies Installed
| Package | Version | Purpose |
|---------|---------|---------|
| react-router-dom | 7.0.0 | Routing |
| framer-motion | 12.0.0 | Animations |
| @heroicons/react | 2.1.5 | Icons |
| react-hot-toast | 2.4.1 | Notifications |
| react-helmet-async | 2.0.5 | SEO |

### Deployment
- **Vercel URL**: https://loanflow-frontend.vercel.app
- **Environment Variables**:
  - `VITE_API_URL`: https://loanflow-backend.onrender.com



### API Documentation
- **Swagger UI**: [Link to Swagger Docs](https://app.swaggerhub.com/apis-docs/tekfaktory/LOANFLOW/1.1.0?view=uiDocs)
- **Postman Collection**: [Link to Postman Docs](https://documenter.getpostman.com/view/40443004/2sBY4LShkX)



## Phase 2: About Page Implementation

### New Page/Feature
- **About Page** (`/about`) - Company story, mission, values, and team

### New Components Created
| Component | Purpose |
|-----------|---------|
| `AboutHero` | Hero section with mission statement |
| `OurStory` | Company story and founder photos |
| `MissionValues` | Mission statement and core values |
| `TeamSection` | Leadership team display |
| `WhyChooseUs` | Key differentiators and benefits |

### New Redux Slices
- **aboutSlice**: Manages About page data state
  - `fetchAboutPageData`: Fetches about settings and team members
  - Selectors: `selectAboutSettings`, `selectTeamMembers`

### New Environment Variables
None added in this phase

### New Dependencies Installed
None - using existing dependencies

### Deployment
- **Vercel URL**: https://loanflow-frontend.vercel.app
- **About Page**: https://loanflow-frontend.vercel.app/about



## Phase 3: Loan Products Page Implementation

### New Page/Feature
- **Loan Products Page** (`/loan-products`) - Browse and filter loan products

### New Components Created
| Component | Purpose |
|-----------|---------|
| `PageHeader` | Page title and subtitle |
| `FilterBar` | Product filtering controls |
| `ProductGrid` | Grid layout for products |
| `Pagination` | Page navigation |
| `CTASection` | Call-to-action section |

### New Redux Slices
- **productsSlice**: Manages loan products state
  - `fetchProducts`: Fetches products with filters and pagination
  - `fetchProductTypes`: Fetches product types for dropdown
  - Selectors: `selectProducts`, `selectProductTypes`, `selectPagination`, `selectFilters`

### New Environment Variables
None added in this phase

### New Dependencies Installed
None - using existing dependencies

### Deployment
- **Vercel URL**: https://loanflow-frontend.vercel.app
- **Loan Products Page**: https://loanflow-frontend.vercel.app/loan-products

### Known Issues/Limitations
- Product Detail Page not yet implemented (coming in next phase)
- URL query params not yet synced with filters (coming in Phase 3.5)
- Admin panel for product management not yet available (coming in Phase 5)

### API Documentation
- **Swagger UI**: https://[your-username].github.io/loanflow-backend
- **Postman Collection**: [Link to Postman Docs]



## Phase 4: FAQ Page Implementation

### New Page/Feature
- **FAQ Page** (`/faq`) - Frequently Asked Questions with categories and search

### New Components Created
| Component | Purpose |
|-----------|---------|
| `PageHeader` | Page title and subtitle |
| `CategoryFilter` | Category filter pills |
| `SearchBar` | Search input with debounce |
| `FAQAccordion` | Accordion with expand/collapse |
| `ContactCTA` | Support contact section |

### New Redux Slices
- **faqSlice**: Manages FAQ state
  - `fetchFAQs`: Fetches FAQs with category and search filters
  - `fetchFAQCategories`: Fetches categories for filter pills
  - Selectors: `selectFAQs`, `selectFAQCategories`, `selectActiveCategory`, `selectSearchTerm`

### New Environment Variables
None added in this phase

### New Dependencies Installed
None - using existing dependencies

### Deployment
- **Vercel URL**: https://loanflow-frontend.vercel.app
- **FAQ Page**: https://loanflow-frontend.vercel.app/faq



## Phase 5: Contact Page Implementation

### New Page/Feature
- **Contact Page** (`/contact`) - Contact form with email notification

### New Components Created
| Component | Purpose |
|-----------|---------|
| `PageHeader` | Page title and subtitle |
| `ContactForm` | Contact form with validation |
| `ContactInfo` | Contact information cards |
| `LocationMap` | Google Maps embed |

### New Redux Slices
- **contactSlice**: Manages contact form state
  - `submitContact`: Submits contact form
  - Selectors: `selectContactLoading`, `selectContactError`, `selectSubmissionStatus`

### New Environment Variables
None added in this phase (backend uses Gmail OAuth2)

### New Dependencies Installed
| Package | Version | Purpose |
|---------|---------|---------|
| react-hook-form | Latest | Form handling and validation |

### Deployment
- **Vercel URL**: https://loanflow-frontend.vercel.app
- **Contact Page**: https://loanflow-frontend.vercel.app/contact




### Links
- [Backend README](https://github.com/AdedayoWilliams09/loanflow-backend) - Documentation for the backend
