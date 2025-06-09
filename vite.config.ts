import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  root: './apps/web',
  build: {
    outDir: '../../dist/web',
  },
  server: {
    port: 5173,
    host: true,
  },
})
