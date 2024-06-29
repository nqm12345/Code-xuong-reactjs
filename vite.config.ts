import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config(); // Load các biến môi trường từ file .env

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173
  },
  css: {
    devSourcemap: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  define: {
    // Inject các biến môi trường vào code của bạn
    'process.env.REACT_APP_CLOUDINARY_URL': JSON.stringify(process.env.REACT_APP_CLOUDINARY_URL),
    'process.env.REACT_APP_UPLOAD_PRESET': JSON.stringify(process.env.REACT_APP_UPLOAD_PRESET)
  }
});
