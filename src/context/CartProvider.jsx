import { useCallback, useEffect, useMemo, useState } from 'react';
import { addToCart } from '../api/cart.js';
import { getItem, setItem, subscribe } from '../utils/storage.js';
import { CartContext } from './CartContext.js';

export const CART_COUNT_KEY = 'cart-count';

function toCount(value) {
  return Number.isSafeInteger(value) && value > 0 ? value : 0;
}

export function CartProvider({ children }) {
  const [count, setCount] = useState(() => toCount(getItem(CART_COUNT_KEY)));

  useEffect(() => {
    setItem(CART_COUNT_KEY, count);
  }, [count]);

  useEffect(() => subscribe(CART_COUNT_KEY, (value) => setCount(toCount(value))), []);

  // The API answers every add with `count: 1` instead of the cart total, so the
  // returned value is added to the running total kept here.
  const addProduct = useCallback(async ({ id, colorCode, storageCode }) => {
    const added = await addToCart({ id, colorCode, storageCode });
    setCount((current) => toCount(current + added));
  }, []);

  const value = useMemo(() => ({ count, addProduct }), [count, addProduct]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
