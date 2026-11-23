import { render } from '@testing-library/react';
import { vi } from 'vitest';

const flyTo = vi.fn();
const fakeMap = { flyTo, getZoom: () => 0 };
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
