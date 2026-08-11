import { useEffect, useState } from 'react';

import { trace } from '../data/content';
import { useInView } from '../hooks/useInView';
import { prefersReducedMotion } from '../lib/motion';

/**
 * The hero signature: a request walking through the stack, with the time
 * it spends in each hop. Bars grow in sequence and the total counts up
 * once — the first time it enters view.
 */
export default function Trace() {
  const [ref, inView] = useInView({ threshold: 0.25, rootMargin: '0px' });
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;

    if (prefersReducedMotion()) {
      setTotal(trace.total);
      return undefined;
    }

    let frame;
    let start;
    const DURATION = 1100;
    const DELAY = 300;

    const step = (now) => {
      if (start === undefined) start = now;
      const elapsed = now - start - DELAY;
      if (elapsed < 0) {
        frame = requestAnimationFrame(step);
        return;
      }
      const p = Math.min(elapsed / DURATION, 1);
      const eased = 1 - (1 - p) ** 3;
      setTotal(Math.round(trace.total * eased));
      if (p < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [inView]);

  return (
    <figure
      ref={ref}
      className={`trace ${inView ? 'is-live' : ''}`}
      aria-label="Illustration of a request path through a checkout API and where its time is spent"
    >
      <figcaption className="trace__head mono">
        <span>
          <b>{trace.method}</b> {trace.path}
        </span>
        <span className="trace__status">{trace.status}</span>
      </figcaption>

      <div className="trace__body">
        {trace.hops.map((hop, i) => (
          <div className={`hop ${hop.external ? 'hop--ext' : ''}`} key={hop.name}>
            <span className="hop__label">
              {hop.name} <b>{hop.detail}</b>
            </span>
            <span className="hop__track">
              <i
                className="hop__bar"
                style={{
                  '--start': `${hop.start}%`,
                  '--span': `${hop.span}%`,
                  '--delay': `${0.05 + i * 0.11}s`,
                }}
              />
            </span>
            <span className="hop__ms">{hop.ms} ms</span>
          </div>
        ))}
      </div>

      <div className="trace__foot mono">
        <span><em>{trace.caption}</em></span>
        <span className="trace__total">
          total <b>{total}</b> ms
        </span>
      </div>
    </figure>
  );
}
