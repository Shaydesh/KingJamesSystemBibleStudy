import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Detect if running on Replit
const isReplit = Boolean(process.env.REPL_ID);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    // Replit needs allowedHosts for its dynamic hostnames
    ...(isReplit && {
      allowedHosts: true,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    }),
  },
});
