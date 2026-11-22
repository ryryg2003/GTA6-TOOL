import { Link } from 'react-router-dom';

export const SECTIONS = [
  { to: '/map', label: 'Map', hint: 'Pins for collectibles, stores, safes' },
  { to: '/progress', label: 'Progress Tracker', hint: 'What you have left' },
  { to: '/weapons', label: 'Weapons', hint: 'Stats, compare, where to get' },
  { to: '/vehicles', label: 'Cars', hint: 'Speed, handling, where to find' },
  { to: '/missions', label: 'Missions & Guides', hint: 'Walkthroughs and missables' },
];

export default function Home() {
  return (
    <main className="page">
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
    </main>
  );
}
