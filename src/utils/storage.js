const PREFIX = 'phone-shop:';

// localStorage can throw (private mode, quota, disabled storage), so every
// access is guarded and treated as a cache miss on failure.
function read(key) {
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    return raw === null ? null : JSON.parse(raw);
  } catch {
    return null;
  }
}

function write(key, value) {
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    // Not being able to persist is not fatal; the app keeps working without it.
  }
}

function remove(key) {
  try {
    window.localStorage.removeItem(PREFIX + key);
  } catch {
    // Same as above.
  }
}

export function getCached(key, now = Date.now()) {
  const entry = read(key);
  if (!entry || typeof entry.expiresAt !== 'number' || !('value' in entry)) {
    return null;
  }
  if (entry.expiresAt <= now) {
    remove(key);
    return null;
  }
  return entry.value;
}

export function setCached(key, value, ttlMs, now = Date.now()) {
  write(key, { value, expiresAt: now + ttlMs });
}

export function getItem(key) {
  return read(key);
}

export function setItem(key, value) {
  write(key, value);
}

// Calls `callback` with the new value whenever another tab changes `key`.
// Returns a function that stops listening.
export function subscribe(key, callback) {
  function handleStorage(event) {
    if (event.key !== PREFIX + key) return;
    try {
      callback(event.newValue === null ? null : JSON.parse(event.newValue));
    } catch {
      callback(null);
    }
  }

  window.addEventListener('storage', handleStorage);
  return () => window.removeEventListener('storage', handleStorage);
}
