import { useEffect } from 'react';
import { Link, useRouteError } from 'react-router';

export function ErrorPage() {
  const error = useRouteError();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <h1>Something went wrong</h1>
      <p>An unexpected error occurred. Please try again.</p>
      <Link to="/">Go to all phones</Link>
    </>
  );
}
