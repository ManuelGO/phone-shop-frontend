import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ApiError, cachedGet, request } from './client.js';
import { API_BASE_URL, CACHE_TTL_MS } from '../config.js';

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

describe('api client', () => {
  let fetchMock;

  beforeEach(() => {
    fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
  });

  it('sends JSON bodies and returns the parsed response', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ count: 1 }));

    const data = await request('/cart', { method: 'POST', body: { id: 'a' } });

    expect(data).toEqual({ count: 1 });
    expect(fetchMock).toHaveBeenCalledWith(`${API_BASE_URL}/cart`, {
      method: 'POST',
      signal: undefined,
      headers: { 'Content-Type': 'application/json' },
      body: '{"id":"a"}',
    });
  });

  it('throws an ApiError with the server message on a failed response', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ message: 'Invalid parameters' }, 400));

    await expect(request('/cart', { method: 'POST', body: {} })).rejects.toMatchObject({
      name: 'ApiError',
      message: 'Invalid parameters',
      status: 400,
    });
  });

  it('throws an ApiError when the network is down', async () => {
    fetchMock.mockRejectedValue(new TypeError('Failed to fetch'));

    const error = await request('/product').catch((e) => e);
    expect(error).toBeInstanceOf(ApiError);
    expect(error.status).toBe(0);
  });

  it('lets aborted requests propagate untouched', async () => {
    fetchMock.mockRejectedValue(new DOMException('Aborted', 'AbortError'));

    await expect(request('/product')).rejects.toHaveProperty('name', 'AbortError');
  });

  it('serves repeat reads from the cache until it expires', async () => {
    vi.useFakeTimers();
    fetchMock.mockImplementation(() => Promise.resolve(jsonResponse([{ id: 'a' }])));

    await cachedGet('/product');
    await cachedGet('/product');
    expect(fetchMock).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(CACHE_TTL_MS);
    await cachedGet('/product');
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('shares one request between concurrent reads of the same path', async () => {
    fetchMock.mockImplementation(() => Promise.resolve(jsonResponse([{ id: 'a' }])));

    const [first, second] = await Promise.all([cachedGet('/product'), cachedGet('/product')]);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(first).toEqual(second);
  });

  it('does not cache failed reads', async () => {
    fetchMock
      .mockResolvedValueOnce(jsonResponse({ message: 'boom' }, 500))
      .mockResolvedValueOnce(jsonResponse([{ id: 'a' }]));

    await expect(cachedGet('/product')).rejects.toBeInstanceOf(ApiError);
    await expect(cachedGet('/product')).resolves.toEqual([{ id: 'a' }]);
  });
});
