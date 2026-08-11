import { Fragment } from 'react';

import { contact } from '../data/content';
import Reveal from './Reveal';

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="wrap band band--tight">
        <Reveal as="h2" className="contact__lead">
          {contact.lead.map((line, i) => (
            <Fragment key={line}>
              {i > 0 && <br />}
              {line}
            </Fragment>
          ))}
        </Reveal>

        <Reveal as="p" className="contact__sub" delay={1}>
          {contact.sub}
        </Reveal>

        <div className="links">
          {contact.links.map((link, i) => (
            <Reveal
              as="a"
              className="link"
              key={link.kind}
              delay={i}
              href={link.href}
              {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <span className="link__k mono">{link.kind}</span>
              <span className="link__v">{link.value}</span>
              <span className="link__go" aria-hidden="true">{link.arrow}</span>
            </Reveal>
          ))}
        </div>

        <div className="colophon mono">
          {contact.colophon.map((line) => <span key={line}>{line}</span>)}
        </div>
      </div>
    </section>
  );
}
