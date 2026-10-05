import { useId } from 'react';
import styles from './OptionSelector.module.css';

export function OptionSelector({ legend, options, value, onChange }) {
  const name = useId();

  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>{legend}</legend>
      <div className={styles.options}>
        {options.map((option) => (
          <label key={option.code} className={styles.option}>
            <input
              className={styles.input}
              type="radio"
              name={name}
              value={option.code}
              checked={value === option.code}
              onChange={() => onChange(option.code)}
            />
            <span className={styles.text}>{option.name}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
