export type StatSection = 'weapons' | 'vehicles';
export type StatField = { key: string; label: string; kind: 'bar' | 'number' | 'money'; unit?: string; lowerWins?: boolean };

export const STAT_FIELDS: Record<StatSection, StatField[]> = {
  weapons: [
    { key: 'damage', label: 'Damage', kind: 'bar' },
    { key: 'fire_rate', label: 'Fire rate', kind: 'bar' },
    { key: 'range', label: 'Range', kind: 'bar' },
    { key: 'accuracy', label: 'Accuracy', kind: 'bar' },
    { key: 'clip_size', label: 'Clip size', kind: 'number' },
    { key: 'price', label: 'Price', kind: 'money', lowerWins: true },
  ],
  vehicles: [
    { key: 'top_speed_mph', label: 'Top speed', kind: 'number', unit: 'mph' },
    { key: 'acceleration', label: 'Acceleration', kind: 'bar' },
    { key: 'handling', label: 'Handling', kind: 'bar' },
    { key: 'braking', label: 'Braking', kind: 'bar' },
    { key: 'seats', label: 'Seats', kind: 'number' },
    { key: 'price', label: 'Price', kind: 'money', lowerWins: true },
  ],
};

export const SECTION_TITLE: Record<StatSection, string> = { weapons: 'Weapons', vehicles: 'Cars' };
export const GROUP_KEY: Record<StatSection, string> = { weapons: 'category', vehicles: 'class' };

export function formatStat(f: StatField, v: unknown): string {
  if (v === null || v === undefined) return 'Unknown';
  if (f.kind === 'money') return '$' + Number(v).toLocaleString('en-US');
  return f.unit ? `${v} ${f.unit}` : String(v);
}
