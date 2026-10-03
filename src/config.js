const DEFAULT_API_BASE_URL = 'https://itx-frontend-test.onrender.com/api';

export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL).replace(
  /\/+$/,
  '',
);

export const CACHE_TTL_MS = 60 * 60 * 1000;
