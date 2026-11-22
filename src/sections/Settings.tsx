import { useState } from 'react';
import { useProgress } from '../progress/store';

function readText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = () => reject(r.error);
    r.readAsText(file);
  });
}

export default function Settings() {
  const p = useProgress();
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const doExport = () => {
    const json = p.exportBackup();
    const blob = new Blob([json], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `gta6-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    setMsg({ ok: true, text: 'Backup saved. Keep the file somewhere safe (Files app, Google Drive, email it to yourself).' });
  };

  const doImport = async (file: File | undefined) => {
    if (!file) return;
    let text: string;
    try { text = await readText(file); } catch { setMsg({ ok: false, text: 'Could not read that file.' }); return; }
    const r = p.importBackup(text);
    setMsg(r.ok ? { ok: true, text: 'Progress restored.' } : { ok: false, text: r.error });
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
          <input type="file" accept="application/json,.json" onChange={(e) => doImport(e.target.files?.[0])} />
        </label>
      </div>
      {msg && <p role={msg.ok ? 'status' : 'alert'} className={msg.ok ? 'ok-box' : 'warn-box'}>{msg.text}</p>}
    </main>
  );
}
