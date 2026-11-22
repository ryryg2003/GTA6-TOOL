import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import Home from '../../src/sections/Home';

test('Home renders the five v1 sections as links', () => {
  render(<HashRouter><Home /></HashRouter>);
  const expected: [string, string][] = [
    ['Map', '#/map'],
    ['Progress Tracker', '#/progress'],
    ['Weapons', '#/weapons'],
    ['Cars', '#/vehicles'],
    ['Missions & Guides', '#/missions'],
  ];
  for (const [name, href] of expected) {
    expect(screen.getByRole('link', { name: new RegExp(`^${name}`) })).toHaveAttribute('href', href);
  }
});
