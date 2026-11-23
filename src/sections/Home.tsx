import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getChangelog, getSection } from '../data/load';
import { usePins } from '../data/pins';
import { needsBackupReminder, useProgress } from '../progress/store';
import Icon from '../ui/Icon';
import { niceDate } from '../ui/EntryMeta';
import { newSince, nextStoryMission, readLastSeen, ring, writeLastSeen } from './home/homeLogic';

function daysSince(iso: string | null, now: Date): number | null {
  if (!iso) return null;
  const t = new Date(iso.length === 10 ? iso + 'T00:00:00' : iso).getTime();
  return Number.isNaN(t) ? null : Math.floor((now.getTime() - t) / 86_400_000);
}

export default function Home() {
  const p = useProgress();
  const navigate = useNavigate();
  const pins = usePins();
  const [q, setQ] = useState('');
  // Read the old marker once, then mark everything as seen for next time.
  const [news] = useState(() => newSince(getChangelog(), readLastSeen()));
  useEffect(() => { if (news.latest) writeLastSeen(news.latest); }, [news.latest]);

  const missions = getSection('missions');
  const story = useMemo(() => missions.filter((m) => m.type === 'story'), [missions]);
  const storyDone = story.filter((m) => p.isDone(m.id)).length;
  const next = nextStoryMission(missions, p.isDone);
  const r = ring(storyDone, story.length);
  const weapons = getSection('weapons').length, cars = getSection('vehicles').length;
  const trophies = getSection('trophies');
  const side = missions.length - story.length;
  const placed = pins ? pins.filter((x) => x.location_precision !== 'unknown').length : null;
  const backupAge = daysSince(p.state.lastBackup ?? null, new Date());

  const sections = [
    { to: '/map', label: 'Map', meta: placed === null ? 'Loading pins…' : `${placed.toLocaleString('en-US')} pins · ${(pins!.length - placed)} to place` },
    { to: '/weapons', label: 'Weapons', meta: `${weapons} · compare any two` },
    { to: '/missions', label: 'Missions & Guides', meta: `${story.length} story · ${side} side` },
    { to: '/vehicles', label: 'Cars', meta: `${cars} · menu ratings` },
    { to: '/progress', label: 'Progress Tracker', meta: `${trophies.length} trophies · checklists` },
    { to: '/search', label: 'Search', meta: 'Guns, cars, missions, pins' },
  ];

  return (
    <main className="page">
      <header className="home-head">
        <span className="brand">GTA6 Book</span>
        <Link to="/settings" className="icon-btn" aria-label="Settings and backup"><Icon name="settings" /></Link>
      </header>
      <form role="search" onSubmit={(e) => { e.preventDefault(); navigate(`/search?q=${encodeURIComponent(q)}`); }}>
        <label className="field">
          <Icon name="search" size={18} />
          <input type="search" placeholder="Search…" aria-label="Search everything" value={q}
            onChange={(e) => { setQ(e.target.value); if (e.target.value.trim()) navigate(`/search?q=${encodeURIComponent(e.target.value)}`); }} />
        </label>
      </form>

      {p.corrupt && <p className="warn-box">Saved progress was damaged and couldn't be loaded. If you have a backup, <Link to="/settings">restore it in Settings</Link>.</p>}
      {!p.storageOk && <p className="warn-box">Progress can't be saved in this browser. Checkmarks will be lost when you close it.</p>}

      {next ? (
        <Link to={`/missions/${next.id}`} className="card next-card" aria-label={`Next story mission: ${next.name}`}>
          <svg className="ring" width="64" height="64" viewBox="0 0 64 64" aria-hidden="true">
            <circle cx="32" cy="32" r="26" fill="none" stroke="var(--border)" strokeWidth="7" />
            <circle cx="32" cy="32" r="26" fill="none" stroke="var(--accent)" strokeWidth="7" strokeLinecap="round" strokeDasharray={r.dash} transform="rotate(-90 32 32)" />
            <text x="32" y="37" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text)">{r.pct}%</text>
          </svg>
          <span className="body">
            <span className="muted small">Next story mission</span>
            <span className="title">{next.order !== null ? `${next.order} · ` : ''}{next.name}</span>
            <span className="muted small">{next.chapter != null ? (next.chapter === 0 ? 'Prologue · ' : `Chapter ${next.chapter} · `) : ''}{storyDone} of {story.length} story done</span>
          </span>
          <Icon name="chevron" className="chev" />
        </Link>
      ) : story.length > 0 && <p className="ok-box">Story complete. Nice.</p>}

      {news.items.length > 0 && (
        <section className="card accent new-strip" aria-label="New since your last visit">
          <div className="head">
            <strong>{news.since ? 'New since your last visit' : 'Latest update'}</strong>
            {news.date && <span className="small" style={{ color: '#C9B98F' }}>Research run · {niceDate(news.date)}</span>}
          </div>
          <ul className="pills">{news.items.slice(0, 6).map((t) => <li key={t}>{t}</li>)}</ul>
        </section>
      )}

      <nav aria-label="Sections">
        <ul className="grid2">
          {sections.map((s) => (
            <li key={s.to}>
              <Link to={s.to} className="tile">
                <span className="tile-label">{s.label}</span>
                <span className="tile-meta">{s.meta}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="backup-row">
        <Icon name="download" size={18} />
        <span>
          {p.storageOk && needsBackupReminder(p.state, new Date())
            ? 'Back up your progress so a cleared browser can\'t wipe it.'
            : p.state.lastBackup ? `Last backup ${backupAge === 0 ? 'today' : `${backupAge} days ago`}` : 'No backup yet'}
        </span>
        <Link to="/settings">Back up</Link>
      </div>
    </main>
  );
}
