import { getById } from '../src/data/load';

test('app tests run against tests/fixtures/data, not the live data/ folder research rewrites', () => {
  expect(getById('vehicle-sample-stinger')?.summary).toMatch(/^FIXTURE:/);
});
