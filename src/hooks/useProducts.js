import { getProducts } from '../api/products.js';
import { useAsyncData } from './useAsyncData.js';

export function useProducts() {
  const { data, ...rest } = useAsyncData(getProducts);
  return { products: data ?? [], ...rest };
}
