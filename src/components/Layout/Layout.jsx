import { useEffect, useRef } from 'react';
import { Outlet, ScrollRestoration, useLocation } from 'react-router';
import { Header } from '../Header/Header.jsx';
import styles from './Layout.module.css';

const MAIN_ID = 'main-content';

export function Layout() {
  const { pathname } = useLocation();
  const mainRef = useRef(null);
  const previousPathname = useRef(pathname);

  // Client-side navigation doesn't move focus, so keyboard and screen reader
  // users would stay on the link they used. Moving focus to the main content
  // tells them a new page has loaded. Only the path counts, so typing in the
  // search box (which updates `?q=`) keeps its focus.
  useEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname]);

  return (
    <>
      <a href={`#${MAIN_ID}`} className={styles.skipLink}>
        Skip to main content
      </a>
      <Header />
      <main id={MAIN_ID} ref={mainRef} tabIndex={-1} className={styles.main}>
        <Outlet />
      </main>
      <ScrollRestoration />
    </>
  );
}
