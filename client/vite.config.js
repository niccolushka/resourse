import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Конфигурация Vite для фронтенда портала по майнингу
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
});
