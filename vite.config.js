import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  base: '/Giga-Arena/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    // vendor-three (Three.js + R3F + postprocessing ~940KB) is lazy-loaded
    // via Scene3D — never blocks first paint. Limit raised to suppress noise.
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react':  ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-three':  ['three', '@react-three/fiber', '@react-three/postprocessing', 'postprocessing'],
        },
      },
    },
  },
})
