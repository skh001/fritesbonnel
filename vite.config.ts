import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/fritesbonnel/', // <--- C'est la ligne la plus importante.
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});