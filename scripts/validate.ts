import { readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { countEntries, validateAll, type DataFiles } from '../src/data/validate';

export function readAllDataFiles(dir: string): DataFiles {
  const files: DataFiles = {};
  for (const f of readdirSync(dir).filter((f) => f.endsWith('.json'))) {
    const name = f.replace(/\.json$/, '');
    try { files[name] = JSON.parse(readFileSync(join(dir, f), 'utf8')); }
    catch (e) { files[name] = { __parseError: String(e) }; }
  }
  return files;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const files = readAllDataFiles(process.argv[2] ?? 'data');
  const r = validateAll(files);
  if (!r.ok) {
    console.error(`Data invalid (${r.errors.length} problem${r.errors.length === 1 ? '' : 's'}):`);
    for (const e of r.errors) console.error('  - ' + e);
    process.exit(1);
  }
  console.log(`All data valid (${countEntries(files)} entries)`);
}
