import { useCart } from '../../context/useCart.js';
import styles from './CartCount.module.css';

export function CartCount() {
  const { count } = useCart();
  const label = count === 1 ? '1 item in cart' : `${count} items in cart`;

  return (
    <div className={styles.cart} role="status">
      <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 4h2l2.4 11.2a1 1 0 0 0 1 .8h9.2a1 1 0 0 0 1-.8L20 8H6.2" />
        <circle cx="9.5" cy="20" r="1.3" />
        <circle cx="17" cy="20" r="1.3" />
      </svg>
      <span className={styles.count} aria-hidden="true">
        {count}
      </span>
      <span className="visually-hidden">{label}</span>
    </div>
  );
}
