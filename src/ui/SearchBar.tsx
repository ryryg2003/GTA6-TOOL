import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

export default function SearchBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  const onSearchPage = location.pathname === '/search';
  const [value, setValue] = useState(onSearchPage ? params.get('q') ?? '' : '');

  useEffect(() => { if (!onSearchPage) setValue(''); }, [onSearchPage]);

  return (
    <input
      type="search"
      className="searchbar"
      placeholder="Search guns, cars, missions…"
      aria-label="Search everything"
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        navigate(`/search?q=${encodeURIComponent(e.target.value)}`, { replace: onSearchPage });
      }}
    />
  );
}
