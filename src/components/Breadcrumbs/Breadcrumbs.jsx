import { Link, useMatches } from 'react-router';
import styles from './Breadcrumbs.module.css';

export function Breadcrumbs() {
  const crumbs = useMatches()
    .filter((match) => match.handle?.crumb)
    .map((match) => ({ id: match.id, path: match.pathname, label: match.handle.crumb(match) }));

  if (crumbs.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
      <ol className={styles.list}>
        {crumbs.map((crumb, index) => {
          const isCurrent = index === crumbs.length - 1;
          return (
            <li key={crumb.id} className={styles.item}>
              {isCurrent ? (
                <span aria-current="page">{crumb.label}</span>
              ) : (
                <Link to={crumb.path}>{crumb.label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
