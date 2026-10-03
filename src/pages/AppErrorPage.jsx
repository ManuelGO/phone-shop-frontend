import { useEffect } from 'react';
import { useRouteError } from 'react-router';

// Shown when the layout itself fails, so it can't rely on the header or any
// shared component. The link is a plain anchor to force a full reload.
export function AppErrorPage() {
  const error = useRouteError();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main style={{ padding: '2rem 1rem', textAlign: 'center' }}>
      <h1>Something went wrong</h1>
      <p>The page could not be loaded. Please try again.</p>
      <a href="/">Reload the shop</a>
    </main>
  );
}
