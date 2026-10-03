import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { renderRoute } from './test/renderRoute.jsx';

const failures = vi.hoisted(() => ({ page: false, header: false }));

vi.mock('./pages/ProductListPage.jsx', () => ({
  ProductListPage: () => {
    if (failures.page) throw new Error('page failed');
    return <h1>Phones</h1>;
  },
}));

vi.mock('./components/Header/Header.jsx', () => ({
  Header: () => {
    if (failures.header) throw new Error('header failed');
    return <header>Phone Shop</header>;
  },
}));

describe('error handling', () => {
  let consoleError;

  beforeEach(() => {
    consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    failures.page = false;
    failures.header = false;
    consoleError.mockRestore();
  });

  it('keeps the header when a page fails and logs the error once', () => {
    failures.page = true;
    renderRoute('/');

    expect(screen.getByRole('banner')).toHaveTextContent('Phone Shop');
    expect(screen.getByRole('heading', { name: 'Something went wrong' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Go to all phones' })).toHaveAttribute('href', '/');

    const logged = consoleError.mock.calls.filter(([arg]) => arg?.message === 'page failed');
    expect(logged).toHaveLength(1);
  });

  it('falls back to a standalone error page when the layout fails', () => {
    failures.header = true;
    renderRoute('/');

    expect(screen.queryByRole('banner')).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Something went wrong' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Reload the shop' })).toHaveAttribute('href', '/');
  });
});
