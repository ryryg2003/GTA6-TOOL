import { lazy, Suspense } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './sections/Home';
import SearchPage from './sections/SearchPage';
import StatList from './sections/stats/StatList';
import StatDetail from './sections/stats/StatDetail';
import Compare from './sections/stats/Compare';
import Settings from './sections/Settings';
import MissionList from './sections/missions/MissionList';
import MissionDetail from './sections/missions/MissionDetail';
import ProgressPage from './sections/progress/ProgressPage';
import TrophyDetail from './sections/trophies/TrophyDetail';
import PageHeader from './ui/PageHeader';

/** The map (Leaflet + map code) loads only when you open it, so Home starts fast. */
const MapPage = lazy(() => import('./sections/map/MapPage'));

function ComingSoon() {
  return <main className="page"><PageHeader /><p className="muted">Coming soon.</p></main>;
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/weapons" element={<StatList section="weapons" />} />
      <Route path="/vehicles" element={<StatList section="vehicles" />} />
      <Route path="/weapons/:id" element={<StatDetail section="weapons" />} />
      <Route path="/vehicles/:id" element={<StatDetail section="vehicles" />} />
      <Route path="/compare/:section/:a/:b" element={<Compare />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/missions" element={<MissionList />} />
      <Route path="/missions/:id" element={<MissionDetail />} />
      <Route path="/progress" element={<ProgressPage />} />
      <Route path="/map" element={<Suspense fallback={<main className="page"><p className="muted">Loading map…</p></main>}><MapPage /></Suspense>} />
      <Route path="/trophies/:id" element={<TrophyDetail />} />
      <Route path="*" element={<ComingSoon />} />
    </Routes>
  );
}

export default function App() {
  return <HashRouter><AppRoutes /></HashRouter>;
}
