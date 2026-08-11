import Reveal from './Reveal';

export default function SectionHead({ title, meta }) {
  return (
    <Reveal className="head">
      <h2>{title}</h2>
      {meta && <span className="meta mono">{meta}</span>}
    </Reveal>
  );
}
