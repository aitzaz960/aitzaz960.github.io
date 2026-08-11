import { useCallback, useEffect, useState } from 'react';

const KEY = 'aa-theme';

/** Reads a saved choice, falling back to the OS preference. */
function initial() {
  try {
    const saved = window.localStorage.getItem(KEY);
    if (saved === 'day' || saved === 'night') return saved;
  } catch {
    // private browsing or storage disabled — preference just won't persist
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day';
}

export function useTheme() {
  const [theme, setTheme] = useState(initial);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      window.localStorage.setItem(KEY, theme);
    } catch {
      // non-fatal
    }
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((t) => (t === 'night' ? 'day' : 'night'));
  }, []);

  return { theme, toggle, isNight: theme === 'night' };
}
