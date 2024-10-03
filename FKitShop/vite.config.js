import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(
  {
    server: {
      host: "0.0.0.0",
      fs: {
        strict: false,
      },
      proxy: {
        '/api': {
          target: 'http://localhost:8088',
          changeOrigin: true,
        },
      },
    },
    plugins: [react()],
  },
  {
    plugins: [vue()],
    server: {
      port: 3000,
    },
  },
)
