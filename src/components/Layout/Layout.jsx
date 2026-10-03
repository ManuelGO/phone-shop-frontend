import { Outlet, ScrollRestoration } from 'react-router';
import { Header } from '../Header/Header.jsx';
import styles from './Layout.module.css';

export function Layout() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <ScrollRestoration />
    </>
  );
}
