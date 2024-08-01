import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest-setup.ts'],
    alias: { '@/': new URL('./src/', import.meta.url).pathname },

    coverage: {
      provider: 'v8',
      all: true,
      include: ['src/**/*.ts?(x)'],
      // exclude: ['**/_app.tsx', '**/_document.tsx'],
    },
  },
});
