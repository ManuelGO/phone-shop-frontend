import { afterEach, describe, expect, it, vi } from 'vitest';
import { getCached, getItem, setCached, setItem } from './storage.js';

const HOUR = 60 * 60 * 1000;

describe('storage cache', () => {
  afterEach(() => {
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  it('returns a cached value before it expires', () => {
    setCached('products', [{ id: 'a' }], HOUR, 0);
    expect(getCached('products', HOUR - 1)).toEqual([{ id: 'a' }]);
  });

  it('drops the entry once it expires', () => {
    setCached('products', [{ id: 'a' }], HOUR, 0);
    expect(getCached('products', HOUR)).toBeNull();
    expect(window.localStorage.getItem('phone-shop:products')).toBeNull();
  });

  it('treats malformed entries as a miss', () => {
    window.localStorage.setItem('phone-shop:products', '{not json');
    expect(getCached('products')).toBeNull();

    window.localStorage.setItem('phone-shop:products', JSON.stringify({ value: 1 }));
    expect(getCached('products')).toBeNull();
  });

  it('keeps working when localStorage throws', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError');
    });
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('SecurityError');
    });

    expect(() => setCached('products', [], HOUR)).not.toThrow();
    expect(getCached('products')).toBeNull();
    expect(() => setItem('cart', 1)).not.toThrow();
    expect(getItem('cart')).toBeNull();
  });

  it('stores plain items without expiry', () => {
    setItem('cart-count', 3);
    expect(getItem('cart-count')).toBe(3);
  });
});
