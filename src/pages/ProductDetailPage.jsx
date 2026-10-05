import { useState } from 'react';
import { Link, useParams } from 'react-router';
import { Button } from '../components/Button/Button.jsx';
import { ProductActions } from '../components/ProductActions/ProductActions.jsx';
import { ProductDescription } from '../components/ProductDescription/ProductDescription.jsx';
import { ProductImage } from '../components/ProductImage/ProductImage.jsx';
import { StatusMessage } from '../components/StatusMessage/StatusMessage.jsx';
import { useCart } from '../context/useCart.js';
import { useProduct } from '../hooks/useProduct.js';
import { formatPrice } from '../utils/format.js';
import styles from './ProductDetailPage.module.css';

// Keyed by id so selections and messages reset when another product opens on
// the same route, for example through the browser's back and forward buttons.
export function ProductDetailPage() {
  const { id } = useParams();
  return <ProductDetail key={id} id={id} />;
}

function ProductDetail({ id }) {
  const { product, status, error, retry } = useProduct(id);
  const { addProduct } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [feedback, setFeedback] = useState(null);

  async function handleAdd({ storageCode, colorCode }) {
    setIsAdding(true);
    setFeedback(null);
    try {
      await addProduct({ id: product.id, storageCode, colorCode });
      setFeedback({
        type: 'success',
        message: `${product.brand} ${product.model} added to your cart.`,
      });
    } catch (addError) {
      setFeedback({
        type: 'error',
        message: `We couldn't add this phone to your cart. ${addError.message}`,
      });
    } finally {
      setIsAdding(false);
    }
  }

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
            <ProductActions
              options={product.options}
              onAdd={handleAdd}
              isAdding={isAdding}
              feedback={feedback}
            />
          </div>
        </article>
      )}
    </>
  );
}
