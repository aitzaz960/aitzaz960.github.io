import { experience } from '../data/content';
import Reveal from './Reveal';
import Rich from './Rich';
import SectionHead from './SectionHead';

export default function Experience() {
  return (
    <section id="experience" className="band">
      <div className="wrap">
        <SectionHead title="Experience" meta="2 companies · Feb 2022 → present" />

        {experience.map((job) => (
          <Reveal as="article" className="role" key={job.company}>
            <div className="role__when mono">
              <span className="role__dates">{job.dates}</span>
              <span className="role__place">
                {job.place}
                <br />
                {job.mode}
              </span>
              <span className="role__tenure">{job.tenure}</span>
            </div>

            <div>
              <h3 className="role__co">{job.company}</h3>
              <span className="role__title mono">{job.role}</span>

              <ul className="duties">
                {job.duties.map((duty) => (
                  <li className="duty" key={duty.tag}>
                    <span className="duty__tag mono">{duty.tag}</span>
                    <p className="duty__txt"><Rich text={duty.text} /></p>
                  </li>
                ))}
              </ul>

              <div className="chips">
                {job.chips.map((chip) => (
                  <span className="chip" key={chip}>{chip}</span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
