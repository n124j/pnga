import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  server: { port: 3000, host: '0.0.0.0' },
  plugins: [react(), tailwindcss()],
  resolve: { alias: { '@': path.resolve(__dirname, '.') } },
  // Static pre-rendering: every route becomes real HTML at build time.
  ssgOptions: {
    script: 'defer',
    dirStyle: 'nested',
    formatting: 'none',
  },
});
