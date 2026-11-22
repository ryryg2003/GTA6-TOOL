import { HashRouter, Link, Route, Routes } from 'react-router-dom';
import Home from './sections/Home';

function ComingSoon() {
  return <main className="page"><p className="muted">Coming soon.</p></main>;
}

export function AppRoutes() {
  return (
    <>
      <header className="topbar">
        <Link to="/" className="brand">GTA 6 Info Book</Link>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<ComingSoon />} />
      </Routes>
    </>
  );
}

export default function App() {
  return <HashRouter><AppRoutes /></HashRouter>;
}
