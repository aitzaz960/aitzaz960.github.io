import { projects } from '../data/content';
import Reveal from './Reveal';
import Rich from './Rich';
import SectionHead from './SectionHead';

export default function Projects() {
  return (
    <section id="projects" className="band">
      <div className="wrap">
        <SectionHead title="Selected projects" meta="Built outside client work" />

        <div className="projects">
          {projects.map((p) => (
            <Reveal as="article" className="proj" key={p.title}>
              <div>
                <span className="proj__k mono">{p.kicker}</span>
                <h3 className="proj__t">{p.title}</h3>
                <p className="proj__d">{p.summary}</p>
              </div>
              <ul className="proj__list">
                {p.points.map((point) => (
                  <li key={point}><span><Rich text={point} /></span></li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
