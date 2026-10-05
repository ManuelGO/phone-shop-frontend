import { useDeferredValue, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { Button } from '../components/Button/Button.jsx';
import { ProductGrid } from '../components/ProductGrid/ProductGrid.jsx';
import { SearchBar } from '../components/SearchBar/SearchBar.jsx';
import { StatusMessage } from '../components/StatusMessage/StatusMessage.jsx';
import { useProducts } from '../hooks/useProducts.js';
import { filterProducts } from '../utils/filterProducts.js';
import styles from './ProductListPage.module.css';

export function ProductListPage() {
  const { products, status, error, retry } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';
  const deferredQuery = useDeferredValue(query);

  const visibleProducts = useMemo(
    () => filterProducts(products, deferredQuery),
    [products, deferredQuery],
  );

  function handleQueryChange(value) {
    setSearchParams(value ? { q: value } : {}, { replace: true });
  }

  return (
    <>
      <title>Phones | Phone Shop</title>
      <div className={styles.toolbar}>
        <div>
          <h1 className={styles.title}>Phones</h1>
          {status === 'success' && (
            <p className={styles.count} aria-live="polite">
              {visibleProducts.length === 1 ? '1 result' : `${visibleProducts.length} results`}
            </p>
          )}
        </div>
        <SearchBar value={query} onChange={handleQueryChange} />
      </div>

      {status === 'loading' && (
        <StatusMessage title="Loading phones">
          The first load can take up to a minute while the server wakes up.
        </StatusMessage>
      )}

      {status === 'error' && (
        <StatusMessage
          role="alert"
          title="We couldn't load the phones"
          action={
            <Button className={styles.retry} onClick={retry}>
              Try again
            </Button>
          }
        >
          {error?.message}
        </StatusMessage>
      )}

      {status === 'success' &&
        (visibleProducts.length > 0 ? (
          <ProductGrid products={visibleProducts} />
        ) : (
          <StatusMessage title={query ? `No phones match "${query}"` : 'No phones available'}>
            {query && 'Try a different brand or model.'}
          </StatusMessage>
        ))}
    </>
  );
}
