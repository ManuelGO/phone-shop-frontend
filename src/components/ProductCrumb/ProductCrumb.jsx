import { useProduct } from '../../hooks/useProduct.js';

export function ProductCrumb({ id }) {
  const { product } = useProduct(id);
  return product ? `${product.brand} ${product.model}` : 'Product details';
}
