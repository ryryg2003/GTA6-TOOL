/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'GTA 6 Info Book',
        short_name: 'GTA6 Book',
        description: 'Personal GTA 6 companion: map, progress, weapons, cars, missions.',
        theme_color: '#0e0f13',
        background_color: '#0e0f13',
        display: 'standalone',
        icons: [{ src: 'icon.svg', sizes: 'any', type: 'image/svg+xml' }],
      },
      workbox: { globPatterns: ['**/*.{js,css,html,svg,png,json}'] },
    }),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
  },
});
