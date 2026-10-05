import { Link, useParams } from 'react-router';
import { Button } from '../components/Button/Button.jsx';
import { ProductActions } from '../components/ProductActions/ProductActions.jsx';
import { ProductDescription } from '../components/ProductDescription/ProductDescription.jsx';
import { ProductImage } from '../components/ProductImage/ProductImage.jsx';
import { StatusMessage } from '../components/StatusMessage/StatusMessage.jsx';
import { useProduct } from '../hooks/useProduct.js';
import { formatPrice } from '../utils/format.js';
import styles from './ProductDetailPage.module.css';

export function ProductDetailPage() {
  const { id } = useParams();
  const { product, status, error, retry } = useProduct(id);

  return (
    <>
      <Link to="/" className={styles.back}>
        Back to all phones
      </Link>

      {status === 'loading' && <StatusMessage title="Loading phone details" />}

      {status === 'error' && (
        <StatusMessage
          role="alert"
          title="We couldn't load this phone"
          action={
            <Button className={styles.retry} onClick={retry}>
              Try again
            </Button>
          }
        >
          {error?.message}
        </StatusMessage>
      )}

      {status === 'success' && (
        <article className={styles.product}>
          <title>{`${product.brand} ${product.model} | Phone Shop`}</title>
          <div className={styles.media}>
            <ProductImage src={product.imageUrl} alt={`${product.brand} ${product.model}`} />
          </div>
          <div className={styles.details}>
            <header>
              <p className={styles.brand}>{product.brand}</p>
              <h1 className={styles.title}>{product.model}</h1>
              <p className={styles.price}>{formatPrice(product.price)}</p>
            </header>
            <ProductDescription product={product} />
            <ProductActions key={product.id} options={product.options} />
          </div>
        </article>
      )}
    </>
  );
}
