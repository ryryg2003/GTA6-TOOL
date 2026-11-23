import { GLYPHS, glyphFor, glyphSvg } from '../../../src/sections/map/icons';

const cat = (id: string, label = id, icon = 'x') => ({ id, label, icon });

test('categories get a matching stroke glyph by keyword', () => {
  expect(glyphFor(cat('safe-codes', 'Safe codes'))).toBe('lock');
  expect(glyphFor(cat('money-bags', 'Money and cash stashes'))).toBe('cash');
  expect(glyphFor(cat('drugs', 'Drug stashes'))).toBe('pill');
  expect(glyphFor(cat('stunt-jumps', 'Stunt jumps'))).toBe('flag');
});

test('unknown or missing categories fall back to a plain pin', () => {
  expect(glyphFor(cat('zzz', 'Zzz'))).toBe('pin');
  expect(glyphFor(undefined)).toBe('pin');
});

test('pins are SVG, never emoji', () => {
  const svg = glyphSvg(cat('safe-codes'));
  expect(svg).toMatch(/^<svg[^>]+stroke="currentColor"/);
  expect(svg).not.toMatch(/\p{Extended_Pictographic}/u);
  for (const g of Object.values(GLYPHS)) expect(g).not.toMatch(/\p{Extended_Pictographic}/u);
});
