import { describe, expect, it, vi } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import { CART_COUNT_KEY, CartProvider } from './CartProvider.jsx';
import { useCart } from './useCart.js';

function CountProbe() {
  const { count } = useCart();
  return <p>count: {count}</p>;
}

function dispatchStorage(newValue) {
  window.dispatchEvent(
    new StorageEvent('storage', { key: `phone-shop:${CART_COUNT_KEY}`, newValue }),
  );
}

describe('CartProvider', () => {
  it('follows changes made in another tab', () => {
    render(
      <CartProvider>
        <CountProbe />
      </CartProvider>,
    );
    expect(screen.getByText('count: 0')).toBeInTheDocument();

    act(() => dispatchStorage('7'));
    expect(screen.getByText('count: 7')).toBeInTheDocument();

    act(() => dispatchStorage(null));
    expect(screen.getByText('count: 0')).toBeInTheDocument();
  });

  it('ignores storage events for other keys and invalid values', () => {
    render(
      <CartProvider>
        <CountProbe />
      </CartProvider>,
    );

    act(() => {
      window.dispatchEvent(new StorageEvent('storage', { key: 'phone-shop:other', newValue: '9' }));
    });
    expect(screen.getByText('count: 0')).toBeInTheDocument();

    act(() => dispatchStorage('{broken'));
    expect(screen.getByText('count: 0')).toBeInTheDocument();
  });

  it('throws a helpful error when used outside the provider', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => render(<CountProbe />)).toThrow('useCart must be used inside a CartProvider');

    consoleError.mockRestore();
  });
});
