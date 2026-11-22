import { cpSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { mergeEntries } from '../../src/data/merge';
import { runMerge } from '../../scripts/merge';

const e = (id: string, over: Record<string, unknown> = {}) => ({
  id, name: id, section: 'weapons', summary: 's', confidence: 'likely',
  sources: [{ url: 'https://a.example/x', title: 'A', accessed: '2026-11-01' }], last_verified: '2026-11-01', ...over,
}) as any;

test('new id is added', () => {
  const r = mergeEntries([e('a')], [e('b')], '2026-11-22');
  expect(r.added).toEqual(['b']);
  expect(r.merged.map((x) => x.id)).toEqual(['a', 'b']);
});

test('same id is updated and new values win', () => {
  const r = mergeEntries([e('a', { summary: 'old' })], [e('a', { summary: 'new' })], '2026-11-22');
  expect(r.updated).toEqual(['a']);
  expect(r.merged[0].summary).toBe('new');
  expect(r.merged[0].last_verified).toBe('2026-11-22');
});

test('existing entries not in incoming are kept untouched', () => {
  const r = mergeEntries([e('a'), e('z')], [e('a')], '2026-11-22');
  expect(r.merged.find((x) => x.id === 'z')!.last_verified).toBe('2026-11-01');
});

test('duplicate source urls collapse to one', () => {
  const r = mergeEntries([e('a')], [e('a', { sources: [
    { url: 'https://a.example/x', title: 'A', accessed: '2026-11-22' },
    { url: 'https://b.example/y', title: 'B', accessed: '2026-11-22' },
  ] })], '2026-11-22');
  expect(r.merged[0].sources.map((s: any) => s.url)).toEqual(['https://a.example/x', 'https://b.example/y']);
});

function sandbox() {
  const root = mkdtempSync(join(tmpdir(), 'merge-'));
  cpSync('data', join(root, 'data'), { recursive: true });
  mkdirSync(join(root, 'incoming'));
  return root;
}

test('runMerge merges incoming files and appends a changelog entry', () => {
  const root = sandbox();
  const sample = JSON.parse(readFileSync('data/weapons.json', 'utf8'))[0];
  writeFileSync(join(root, 'incoming', 'weapons.json'), JSON.stringify([{ ...sample, id: 'weapon-new-one', name: 'New One' }]));
  const r = runMerge(join(root, 'data'), join(root, 'incoming'), '2026-11-22');
  expect(r.ok).toBe(true);
  const weapons = JSON.parse(readFileSync(join(root, 'data', 'weapons.json'), 'utf8'));
  expect(weapons.some((w: any) => w.id === 'weapon-new-one')).toBe(true);
  const log = JSON.parse(readFileSync(join(root, 'data', 'changelog.json'), 'utf8'));
  expect(log.at(-1)).toEqual({ date: '2026-11-22', section: 'weapons', added: ['weapon-new-one'], updated: [] });
});

test('runMerge that would produce invalid data leaves data/ byte-for-byte unchanged', () => {
  const root = sandbox();
  const before = readFileSync(join(root, 'data', 'weapons.json'), 'utf8');
  const beforeLog = readFileSync(join(root, 'data', 'changelog.json'), 'utf8');
  writeFileSync(join(root, 'incoming', 'weapons.json'), JSON.stringify([e('weapon-bad', { confidence: 'rumor' })]));
  const r = runMerge(join(root, 'data'), join(root, 'incoming'), '2026-11-22');
  expect(r.ok).toBe(false);
  expect(readFileSync(join(root, 'data', 'weapons.json'), 'utf8')).toBe(before);
  expect(readFileSync(join(root, 'data', 'changelog.json'), 'utf8')).toBe(beforeLog);
});

test('runMerge rejects an incoming file for an unknown section', () => {
  const root = sandbox();
  writeFileSync(join(root, 'incoming', 'unicorns.json'), '[]');
  expect(runMerge(join(root, 'data'), join(root, 'incoming'), '2026-11-22').ok).toBe(false);
});

test('real incoming entries remove that section\'s SAMPLE placeholders', () => {
  const r = mergeEntries([e('old-sample', { summary: 'SAMPLE: x' }), e('keep')], [e('real')], '2026-11-22');
  expect(r.merged.map((x) => x.id)).toEqual(['keep', 'real']);
});

test('an empty incoming list leaves samples alone', () => {
  const r = mergeEntries([e('old-sample', { summary: 'SAMPLE: x' })], [], '2026-11-22');
  expect(r.merged).toHaveLength(1);
});

test('runMerge rejects an incoming file that repeats an id', () => {
  const root = sandbox();
  const sample = JSON.parse(readFileSync('data/weapons.json', 'utf8'))[0];
  writeFileSync(join(root, 'incoming', 'weapons.json'), JSON.stringify([{ ...sample, id: 'weapon-dup' }, { ...sample, id: 'weapon-dup', name: 'Other' }]));
  const r = runMerge(join(root, 'data'), join(root, 'incoming'), '2026-11-22');
  expect(r.ok).toBe(false);
  expect(r.errors.join('\n')).toContain('weapon-dup');
});

test('an update that omits optional fields keeps the existing details and image', () => {
  const r = mergeEntries([e('a', { details: 'Sources disagree on damage', image: '/x.png' })], [e('a', { summary: 'new' })], '2026-11-22');
  expect(r.merged[0].details).toBe('Sources disagree on damage');
  expect(r.merged[0].image).toBe('/x.png');
  expect(r.merged[0].summary).toBe('new');
});
