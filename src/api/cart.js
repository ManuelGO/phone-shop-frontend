import { request } from './client.js';

export async function addToCart({ id, colorCode, storageCode }) {
  const data = await request('/cart', {
    method: 'POST',
    body: { id, colorCode, storageCode },
  });
  return Number(data?.count) || 0;
}
