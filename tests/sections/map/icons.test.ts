import { iconFor } from '../../../src/sections/map/icons';

test('icon names from the data become symbols, not words', () => {
  for (const name of ['pill', 'card', 'cash', 'bag', 'spray', 'wrench', 'garage', 'lock', 'gun', 'fuel', 'shirt', 'star', 'ramp', 'crosshair', 'eye', 'alert', 'car', 'flag']) {
    const glyph = iconFor(name);
    expect(glyph).not.toBe(name);
    expect(glyph).not.toMatch(/^[a-z]+$/);
  }
});

test('an emoji icon is kept, and an unknown name falls back to a pin', () => {
  expect(iconFor('🔐')).toBe('🔐');
  expect(iconFor('mystery-thing')).toBe('📍');
  expect(iconFor(undefined)).toBe('📍');
});
