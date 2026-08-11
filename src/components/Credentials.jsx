import { credentials } from '../data/content';
import Reveal from './Reveal';
import SectionHead from './SectionHead';

export default function Credentials() {
  return (
    <section id="credentials" className="band">
      <div className="wrap">
        <SectionHead title="Credentials" meta="Education & certification" />

        <div className="creds">
          {credentials.map((c, i) => (
            <Reveal as="article" className="cred" key={c.title} delay={i}>
              <span className="cred__k mono">{c.kicker}</span>
              <h3 className="cred__t">{c.title}</h3>
              <p className="cred__s">{c.subtitle}</p>
              <p className="cred__m mono">{c.meta}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
