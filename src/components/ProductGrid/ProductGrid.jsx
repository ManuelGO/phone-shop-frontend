import { ProductCard } from '../ProductCard/ProductCard.jsx';
import styles from './ProductGrid.module.css';

export function ProductGrid({ products }) {
  return (
    <ul className={styles.grid} aria-label="Phones">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
