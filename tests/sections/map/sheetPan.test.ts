import { centerOffsetY, panCenterFor, pinScreenY, PIN_TOP_FRACTION } from '../../../src/sections/map/sheetPan';

test('on an 844px-tall map the center sits 127px below the pin', () => {
  expect(centerOffsetY(844)).toBe(127);
});

test('after panning, the pin lands in the top 35%, above a sheet that covers the bottom 45%', () => {
  for (const h of [568, 667, 844, 932]) {
    const pin = { x: 500, y: 1200 };
    const c = panCenterFor(pin, h);
    expect(c.x).toBe(500);
    const y = pinScreenY(pin.y, c.y, h);
    expect(Math.abs(y - h * PIN_TOP_FRACTION)).toBeLessThanOrEqual(1);
    expect(y).toBeLessThan(h * (1 - 0.45));
  }
});

test('fraction 0.5 means no offset (plain centering)', () => {
  expect(centerOffsetY(800, 0.5)).toBe(0);
});
