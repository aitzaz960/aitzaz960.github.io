import { metrics } from '../data/content';
import Reveal from './Reveal';

export default function Metrics() {
  return (
    <section className="strip">
      <div className="wrap">
        <div className="strip__grid">
          {metrics.map((m, i) => (
            <Reveal key={m.label} className="metric" delay={i}>
              <div className="metric__v">
                {m.value}
                {m.unit && <span className="u">{m.unit}</span>}
              </div>
              <div className="metric__k mono">{m.label}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
