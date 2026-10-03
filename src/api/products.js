import { ApiError, cachedGet } from './client.js';
import { toProductDetail, toProductSummary } from './mappers.js';

export async function getProducts() {
  const data = await cachedGet('/product');
  return Array.isArray(data) ? data.map(toProductSummary) : [];
}

export async function getProduct(id) {
  const data = await cachedGet(`/product/${encodeURIComponent(id)}`);
  if (!data || typeof data !== 'object') {
    throw new ApiError('Product not found', 404);
  }
  return toProductDetail(data);
}
