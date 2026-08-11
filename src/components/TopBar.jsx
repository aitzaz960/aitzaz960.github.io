import { nav } from '../data/content';
import ThemeToggle from './ThemeToggle';

export default function TopBar({ active, isNight, onToggle }) {
  return (
    <div className="topbar">
      <nav className="topbar__links mono" aria-label="Sections">
        {nav
          .filter((item) => item.mobile)
          .map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={active === item.id ? 'true' : undefined}
            >
              {item.label}
            </a>
          ))}
      </nav>
      <ThemeToggle isNight={isNight} onToggle={onToggle} showLabel={false} />
    </div>
  );
}
