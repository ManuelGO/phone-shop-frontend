import { useState } from 'react';
import styles from './PhoneImage.module.css';

// Product image that swaps to a placeholder when the URL is missing or fails
// to load, so a broken image never leaves an empty box or the browser's icon.
export function PhoneImage({ src, alt, className, ...props }) {
  const [failedSrc, setFailedSrc] = useState(null);

  if (!src || failedSrc === src) {
    return (
      <div className={styles.placeholder} role="img" aria-label={alt}>
        <svg
          className={styles.icon}
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
          <path d="M10.5 18.5h3" />
        </svg>
        <span className={styles.text}>Image not available</span>
      </div>
    );
  }

  return (
    <img className={className} src={src} alt={alt} onError={() => setFailedSrc(src)} {...props} />
  );
}
