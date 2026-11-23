import { useState } from 'react';
import { localDay, useProgress } from '../progress/store';

function readText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = () => reject(r.error);
    r.readAsText(file);
  });
}

type Msg = { ok: boolean; text: string } | null;
type Pending = { json: string; backupDone: number; currentDone: number } | null;

export default function Settings() {
  const p = useProgress();
  const [msg, setMsg] = useState<Msg>(null);
  const [pending, setPending] = useState<Pending>(null);

  const doExport = async () => {
    const json = p.exportBackup();
    const name = `gta6-progress-${localDay(new Date())}.json`;
    const file = new File([json], name, { type: 'application/json' });
    const nav = navigator as Navigator & { canShare?: (d: ShareData) => boolean };
    if (nav.canShare?.({ files: [file] }) && nav.share) {
      // iPhone home-screen apps handle the share sheet far better than downloads.
      try {
        await nav.share({ files: [file], title: 'GTA 6 progress backup' });
        p.markBackedUp();
        setMsg({ ok: true, text: 'Backup shared. Save it to Files, Drive or email it to yourself.' });
      } catch (e) {
        const cancelled = (e as Error)?.name === 'AbortError';
        setMsg({ ok: false, text: cancelled ? 'Backup cancelled. Nothing was saved.' : 'Sharing failed. Try again.' });
      }
      return;
    }
    const a = document.createElement('a');
    a.href = URL.createObjectURL(file);
    a.download = name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    p.markBackedUp();
    setMsg({ ok: true, text: 'Backup downloaded. Keep the file somewhere safe (Files app, Google Drive, email it to yourself).' });
  };

  const pickFile = async (file: File | undefined) => {
    if (!file) return;
    setMsg(null);
    let text: string;
    try { text = await readText(file); } catch { setMsg({ ok: false, text: 'Could not read that file.' }); return; }
    const r = p.previewBackup(text);
    if (!r.ok) { setMsg({ ok: false, text: r.error }); return; }
    setPending({ json: text, backupDone: r.backupDone, currentDone: r.currentDone });
  };

  const apply = (mode: 'merge' | 'replace') => {
    if (!pending) return;
    const r = p.importBackup(pending.json, mode);
    setPending(null);
    setMsg(r.ok ? { ok: true, text: mode === 'merge' ? 'Backup merged with your progress.' : 'Progress replaced with the backup.' } : { ok: false, text: r.error });
  };

  return (
    <main className="page">
      <h1>Settings</h1>
      <h3>Progress backup</h3>
      <p className="muted">Your checkmarks live only in this browser. Clearing browser data erases them, so export a backup now and then.</p>
      {!p.storageOk && <p className="warn-box">This browser is not saving progress (private mode?). Export a backup before closing.</p>}
      <p className="muted">Last backup: {p.state.lastBackup ?? 'never'}</p>
      <div className="controls">
        <button className="primary" onClick={doExport}>Export backup</button>
        <label className="file-btn">Import backup
          <input type="file" accept="application/json,.json" onChange={(e) => { pickFile(e.target.files?.[0]); e.target.value = ''; }} />
        </label>
      </div>
      {pending && (
        <div className="warn-box" role="group" aria-label="Confirm import">
          <p>This backup has {pending.backupDone} done. You have {pending.currentDone} done now.</p>
          <p className="muted small">Merge keeps everything from both. Replace makes this device match the backup exactly.</p>
          <div className="controls">
            <button className="primary" onClick={() => apply('merge')}>Merge (keep both)</button>
            <button onClick={() => apply('replace')}>Replace mine</button>
            <button onClick={() => setPending(null)}>Cancel</button>
          </div>
        </div>
      )}
      {msg && <p role={msg.ok ? 'status' : 'alert'} className={msg.ok ? 'ok-box' : 'warn-box'}>{msg.text}</p>}
    </main>
  );
}
