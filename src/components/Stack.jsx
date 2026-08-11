import { stack } from '../data/content';
import Reveal from './Reveal';
import SectionHead from './SectionHead';

export default function Stack() {
  return (
    <section id="stack" className="band">
      <div className="wrap">
        <SectionHead title="Stack" meta="Grouped by where it sits in the system" />

        <div className="layers">
          {stack.map((layer, i) => (
            <Reveal key={layer.title} className="layer">
              <div className="layer__n">
                <span className="layer__i">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <div className="layer__t">{layer.title}</div>
                  <p className="layer__d">{layer.note}</p>
                </div>
              </div>
              <div className="layer__items">
                {layer.items.map((item) => (
                  <span className="chip" key={item}>{item}</span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
