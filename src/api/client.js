import { API_BASE_URL, CACHE_TTL_MS } from '../config.js';
import { getCached, setCached } from '../utils/storage.js';

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function parseBody(response) {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export async function request(path, { method = 'GET', body, signal } = {}) {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      signal,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch (error) {
    if (error.name === 'AbortError') throw error;
    throw new ApiError('Could not reach the server. Check your connection and try again.', 0);
  }

  const data = await parseBody(response);
  if (!response.ok) {
    throw new ApiError(
      data?.message || `Request failed with status ${response.status}`,
      response.status,
    );
  }
  return data;
}

// Reads are cached on the client for CACHE_TTL_MS so repeat visits don't hit
// the API. Once an entry expires, the next read fetches it again.
export async function cachedGet(path, { signal } = {}) {
  const cacheKey = `GET ${path}`;
  const cached = getCached(cacheKey);
  if (cached !== null) return cached;

  const data = await request(path, { signal });
  setCached(cacheKey, data, CACHE_TTL_MS);
  return data;
}
