import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/zwei-dating-app/',

  // Build optimizations for production
  build: {
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,     // Remove console.logs in production
        drop_debugger: true,    // Remove debugger statements
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],    // ~40kb gzipped
          'motion': ['framer-motion'],         // ~30kb gzipped
        },
      },
    },
    cssCodeSplit: true,  // Split CSS per component
  },

  // Asset optimization
  assetsInlineLimit: 4096,  // Inline assets < 4kb as base64

  // Dependency optimization
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion'],
  },
})
