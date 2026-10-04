import styles from './StatusMessage.module.css';

export function StatusMessage({ title, children, action, role = 'status' }) {
  return (
    <div className={styles.message} role={role}>
      <p className={styles.title}>{title}</p>
      {children && <p className={styles.text}>{children}</p>}
      {action}
    </div>
  );
}
