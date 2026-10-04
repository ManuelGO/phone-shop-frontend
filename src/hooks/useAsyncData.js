import { useCallback, useEffect, useState } from 'react';

// Runs `load` on mount, whenever it changes and on retry. Each result is
// stored together with the request it belongs to, so anything older than the
// current request reads as loading and late responses are ignored.
export function useAsyncData(load) {
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState(null);

  useEffect(() => {
    let active = true;

    load().then(
      (data) => active && setResult({ load, attempt, data, error: null }),
      (error) => active && setResult({ load, attempt, data: null, error }),
    );

    return () => {
      active = false;
    };
  }, [load, attempt]);

  const retry = useCallback(() => setAttempt((count) => count + 1), []);

  const isCurrent = result?.load === load && result?.attempt === attempt;
  if (!isCurrent) {
    return { status: 'loading', data: null, error: null, retry };
  }
  return {
    status: result.error ? 'error' : 'success',
    data: result.data,
    error: result.error,
    retry,
  };
}
