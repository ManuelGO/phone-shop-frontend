import { ApiError, cachedGet } from './client.js';
import { toProductDetail, toProductSummary } from './mappers.js';

export async function getProducts({ signal } = {}) {
  const data = await cachedGet('/product', { signal });
  return Array.isArray(data) ? data.map(toProductSummary) : [];
}

export async function getProduct(id, { signal } = {}) {
  const data = await cachedGet(`/product/${encodeURIComponent(id)}`, { signal });
  if (!data || typeof data !== 'object') {
    throw new ApiError('Product not found', 404);
  }
  return toProductDetail(data);
}
