/** The closest other entry in the same group, by the sum of bar differences. */
export function mostSimilar<T extends Record<string, unknown>>(me: T, pool: T[], groupKey: string, barKeys: string[]): T | null {
  let best: T | null = null, bestScore = Infinity;
  for (const o of pool) {
    if (o.id === me.id || o[groupKey] !== me[groupKey]) continue;
    let score = 0, shared = 0;
    for (const k of barKeys) {
      const a = me[k], b = o[k];
      if (typeof a === 'number' && typeof b === 'number') { score += Math.abs(a - b); shared++; }
    }
    if (shared === 0) continue;
    score = score / shared;
    if (score < bestScore) { best = o; bestScore = score; }
  }
  return best;
}
