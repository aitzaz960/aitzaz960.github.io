import { useState } from 'react';

import { nodes } from '../data/topology';
import Reveal from './Reveal';
import SectionHead from './SectionHead';
import SystemMap from './SystemMap';

/**
 * The hero trace answers "where does the time go in one request".
 * This answers "what is the shape of the whole thing" — a different
 * question, which is why both diagrams earn their place.
 */
export default function Architecture() {
  const [activeId, setActiveId] = useState('api');
  const active = nodes.find((n) => n.id === activeId) ?? nodes[0];

  return (
    <section id="architecture" className="band">
      <div className="wrap">
        <SectionHead title="The system" meta={`${nodes.length} services · select any one`} />

        <Reveal as="p" className="map__intro prose">
          A composite of the architecture I work in day to day — the services, the
          stores they read, and the routes a request actually takes through them.
          Every box is somewhere I have shipped work.
        </Reveal>

        <Reveal className="map">
          <div className="map__head mono">
            <span>topology · production</span>
            <span className="map__sel">
              reading <b>{active.label}</b>
            </span>
          </div>
          <SystemMap activeId={activeId} onSelect={setActiveId} />
        </Reveal>

        <Reveal className="dossier">
          <div>
            <span className="dossier__k mono">{active.label}</span>
            <h3 className="dossier__t">{active.dossier.title}</h3>
            <p className="dossier__b">{active.dossier.blurb}</p>
            <div className="dossier__chips">
              {active.dossier.chips.map((c) => (
                <span className="chip" key={c}>{c}</span>
              ))}
            </div>
          </div>
          <ul className="dossier__list">
            {active.dossier.points.map((p) => (
              <li key={p}><span>{p}</span></li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
