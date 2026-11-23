/** Data names icons with short words; the map shows a symbol. Emoji in the data are used as-is. */
const ICONS: Record<string, string> = {
  pill: '💊', card: '🃏', cash: '💰', bag: '🛍️', spray: '🎨', wrench: '🔧', garage: '🅿️', lock: '🔐',
  gun: '🔫', fuel: '⛽', shirt: '👕', star: '⭐', ramp: '🏁', crosshair: '🎯', eye: '👁️', alert: '❗',
  car: '🚗', flag: '🚩',
};

export function iconFor(icon: string | undefined): string {
  if (!icon) return '📍';
  if (ICONS[icon]) return ICONS[icon];
  return /^[a-z0-9-]+$/i.test(icon) ? '📍' : icon;
}
