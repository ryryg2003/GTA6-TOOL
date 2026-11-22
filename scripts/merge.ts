import { existsSync, readdirSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { mergeEntries } from '../src/data/merge';
import { SECTIONS, type Base, type ChangelogEntry } from '../src/data/schema';
import { validateAll } from '../src/data/validate';
import { readAllDataFiles } from './validate';

const pretty = (x: unknown) => JSON.stringify(x, null, 2) + '\n';

/** Merge incoming/<section>.json into dataDir. Writes nothing unless the result validates. */
export function runMerge(dataDir: string, incomingDir: string, today: string): { ok: boolean; errors: string[]; summary: ChangelogEntry[] } {
  if (!existsSync(incomingDir)) return { ok: false, errors: [`${incomingDir} does not exist`], summary: [] };
  const files = readAllDataFiles(dataDir);
  const incomingNames = readdirSync(incomingDir).filter((f) => f.endsWith('.json'));
  const errors: string[] = [];
  const summary: ChangelogEntry[] = [];

  for (const f of incomingNames) {
    const section = f.replace(/\.json$/, '');
    if (!(SECTIONS as readonly string[]).includes(section)) { errors.push(`incoming/${f}: unknown section "${section}"`); continue; }
    let incoming: unknown;
    try { incoming = JSON.parse(readFileSync(join(incomingDir, f), 'utf8')); } catch (e) { errors.push(`incoming/${f}: not valid JSON (${e})`); continue; }
    if (!Array.isArray(incoming)) { errors.push(`incoming/${f}: must be a JSON array`); continue; }
    const seenIds = new Set<string>();
    const dups = (incoming as { id?: string }[]).map((x) => x?.id).filter((id): id is string => {
      if (typeof id !== 'string') return false;
      if (seenIds.has(id)) return true;
      seenIds.add(id); return false;
    });
    if (dups.length) { errors.push(`incoming/${f}: id ${[...new Set(dups)].join(', ')} appears more than once`); continue; }
    const r = mergeEntries(files[section] as Base[], incoming as Base[], today);
    files[section] = r.merged;
    summary.push({ date: today, section, added: r.added, updated: r.updated });
  }
  if (errors.length) return { ok: false, errors, summary: [] };

  files.changelog = [...(files.changelog as ChangelogEntry[]), ...summary];
  const v = validateAll(files);
  if (!v.ok) return { ok: false, errors: v.errors, summary: [] };

  for (const s of summary) writeFileSync(join(dataDir, `${s.section}.json`), pretty(files[s.section]));
  if (summary.length) writeFileSync(join(dataDir, 'changelog.json'), pretty(files.changelog));
  return { ok: true, errors: [], summary };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const incomingDir = 'research/incoming';
  const today = new Date().toISOString().slice(0, 10);
  const r = runMerge('data', incomingDir, today);
  if (!r.ok) {
    console.error('Merge refused. Nothing was written. Problems:');
    for (const e of r.errors) console.error('  - ' + e);
    process.exit(1);
  }
  for (const s of r.summary) console.log(`${s.section}: +${s.added.length} new, ${s.updated.length} updated`);
  for (const f of readdirSync(incomingDir).filter((f) => f.endsWith('.json'))) unlinkSync(join(incomingDir, f));
  console.log('Merged. Incoming files cleared.');
}
