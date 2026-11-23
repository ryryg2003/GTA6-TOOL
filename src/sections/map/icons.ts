import type { Category } from '../../data/schema';

/** Stroke-SVG glyphs for map pins (24x24 paths). No emoji: they render differently on every phone. */
export const GLYPHS: Record<string, string> = {
  pin: '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  cash: '<rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/>',
  pill: '<path d="M10.5 3.5a5 5 0 0 1 7 7l-7 7a5 5 0 0 1-7-7z"/><path d="m8.5 8.5 7 7"/>',
  card: '<rect x="6" y="3" width="12" height="18" rx="2"/><path d="M9 8h6"/>',
  gun: '<path d="M3 8h16l2 2v2h-8l-1 3H8l-1 4H4l1-6H3z"/>',
  wrench: '<path d="M14.5 6a4 4 0 0 0 4.9 5L21 12.6 12.6 21 11 19.4A4 4 0 0 0 6 14.5l-3-3L6 8.5z"/>',
  car: '<path d="M5 16h14v-4l-2-5H7l-2 5z"/><circle cx="8" cy="16.5" r="1.5"/><circle cx="16" cy="16.5" r="1.5"/>',
  star: '<path d="m12 3 2.8 5.8 6.2.9-4.5 4.4 1 6.3L12 17.5 6.5 20.4l1-6.3L3 9.7l6.2-.9z"/>',
  eye: '<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  flag: '<path d="M5 21V4"/><path d="M5 4h11l-2 4 2 4H5"/>',
  bag: '<path d="M5 8h14l-1 12H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
  target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/>',
  camera: '<rect x="3" y="7" width="18" height="13" rx="2"/><circle cx="12" cy="13.5" r="3.5"/><path d="M9 7l1.5-3h3L15 7"/>',
  home: '<path d="M4 11 12 4l8 7v9H4z"/><path d="M10 20v-5h4v5"/>',
  food: '<path d="M7 3v8a2 2 0 0 0 4 0V3"/><path d="M9 11v10"/><path d="M16 3c-1.5 2-2 4-2 7h3v11"/>',
  water: '<path d="M2 15c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 5-2"/><path d="M2 9c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 5-2"/>',
  alert: '<path d="M12 3 2 20h20L12 3z"/><path d="M12 10v4"/><path d="M12 17h.01"/>',
};

/** Keyword (in a category's id, label or icon name) → glyph. First match wins. */
const RULES: [RegExp, string][] = [
  [/safe|lock|code/, 'lock'], [/money|cash|atm|bank|payday|fleeca/, 'cash'], [/drug|pill/, 'pill'],
  [/card|book|magazine/, 'card'], [/weapon|ammu|gun|knife|range|hunting/, 'gun'], [/mechanic|wrench|paint|spray|mod/, 'wrench'],
  [/vehicle|car|garage|waink|transport|race/, 'car'], [/stunt|jump|basejump|ramp/, 'flag'], [/secret|eye|alien|ufo/, 'eye'],
  [/store|shop|cloth|bag|fence/, 'bag'], [/photo|camera|drone|mural|street/, 'camera'], [/safehouse|house|hotel|property/, 'home'],
  [/food|drink|restaurant/, 'food'], [/underwater|fishing|water|treasure|bottle/, 'water'], [/random|event|alert|gang/, 'alert'],
  [/collect|star|meteorite|flamingo|meditation/, 'star'], [/activity|target|hoop|arcade|bret/, 'target'],
];

export function glyphFor(cat: Pick<Category, 'id' | 'label' | 'icon'> | undefined): string {
  if (!cat) return 'pin';
  const hay = `${cat.id} ${cat.label} ${cat.icon}`.toLowerCase();
  return RULES.find(([re]) => re.test(hay))?.[1] ?? 'pin';
}

/** SVG markup for Leaflet's HTML pin icons. */
export function glyphSvg(cat: Pick<Category, 'id' | 'label' | 'icon'> | undefined, size = 18): string {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${GLYPHS[glyphFor(cat)]}</svg>`;
}
