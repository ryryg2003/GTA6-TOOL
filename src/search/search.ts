import Fuse from 'fuse.js';
import { allEntries } from '../data/load';
import type { AnyEntry } from '../data/schema';

const fuse = new Fuse(allEntries, {
  keys: [{ name: 'name', weight: 3 }, { name: 'summary', weight: 1 }, { name: 'section', weight: 0.5 }],
  threshold: 0.4,
  ignoreLocation: true,
});

export function search(query: string, limit = 20): AnyEntry[] {
  const q = query.trim();
  if (!q) return [];
  return fuse.search(q, { limit }).map((r) => r.item);
}
