import { readFileSync } from 'node:fs';

// Cloudflare runs `npx wrangler deploy`. Without a config file Wrangler tries to auto-configure
// Vite and refuses Vite 5. With this file it just uploads the built dist/ folder.
test('wrangler.jsonc serves the built dist folder as static assets', () => {
  const cfg = JSON.parse(readFileSync('wrangler.jsonc', 'utf8'));
  expect(cfg.name).toBe('gta6-tool');
  expect(cfg.assets.directory).toBe('./dist');
  expect(cfg.compatibility_date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
});
