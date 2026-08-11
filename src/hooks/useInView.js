import { useEffect, useRef, useState } from 'react';

import { prefersReducedMotion } from '../lib/motion';

/**
 * Fires once when the element scrolls into view, then stops observing.
 * Returns `true` immediately when the visitor has asked for reduced motion,
 * so content is never gated behind an animation that will not run.
 */
export function useInView({ threshold = 0.08, rootMargin = '0px 0px -8% 0px' } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(() => prefersReducedMotion());

  useEffect(() => {
    if (inView) return undefined;

    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [inView, threshold, rootMargin]);

  return [ref, inView];
}
