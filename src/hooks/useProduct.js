import { useCallback } from 'react';
import { getProduct } from '../api/products.js';
import { useAsyncData } from './useAsyncData.js';

export function useProduct(id) {
  const load = useCallback(() => getProduct(id), [id]);
  const { data, ...rest } = useAsyncData(load);
  return { product: data, ...rest };
}
