export type Group = { label: string; ids: string[] };
export type GroupSummary = { label: string; done: number; total: number; percent: number };

export function summarize(groups: Group[], isDone: (id: string) => boolean): GroupSummary[] {
  return groups.map(({ label, ids }) => {
    const done = ids.filter(isDone).length;
    const total = ids.length;
    return { label, done, total, percent: total === 0 ? 0 : Math.floor((done / total) * 100) };
  });
}

/** Not-yet-done missions with missable content, and trophies marked missable. */
export function missableItems<M extends { id: string; missables: string[] }, T extends { id: string; missable: boolean }>(
  missions: M[], trophies: T[], isDone: (id: string) => boolean,
): (M | T)[] {
  return [...missions.filter((m) => m.missables.length > 0 && !isDone(m.id)), ...trophies.filter((t) => t.missable && !isDone(t.id))];
}
