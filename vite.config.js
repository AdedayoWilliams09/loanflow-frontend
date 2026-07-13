// FILE: frontend/vite.config.js


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Add Tailwind CSS plugin
  ],
  server: {
    port: 5173,
    open: true, // Auto-open browser
  },
})