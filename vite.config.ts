import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/tests/setup',
    coverage: {
      provider: 'v8',
      all: true,
      include: ['src/**/*.ts?(x)'],
    },
  },
  server: {
    open: true,
    port: 5173,
  },
});
