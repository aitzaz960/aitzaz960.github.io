import { Fragment } from 'react';

import { profile } from '../data/content';
import Trace from './Trace';

export default function Hero() {
  return (
    <section id="top">
      <div className="wrap hero">
        <div className="hero__eyebrow mono">
          <span><b>●</b> {profile.title}</span>
          <span>{profile.location}</span>
          <span>{profile.availability}</span>
        </div>

        <h1 className="display hero__name">
          {profile.name.map((word) => (
            <span className="ln" key={word}><span>{word}</span></span>
          ))}
        </h1>

        <p className="hero__role mono">
          {profile.stackLine.map((group, i) => (
            <Fragment key={group}>
              {i > 0 && <span>—</span>}
              <strong>{group}</strong>
            </Fragment>
          ))}
        </p>

        <p className="hero__pitch prose">
          {profile.pitch.map((part, i) =>
            part.b ? <b key={i}>{part.t}</b> : <Fragment key={i}>{part.t}</Fragment>,
          )}
        </p>

        <div className="hero__cta">
          <a className="btn" href="#experience">
            See the work <i aria-hidden="true">↓</i>
          </a>
          <a className="btn btn--ghost" href="mailto:aitzazahmadofficial@gmail.com">
            Email me <i aria-hidden="true">↗</i>
          </a>
        </div>

        <Trace />
      </div>
    </section>
  );
}
