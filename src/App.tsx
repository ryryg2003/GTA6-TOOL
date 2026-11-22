import { HashRouter, Link, Route, Routes } from 'react-router-dom';
import Home from './sections/Home';
import SearchPage from './sections/SearchPage';
import SearchBar from './ui/SearchBar';
import StatList from './sections/stats/StatList';
import StatDetail from './sections/stats/StatDetail';
import Compare from './sections/stats/Compare';

function ComingSoon() {
  return <main className="page"><p className="muted">Coming soon.</p></main>;
}

export function AppRoutes() {
  return (
    <>
      <header className="topbar">
        <Link to="/" className="brand" aria-label="Home">GTA6 Book</Link>
        <SearchBar />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/weapons" element={<StatList section="weapons" />} />
        <Route path="/vehicles" element={<StatList section="vehicles" />} />
        <Route path="/weapons/:id" element={<StatDetail section="weapons" />} />
        <Route path="/vehicles/:id" element={<StatDetail section="vehicles" />} />
        <Route path="/compare/:section/:a/:b" element={<Compare />} />
        <Route path="*" element={<ComingSoon />} />
      </Routes>
    </>
  );
}

export default function App() {
  return <HashRouter><AppRoutes /></HashRouter>;
}
