/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { fileURLToPath } from 'node:url';

const dir = (p: string) => fileURLToPath(new URL(p, import.meta.url));

export default defineConfig({
  resolve: { alias: { '@data': dir('./data') } },
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
        icons: [
          { src: 'icon.svg', sizes: 'any', type: 'image/svg+xml' },
          { src: 'apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,json}'],
        // The app bundles all GTA data (~2.4 MB, ~300 KB compressed); keep it cached for offline use.
        maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
        // Keep map tiles and screenshots you've viewed, so the map works with no signal.
        runtimeCaching: [{
          urlPattern: /^https:\/\/fbritoferreira\.github\.io\/gta6\/(tiles|screenshots)\//,
          handler: 'CacheFirst',
          options: { cacheName: 'open-gta6-map', expiration: { maxEntries: 3000, maxAgeSeconds: 60 * 60 * 24 * 60 }, cacheableResponse: { statuses: [0, 200] } },
        }],
      },
    }),
  ],
  test: {
    // App code reads @data. Tests point it at fixed fixtures so research rewriting data/ can't break them.
    alias: { '@data': dir('./tests/fixtures/data') },
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
  },
});
