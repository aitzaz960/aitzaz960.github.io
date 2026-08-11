import { nav } from '../data/content';
import ThemeToggle from './ThemeToggle';

export default function Spine({ active, progress, isNight, onToggle }) {
  const pct = Math.round(progress * 100);

  return (
    <aside className="spine">
      <a className="spine__mark" href="#top">
        <span className="spine__dot" aria-hidden="true" />
        <span className="spine__initials">AITZAZ AHMAD</span>
      </a>

      <nav aria-label="Sections">
        <ul className="nav mono">
          {nav.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? 'true' : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="spine__foot">
        <ThemeToggle isNight={isNight} onToggle={onToggle} />
        <div className="progress" aria-hidden="true">
          <i style={{ width: `${(progress * 100).toFixed(1)}%` }} />
        </div>
        <div className="readout mono">
          <span>Islamabad</span>
          <span>{String(pct).padStart(2, '0')}%</span>
        </div>
      </div>
    </aside>
  );
}
