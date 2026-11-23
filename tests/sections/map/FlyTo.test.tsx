import { render } from '@testing-library/react';
import { vi } from 'vitest';

const flyTo = vi.fn();
const fakeMap = {
  flyTo, getZoom: () => 0, getSize: () => ({ x: 390, y: 844 }),
  project: (ll: [number, number]) => ({ x: ll[1], y: -ll[0] }),
  unproject: (pt: { x: number; y: number }) => ({ lat: -pt.y, lng: pt.x }),
};
vi.mock('react-leaflet', () => ({ useMap: () => fakeMap }));
const { FlyTo } = await import('../../../src/sections/map/MapPage');

test('FlyTo only flies when the target position changes, not on every re-render', () => {
  const { rerender } = render(<FlyTo x={100} y={200} />);
  rerender(<FlyTo x={100} y={200} />);
  rerender(<FlyTo x={100} y={200} />);
  expect(flyTo).toHaveBeenCalledTimes(1);
  rerender(<FlyTo x={300} y={200} />);
  expect(flyTo).toHaveBeenCalledTimes(2);
});

test('FlyTo aims below the pin so the pin shows above the bottom sheet', () => {
  flyTo.mockClear();
  render(<FlyTo x={100} y={200} />);
  const [center] = flyTo.mock.calls[0];
  // pin is at y=200 in this fake projection; the center is 127px further south (lat more negative)
  expect(center).toEqual({ lat: -(200 + 127), lng: 100 });
});
