import styles from './Button.module.css';

export function Button({ type = 'button', className, ...props }) {
  const classes = className ? `${styles.button} ${className}` : styles.button;
  return <button type={type} className={classes} {...props} />;
}
