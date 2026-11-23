import { Link } from 'react-router-dom';
import Icon from './Icon';

/** Back button, title, optional right-hand bit, and a search shortcut. */
export default function PageHeader({ title, back = '/', backLabel = 'Back', right, search = true }: {
  title?: string; back?: string; backLabel?: string; right?: React.ReactNode; search?: boolean;
}) {
  return (
    <header className="page-head">
      <Link to={back} className="icon-btn plain" aria-label={backLabel}>
        <Icon name="back" size={22} />
      </Link>
      {title ? <h1>{title}</h1> : <span style={{ flex: 1 }} />}
      {right && <span className="right">{right}</span>}
      {search && <Link to="/search" className="icon-btn" aria-label="Search"><Icon name="search" size={18} /></Link>}
    </header>
  );
}
