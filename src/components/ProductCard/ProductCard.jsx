import { Link } from 'react-router';
import { formatPrice } from '../../utils/format.js';
import { PhoneImage } from '../PhoneImage/PhoneImage.jsx';
import styles from './ProductCard.module.css';

export function ProductCard({ product }) {
  const { id, brand, model, price, imageUrl } = product;

  return (
    <Link to={`/product/${encodeURIComponent(id)}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <PhoneImage
          className={styles.image}
          src={imageUrl}
          alt={`${brand} ${model}`}
          loading="lazy"
          width="160"
          height="212"
        />
      </div>
      <div className={styles.body}>
        <p className={styles.brand}>{brand}</p>
        <h2 className={styles.model}>{model}</h2>
        <p className={styles.price}>{formatPrice(price)}</p>
      </div>
    </Link>
  );
}
