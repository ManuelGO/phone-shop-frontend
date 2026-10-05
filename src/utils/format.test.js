import { describe, expect, it } from 'vitest';
import { formatPrice, formatWeight } from './format.js';

describe('formatPrice', () => {
  it('formats whole and decimal prices in euros', () => {
    expect(formatPrice(170)).toBe('€170');
    expect(formatPrice(1199.5)).toBe('€1,199.5');
  });

  it('shows a fallback when there is no price', () => {
    expect(formatPrice(null)).toBe('Price not available');
  });
});

describe('formatWeight', () => {
  it('formats grams and returns null when there is no weight', () => {
    expect(formatWeight(148)).toBe('148 g');
    expect(formatWeight(null)).toBeNull();
  });
});
