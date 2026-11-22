import type { Base, Confidence, Source } from './schema';

const RANK: Record<Confidence, number> = { unverified: 0, likely: 1, confirmed: 2 };

/** Overlay incoming onto prev without losing knowledge: null/missing never erases a known value. */
function combine<T extends Base>(prev: T, inc: T): T {
  const out: Record<string, unknown> = { ...prev };
  for (const [k, v] of Object.entries(inc)) if (v !== null && v !== undefined) out[k] = v;
  const prevUrls = new Set(prev.sources.map((s) => s.url));
  const bringsNewSources = inc.sources.some((s) => !prevUrls.has(s.url));
  if (!bringsNewSources && RANK[inc.confidence] < RANK[prev.confidence]) out.confidence = prev.confidence;
  return out as T;
}

export function mergeEntries<T extends Base>(existing: T[], incoming: T[], today: string): { merged: T[]; added: string[]; updated: string[] } {
  const keep = incoming.length > 0 ? existing.filter((e) => !e.summary.startsWith('SAMPLE:')) : existing;
  const byId = new Map(keep.map((e) => [e.id, e]));
  const added: string[] = [], updated: string[] = [];
  for (const inc of incoming) {
    const prev = byId.get(inc.id);
    const sources = new Map<string, Source>();
    for (const s of [...(prev?.sources ?? []), ...inc.sources]) sources.set(s.url, s);
    byId.set(inc.id, { ...(prev ? combine(prev, inc) : inc), sources: [...sources.values()], last_verified: today });
    (prev ? updated : added).push(inc.id);
  }
  const merged = [...byId.values()].sort((a, b) => a.id.localeCompare(b.id));
  return { merged, added, updated };
}
