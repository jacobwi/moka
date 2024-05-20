import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        tailwindcss(path.resolve(__dirname, '../tailwind.config.js')),
        autoprefixer,
      ],
    },
  },
  resolve: {
    alias: {
      shared: path.resolve(__dirname, '../shared/src'), // Adjust the path as needed
    },
  },
})
