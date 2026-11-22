import { readFileSync } from 'node:fs';

// #4 iPhone home-screen icon
test('index.html links a 180x180 PNG apple-touch-icon', () => {
  expect(readFileSync('index.html', 'utf8')).toMatch(/<link rel="apple-touch-icon" href="\/apple-touch-icon\.png"/);
  const png = readFileSync('public/apple-touch-icon.png');
  expect(png.subarray(1, 4).toString()).toBe('PNG');
  expect([png.readUInt32BE(16), png.readUInt32BE(20)]).toEqual([180, 180]);
});
