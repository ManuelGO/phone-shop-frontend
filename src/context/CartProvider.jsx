import { useMemo, useState } from 'react';
import { CartContext } from './CartContext.js';
import { getItem } from '../utils/storage.js';

export const CART_COUNT_KEY = 'cart-count';

function readStoredCount() {
  const stored = getItem(CART_COUNT_KEY);
  return Number.isSafeInteger(stored) && stored > 0 ? stored : 0;
}

export function CartProvider({ children }) {
  const [count] = useState(readStoredCount);
  const value = useMemo(() => ({ count }), [count]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
