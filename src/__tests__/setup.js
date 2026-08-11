import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// `globals: false` means Testing Library's automatic cleanup is never
// registered, so renders would accumulate across tests and queries would
// resolve against a stale tree. Register it explicitly.
afterEach(cleanup);

// jsdom does not implement matchMedia; the theme and motion helpers use it.
if (!window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}
