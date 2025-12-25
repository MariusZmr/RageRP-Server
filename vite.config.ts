import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
  ],
  root: 'src/web',
  base: './',
  build: {
    outDir: '../../client_packages/ui',
    emptyOutDir: true,
    target: 'es2020',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/web'),
    },
  },
});
