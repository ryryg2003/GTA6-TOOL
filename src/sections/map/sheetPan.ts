/**
 * Keeping the selected pin visible above the bottom sheet.
 * The sheet covers up to the bottom 45% of the map, so we pan the pin to sit at about 35% from the top.
 */
export const PIN_TOP_FRACTION = 0.35;

/** How far below the pin (in screen pixels) the map's center must be, so the pin lands at `fraction` of the height. */
export function centerOffsetY(mapHeight: number, fraction = PIN_TOP_FRACTION): number {
  return Math.round(mapHeight * (0.5 - fraction));
}

/** The pixel point to center the map on, given the pin's pixel point (at the target zoom). */
export function panCenterFor(pin: { x: number; y: number }, mapHeight: number, fraction = PIN_TOP_FRACTION): { x: number; y: number } {
  return { x: pin.x, y: pin.y + centerOffsetY(mapHeight, fraction) };
}

/** Where the pin ends up on screen (from the top) when the map is centered on `center`. */
export function pinScreenY(pinY: number, centerY: number, mapHeight: number): number {
  return mapHeight / 2 + (pinY - centerY);
}
