import { z } from 'zod';
import { AreaSchema, CategorySchema, ChangelogEntrySchema, ENTRY_SCHEMAS, SECTIONS } from './schema';

export type DataFiles = Record<string, unknown>;

function describe(file: string, err: z.ZodError, items: unknown): string[] {
  return err.issues.map((i) => {
    const idx = typeof i.path[0] === 'number' ? i.path[0] : undefined;
    const item = Array.isArray(items) && idx !== undefined ? (items[idx] as { id?: string }) : undefined;
    const who = item?.id ? ` [${item.id}]` : idx !== undefined ? ` [#${idx}]` : '';
    return `${file}${who} ${i.path.slice(1).join('.') || i.path.join('.')}: ${i.message}`;
  });
}

/** Validate every data file. Keys are file names without ".json". */
export function validateAll(files: DataFiles): { ok: boolean; errors: string[] } {
  const errors: string[] = [];

  const check = <T extends z.ZodTypeAny>(name: string, schema: T) => {
    if (!(name in files)) { errors.push(`${name}: file missing`); return undefined; }
    const r = z.array(schema).safeParse(files[name]);
    if (!r.success) { errors.push(...describe(name, r.error, files[name])); return undefined; }
    return r.data as z.infer<T>[];
  };

  const categories = check('categories', CategorySchema);
  check('areas', AreaSchema);
  check('changelog', ChangelogEntrySchema);

  const seen = new Map<string, string>();
  for (const section of SECTIONS) {
    const entries = check(section, ENTRY_SCHEMAS[section]);
    if (!entries) continue;
    for (const e of entries) {
      const prev = seen.get(e.id);
      if (prev) errors.push(`${section} [${e.id}]: duplicate id (also in ${prev})`);
      else seen.set(e.id, section);
    }
    if (section === 'map_pins' && categories) {
      const known = new Set(categories.map((c) => c.id));
      for (const p of entries as { id: string; category: string }[]) {
        if (!known.has(p.category)) errors.push(`map_pins [${p.id}] category: "${p.category}" is not in categories.json`);
      }
    }
  }
  return { ok: errors.length === 0, errors };
}

export function countEntries(files: DataFiles): number {
  return SECTIONS.reduce((n, s) => n + (Array.isArray(files[s]) ? (files[s] as unknown[]).length : 0), 0);
}
