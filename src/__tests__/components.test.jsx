import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Rich from '../components/Rich';
import SystemMap from '../components/SystemMap';
import { nodes } from '../data/topology';

describe('Rich', () => {
  it('renders double-asterisk spans as strong', () => {
    const { container } = render(<Rich text="plain **emphasised** plain" />);
    const strong = container.querySelector('strong');
    expect(strong).not.toBeNull();
    expect(strong.textContent).toBe('emphasised');
  });

  it('leaves text without markers untouched', () => {
    const { container } = render(<Rich text="nothing special here" />);
    expect(container.querySelector('strong')).toBeNull();
    expect(container.textContent).toBe('nothing special here');
  });

  it('handles several emphasised spans in one string', () => {
    const { container } = render(<Rich text="**one** and **two**" />);
    expect(container.querySelectorAll('strong')).toHaveLength(2);
  });
});

describe('SystemMap', () => {
  it('renders one control per node in the fallback picker', () => {
    render(<SystemMap activeId="api" onSelect={() => {}} />);
    nodes.forEach((node) => {
      expect(screen.getAllByRole('button', { name: new RegExp(node.label, 'i') }).length)
        .toBeGreaterThan(0);
    });
  });

  it('reports the selected node to assistive technology', () => {
    render(<SystemMap activeId="api" onSelect={() => {}} />);
    const pressed = screen.getAllByRole('button', { pressed: true });
    expect(pressed.length).toBeGreaterThan(0);
  });

  it('calls back with the node id when one is chosen', () => {
    const onSelect = vi.fn();
    render(<SystemMap activeId="api" onSelect={onSelect} />);
    const [target] = screen.getAllByRole('button', { name: /mysql/i });
    fireEvent.click(target);
    expect(onSelect).toHaveBeenCalledWith('data');
  });

  it('draws same-column edges without looping back past the target', () => {
    // A horizontal S-curve between two nodes sharing an x position produces
    // a fishhook. Every control point must stay within the node column.
    const { container } = render(<SystemMap activeId="api" onSelect={() => {}} />);
    const api = nodes.find((n) => n.id === 'api');
    const queue = nodes.find((n) => n.id === 'queue');
    expect(Math.abs(api.x - queue.x)).toBeLessThan(132); // same column

    const paths = [...container.querySelectorAll('path.wire')].map((p) => p.getAttribute('d'));
    const vertical = paths.find((d) => d.startsWith(`M ${api.x} `));
    expect(vertical, 'no vertical connector drawn').toBeTruthy();

    const xs = vertical.match(/-?\d+(\.\d+)?/g).map(Number).filter((_, i) => i % 2 === 0);
    xs.forEach((x) => expect(Math.abs(x - api.x)).toBeLessThan(66));
  });

  it('activates a node from the keyboard, since they are custom controls', () => {
    const onSelect = vi.fn();
    render(<SystemMap activeId="api" onSelect={onSelect} />);
    const [target] = screen.getAllByRole('button', { name: /elasticsearch/i });
    fireEvent.keyDown(target, { key: 'Enter' });
    expect(onSelect).toHaveBeenCalledWith('search');
  });
});
