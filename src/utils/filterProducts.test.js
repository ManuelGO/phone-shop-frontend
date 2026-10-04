import { describe, expect, it } from 'vitest';
import { filterProducts } from './filterProducts.js';

const products = [
  { id: '1', brand: 'Acer', model: 'Liquid Z6' },
  { id: '2', brand: 'Alcatel', model: 'Idol 5' },
  { id: '3', brand: 'Huawei', model: 'P10 Lite' },
];

function ids(result) {
  return result.map((product) => product.id);
}

describe('filterProducts', () => {
  it('returns everything for an empty or blank query', () => {
    expect(filterProducts(products, '')).toBe(products);
    expect(filterProducts(products, '   ')).toBe(products);
  });

  it('matches brand or model, ignoring case', () => {
    expect(ids(filterProducts(products, 'ACER'))).toEqual(['1']);
    expect(ids(filterProducts(products, 'idol'))).toEqual(['2']);
  });

  it('matches partial words', () => {
    expect(ids(filterProducts(products, 'al'))).toEqual(['2']);
  });

  it('requires every word to match, in any order', () => {
    expect(ids(filterProducts(products, 'lite huawei'))).toEqual(['3']);
    expect(ids(filterProducts(products, 'acer idol'))).toEqual([]);
  });

  it('ignores accents', () => {
    expect(ids(filterProducts(products, 'húawei'))).toEqual(['3']);
  });
});
