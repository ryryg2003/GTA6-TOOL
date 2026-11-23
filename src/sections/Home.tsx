import { Link } from 'react-router-dom';
import { needsBackupReminder, useProgress } from '../progress/store';

export const SECTIONS = [
  { to: '/map', label: 'Map', hint: 'Pins for collectibles, stores, safes' },
  { to: '/progress', label: 'Progress Tracker', hint: 'What you have left' },
  { to: '/weapons', label: 'Weapons', hint: 'Stats, compare, where to get' },
  { to: '/vehicles', label: 'Cars', hint: 'Speed, handling, where to find' },
  { to: '/missions', label: 'Missions & Guides', hint: 'Walkthroughs and missables' },
];

export default function Home() {
  const p = useProgress();
  return (
    <main className="page">
      {p.corrupt && (
        <p className="warn-box">Saved progress was damaged and couldn't be loaded. If you have a backup, <Link to="/settings">restore it in Settings</Link>.</p>
      )}
      {!p.storageOk && <p className="warn-box">Progress can't be saved in this browser. Checkmarks will be lost when you close it.</p>}
      {p.storageOk && needsBackupReminder(p.state, new Date()) && (
        <p className="warn-box">It's been a while: <Link to="/settings">back up your progress</Link> so a cleared browser can't wipe it.</p>
      )}
      <ul className="section-list">
        {SECTIONS.map((s) => (
          <li key={s.to}>
            <Link to={s.to} className="section-link">
              <span className="section-label">{s.label}</span>
              <span className="section-hint">{s.hint}</span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="footer-links"><Link to="/settings">Settings &amp; backup</Link></p>
    </main>
  );
}
