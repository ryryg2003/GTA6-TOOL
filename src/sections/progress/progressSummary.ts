export type Group = { label: string; ids: string[] };
export type GroupSummary = { label: string; done: number; total: number; percent: number };

export function summarize(groups: Group[], isDone: (id: string) => boolean): GroupSummary[] {
  return groups.map(({ label, ids }) => {
    const done = ids.filter(isDone).length;
    const total = ids.length;
    return { label, done, total, percent: total === 0 ? 0 : Math.floor((done / total) * 100) };
  });
}
