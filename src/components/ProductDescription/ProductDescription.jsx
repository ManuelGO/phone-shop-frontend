import { formatPrice, formatWeight } from '../../utils/format.js';
import styles from './ProductDescription.module.css';

function specsFor(product) {
  return [
    ['Brand', product.brand],
    ['Model', product.model],
    ['Price', formatPrice(product.price)],
    ['CPU', product.cpu],
    ['RAM', product.ram],
    ['Operating system', product.os],
    ['Screen resolution', product.displayResolution],
    ['Screen size', product.displaySize],
    ['Battery', product.battery],
    ['Main camera', product.primaryCamera],
    ['Front camera', product.secondaryCamera],
    ['Dimensions', product.dimensions],
    ['Weight', formatWeight(product.weight)],
  ];
}

export function ProductDescription({ product }) {
  return (
    <section className={styles.description} aria-labelledby="specs-heading">
      <h2 id="specs-heading" className={styles.heading}>
        Specifications
      </h2>
      <dl className={styles.list}>
        {specsFor(product).map(([label, value]) => (
          <div key={label} className={styles.row}>
            <dt className={styles.label}>{label}</dt>
            <dd className={value ? styles.value : `${styles.value} ${styles.missing}`}>
              {value || 'Not available'}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
