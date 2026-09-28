import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173
  },
  define: {
    'process.env.IS_VERCEL': JSON.stringify(process.env.VERCEL || process.env.VERCEL_URL || process.env.VERCEL_ENV ? '1' : '0')
  }
})
