import type { Base, Source } from './schema';

export function mergeEntries<T extends Base>(existing: T[], incoming: T[], today: string): { merged: T[]; added: string[]; updated: string[] } {
  const keep = incoming.length > 0 ? existing.filter((e) => !e.summary.startsWith('SAMPLE:')) : existing;
  const byId = new Map(keep.map((e) => [e.id, e]));
  const added: string[] = [], updated: string[] = [];
  for (const inc of incoming) {
    const prev = byId.get(inc.id);
    const sources = new Map<string, Source>();
    for (const s of [...(prev?.sources ?? []), ...inc.sources]) sources.set(s.url, s);
    byId.set(inc.id, { ...prev, ...inc, sources: [...sources.values()], last_verified: today } as T);
    (prev ? updated : added).push(inc.id);
  }
  const merged = [...byId.values()].sort((a, b) => a.id.localeCompare(b.id));
  return { merged, added, updated };
}
