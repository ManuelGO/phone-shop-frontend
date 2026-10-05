import styles from './ProductImage.module.css';

export function ProductImage({ src, alt }) {
  return (
    <div className={styles.frame}>
      <img className={styles.image} src={src} alt={alt} width="160" height="212" />
    </div>
  );
}
