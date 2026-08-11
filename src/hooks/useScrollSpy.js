import { useEffect, useState } from 'react';

/**
 * Tracks which section the reader is in, plus how far down the page they are.
 * Reads layout inside requestAnimationFrame so scrolling stays cheap.
 */
export function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const measure = () => {
      const scrolled = window.scrollY || window.pageYOffset;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? Math.min(Math.max(scrolled / height, 0), 1) : 0);

      const line = window.innerHeight * 0.42;
      let current = ids[0];
      ids.forEach((id) => {
        const node = document.getElementById(id);
        if (node && node.getBoundingClientRect().top <= line) current = id;
      });
      setActive(current);

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(measure);
        ticking = true;
      }
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ids]);

  return { active, progress };
}
