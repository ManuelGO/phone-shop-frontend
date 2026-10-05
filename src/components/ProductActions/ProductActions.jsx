import { useState } from 'react';
import { Button } from '../Button/Button.jsx';
import { OptionSelector } from '../OptionSelector/OptionSelector.jsx';
import styles from './ProductActions.module.css';

function defaultFor(options) {
  return options.length === 1 ? options[0].code : null;
}

export function ProductActions({ options, onAdd, isAdding = false }) {
  const [storageCode, setStorageCode] = useState(() => defaultFor(options.storages));
  const [colorCode, setColorCode] = useState(() => defaultFor(options.colors));

  const isComplete = storageCode !== null && colorCode !== null;
  const canAdd = isComplete && Boolean(onAdd) && !isAdding;

  function handleSubmit(event) {
    event.preventDefault();
    if (canAdd) onAdd({ storageCode, colorCode });
  }

  return (
    <section className={styles.actions} aria-labelledby="actions-heading">
      <h2 id="actions-heading" className="visually-hidden">
        Choose your options
      </h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <OptionSelector
          legend="Storage"
          options={options.storages}
          value={storageCode}
          onChange={setStorageCode}
        />
        <OptionSelector
          legend="Colour"
          options={options.colors}
          value={colorCode}
          onChange={setColorCode}
        />
        <Button type="submit" className={styles.add} disabled={!canAdd}>
          {isAdding ? 'Adding…' : 'Add to cart'}
        </Button>
        {!isComplete && <p className={styles.hint}>Choose a storage and colour to continue.</p>}
      </form>
    </section>
  );
}
