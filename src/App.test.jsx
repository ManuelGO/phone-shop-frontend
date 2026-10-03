import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App.jsx';

describe('App', () => {
  it('renders the shop with the browser router and cart provider', () => {
    render(<App />);

    expect(screen.getByRole('link', { name: 'Phone Shop' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('heading', { level: 1, name: 'Phones' })).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('0 items in cart');
  });
});
