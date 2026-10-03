import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App.jsx';

describe('App', () => {
  it('renders the shop title', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Phone Shop' })).toBeInTheDocument();
  });
});
