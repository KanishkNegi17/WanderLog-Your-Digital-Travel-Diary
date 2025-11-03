import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    proxy: {
      // Any request that starts with /api
      '/api': {
        // Will be proxied to your backend server
        target: 'http://localhost:3000',
        changeOrigin: true, // Recommended
        secure: false,      // Recommended
      },
    },
  },
})
