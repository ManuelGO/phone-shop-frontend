import { useId } from 'react';
import styles from './SearchBar.module.css';

export function SearchBar({ value, onChange }) {
  const id = useId();

  return (
    <div className={styles.search} role="search">
      <label htmlFor={id} className="visually-hidden">
        Search phones by brand or model
      </label>
      <input
        id={id}
        className={styles.input}
        type="search"
        placeholder="Search by brand or model"
        autoComplete="off"
        spellCheck="false"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
