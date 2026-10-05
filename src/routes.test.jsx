import { describe, expect, it } from 'vitest';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CART_COUNT_KEY } from './context/CartProvider.jsx';
import { renderRoute } from './test/renderRoute.jsx';

function breadcrumbs() {
  return within(screen.getByRole('navigation', { name: 'Breadcrumb' }));
}

describe('routing and layout', () => {
  it('shows the product list on the home route', () => {
    renderRoute('/');

    expect(screen.getByRole('heading', { level: 1, name: 'Phones' })).toBeInTheDocument();
    expect(breadcrumbs().getByText('Home')).toHaveAttribute('aria-current', 'page');
  });

  it('shows the detail page with a breadcrumb trail back home', async () => {
    renderRoute('/product/apple-iphone-8');

    expect(breadcrumbs().getByText('Product details')).toHaveAttribute('aria-current', 'page');
    expect(await screen.findByRole('heading', { level: 1, name: 'iPhone 8' })).toBeInTheDocument();
    expect(breadcrumbs().getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(breadcrumbs().getByText('Apple iPhone 8')).toHaveAttribute('aria-current', 'page');
  });

  it('navigates home from the header title', async () => {
    const user = userEvent.setup();
    const { router } = renderRoute('/product/apple-iphone-8');

    await user.click(screen.getByRole('link', { name: 'Phone Shop' }));

    expect(router.state.location.pathname).toBe('/');
    expect(await screen.findByRole('heading', { level: 1, name: 'Phones' })).toBeInTheDocument();
  });

  it('navigates back to the list from the detail page link', async () => {
    const user = userEvent.setup();
    const { router } = renderRoute('/product/apple-iphone-8');

    await user.click(screen.getByRole('link', { name: 'Back to all phones' }));

    expect(router.state.location.pathname).toBe('/');
  });

  it('shows a not found page for unknown routes', () => {
    renderRoute('/does/not/exist');

    expect(screen.getByRole('heading', { level: 1, name: 'Page not found' })).toBeInTheDocument();
  });
});

describe('cart count in the header', () => {
  it('starts at zero', () => {
    renderRoute('/');
    expect(screen.getByText('0 items in cart')).toBeInTheDocument();
  });

  it('restores the persisted count', () => {
    window.localStorage.setItem(`phone-shop:${CART_COUNT_KEY}`, '3');
    renderRoute('/product/apple-iphone-8');
    expect(screen.getByText('3 items in cart')).toBeInTheDocument();
  });

  it('ignores a count that is out of range', () => {
    window.localStorage.setItem(`phone-shop:${CART_COUNT_KEY}`, '1e21');
    renderRoute('/');
    expect(screen.getByText('0 items in cart')).toBeInTheDocument();
  });

  it('ignores an invalid persisted count', () => {
    window.localStorage.setItem(`phone-shop:${CART_COUNT_KEY}`, '"lots"');
    renderRoute('/');
    expect(screen.getByText('0 items in cart')).toBeInTheDocument();
  });
});
