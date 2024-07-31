/// <reference types="vitest" />

import { defineConfig, mergeConfig } from 'vite';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      setupFiles: ['./vitest.setup.ts'],
      coverage: {
        reporter: ['text', 'html'],
        all: true,
        include: ['src/**/*.{ts,tsx}'],
      },
    },
  }),
);
