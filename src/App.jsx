import { useMemo } from 'react';

import Architecture from './components/Architecture';
import Contact from './components/Contact';
import Credentials from './components/Credentials';
import Experience from './components/Experience';
import Hero from './components/Hero';
import Metrics from './components/Metrics';
import Projects from './components/Projects';
import Spine from './components/Spine';
import Stack from './components/Stack';
import TopBar from './components/TopBar';
import { nav } from './data/content';
import { useScrollSpy } from './hooks/useScrollSpy';
import { useTheme } from './hooks/useTheme';

import './styles/base.css';
import './styles/tokens.css';
import './styles/layout.css';
import './styles/sections.css';
import './styles/motion.css';

export default function App() {
  const { isNight, toggle } = useTheme();
  const ids = useMemo(() => nav.map((item) => item.id), []);
  const { active, progress } = useScrollSpy(ids);

  return (
    <>
      <Spine active={active} progress={progress} isNight={isNight} onToggle={toggle} />
      <TopBar active={active} isNight={isNight} onToggle={toggle} />

      <div className="shell">
        <Hero />
        <Metrics />
        <Experience />
        <Architecture />
        <Projects />
        <Stack />
        <Credentials />
        <Contact />
      </div>
    </>
  );
}
