import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { getProduct, getProducts } from './products.js';
import { addToCart } from './cart.js';
import { API_BASE_URL } from '../config.js';

function jsonResponse(body) {
  return new Response(JSON.stringify(body), { status: 200 });
}

describe('product and cart endpoints', () => {
  let fetchMock;

  beforeEach(() => {
    fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('getProducts returns mapped summaries', async () => {
    fetchMock.mockResolvedValue(
      jsonResponse([{ id: 'a', brand: 'Acer', model: 'Liquid Z6', price: '120', imgUrl: 'x' }]),
    );

    await expect(getProducts()).resolves.toEqual([
      { id: 'a', brand: 'Acer', model: 'Liquid Z6', price: 120, imageUrl: 'x' },
    ]);
    expect(fetchMock.mock.calls[0][0]).toBe(`${API_BASE_URL}/product`);
  });

  it('getProduct encodes the id in the URL', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ id: 'a/b', brand: 'Acer', model: 'X' }));

    await getProduct('a/b');
    expect(fetchMock.mock.calls[0][0]).toBe(`${API_BASE_URL}/product/a%2Fb`);
  });

  it('addToCart posts the selection and returns the count', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ count: 1 }));

    const count = await addToCart({ id: 'a', colorCode: 1000, storageCode: 2000 });

    expect(count).toBe(1);
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toEqual({
      id: 'a',
      colorCode: 1000,
      storageCode: 2000,
    });
  });
});
