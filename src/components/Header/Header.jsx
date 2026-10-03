import { Link } from 'react-router';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs.jsx';
import { CartCount } from '../CartCount/CartCount.jsx';
import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.start}>
          <Link to="/" className={styles.title}>
            Phone Shop
          </Link>
          <Breadcrumbs />
        </div>
        <CartCount />
      </div>
    </header>
  );
}
