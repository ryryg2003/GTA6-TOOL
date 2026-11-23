export type StatSection = 'weapons' | 'vehicles';
export type StatField = { key: string; label: string; kind: 'bar' | 'number' | 'money'; unit?: string; lowerWins?: boolean; short?: string };

/** Bars are the game's own 0-10 menu ratings shown x10. They are not mph or damage per shot. */
export const STAT_FIELDS: Record<StatSection, StatField[]> = {
  weapons: [
    { key: 'damage', label: 'Damage', short: 'DMG', kind: 'bar' },
    { key: 'range', label: 'Range', short: 'RNG', kind: 'bar' },
    { key: 'accuracy', label: 'Accuracy', short: 'ACC', kind: 'bar' },
    { key: 'handling', label: 'Handling', short: 'HDL', kind: 'bar' },
    { key: 'fire_rate', label: 'Fire rate', kind: 'bar' },
    { key: 'clip_size', label: 'Clip', kind: 'number' },
    { key: 'price', label: 'Price', kind: 'money', lowerWins: true },
  ],
  vehicles: [
    { key: 'speed', label: 'Speed (menu bar)', short: 'SPD', kind: 'bar' },
    { key: 'acceleration', label: 'Acceleration', short: 'ACC', kind: 'bar' },
    { key: 'handling', label: 'Road handling', short: 'HDL', kind: 'bar' },
    { key: 'offroad_handling', label: 'Off-road handling', kind: 'bar' },
    { key: 'strength', label: 'Strength', kind: 'bar' },
    { key: 'top_speed_mph', label: 'Tested top speed', kind: 'number', unit: 'mph' },
    { key: 'seats', label: 'Seats', kind: 'number' },
    { key: 'price', label: 'Price', kind: 'money', lowerWins: true },
  ],
};

/** The bars shown as mini bars on list rows, then one extra number. */
export const ROW_FIELDS: Record<StatSection, { bars: string[]; extra: string }> = {
  weapons: { bars: ['damage', 'range'], extra: 'accuracy' },
  vehicles: { bars: ['speed', 'acceleration'], extra: 'handling' },
};
/** The three small tiles on a detail page. */
export const TILE_FIELDS: Record<StatSection, string[]> = {
  weapons: ['price', 'clip_size', 'fire_rate'],
  vehicles: ['price', 'seats', 'top_speed_mph'],
};

export const SECTION_TITLE: Record<StatSection, string> = { weapons: 'Weapons', vehicles: 'Cars' };
export const ITEM_WORD: Record<StatSection, [string, string]> = { weapons: ['weapon', 'weapons'], vehicles: ['car', 'cars'] };
export const GROUP_KEY: Record<StatSection, string> = { weapons: 'category', vehicles: 'class' };
export const fieldOf = (s: StatSection, key: string) => STAT_FIELDS[s].find((f) => f.key === key);

export function formatStat(f: StatField, v: unknown): string {
  if (v === null || v === undefined) return 'Unknown';
  if (f.kind === 'money') return Number(v) === 0 ? 'Free' : '$' + Number(v).toLocaleString('en-US');
  return f.unit ? `${v} ${f.unit}` : String(v);
}

/** Which side wins a stat. Null when either is unknown or they tie. */
export function winner(f: StatField, a: unknown, b: unknown): 'a' | 'b' | null {
  if (typeof a !== 'number' || typeof b !== 'number' || a === b) return null;
  return (f.lowerWins ? a < b : a > b) ? 'a' : 'b';
}
