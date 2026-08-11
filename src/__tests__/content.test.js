import { describe, expect, it } from 'vitest';

import { contact, credentials, experience, metrics, nav, profile, projects, stack } from '../data/content';
import { edges, flows, nodes } from '../data/topology';

/**
 * The content model is the contract between the data files and three
 * separate designs. These tests exist because a typo in an id is silent
 * at build time and obvious only as a blank panel in production.
 */

describe('content model', () => {
  it('gives every profile field the designs read from', () => {
    expect(profile.name).toHaveLength(2);
    expect(profile.pitch.length).toBeGreaterThan(0);
    expect(profile.stackLine.length).toBeGreaterThan(0);
  });

  it('has no empty strings anywhere in the pitch', () => {
    profile.pitch.forEach((part) => expect(part.t.trim()).not.toBe(''));
  });

  it('keeps experience in reverse chronological order', () => {
    const startYears = experience.map((job) => Number(job.dates.match(/\d{4}/)[0]));
    const sorted = [...startYears].sort((a, b) => b - a);
    expect(startYears).toEqual(sorted);
  });

  it('gives every duty a tag and body', () => {
    experience.forEach((job) => {
      expect(job.duties.length).toBeGreaterThan(0);
      job.duties.forEach((duty) => {
        expect(duty.tag).toBeTruthy();
        expect(duty.text.length).toBeGreaterThan(20);
      });
    });
  });

  it('balances every bold marker in duty and project copy', () => {
    const copy = [
      ...experience.flatMap((j) => j.duties.map((d) => d.text)),
      ...projects.flatMap((p) => p.points),
    ];
    copy.forEach((text) => {
      const markers = text.match(/\*\*/g) ?? [];
      expect(markers.length % 2, `unbalanced ** in: ${text.slice(0, 40)}`).toBe(0);
    });
  });

  it('has a unique tag per duty within a role', () => {
    experience.forEach((job) => {
      const tags = job.duties.map((d) => d.tag);
      expect(new Set(tags).size).toBe(tags.length);
    });
  });

  it('exposes contact links with usable hrefs', () => {
    expect(contact.links.length).toBeGreaterThan(0);
    contact.links.forEach((link) => {
      expect(link.href).toMatch(/^(mailto:|https:\/\/|#)/);
      expect(link.value).toBeTruthy();
    });
  });

  it('marks outbound links as external so they open in a new tab', () => {
    contact.links
      .filter((l) => l.href.startsWith('https://'))
      .forEach((l) => expect(l.external).toBe(true));
  });

  it('has metrics, stack layers, projects and credentials to render', () => {
    expect(metrics.length).toBeGreaterThanOrEqual(4);
    expect(stack.every((layer) => layer.items.length > 0)).toBe(true);
    expect(projects.length).toBeGreaterThan(0);
    expect(credentials.length).toBeGreaterThan(0);
  });
});

describe('topology graph', () => {
  const ids = new Set(nodes.map((n) => n.id));

  it('has unique node ids', () => {
    expect(ids.size).toBe(nodes.length);
  });

  it('only draws edges between nodes that exist', () => {
    edges.forEach(([from, to]) => {
      expect(ids.has(from), `unknown node: ${from}`).toBe(true);
      expect(ids.has(to), `unknown node: ${to}`).toBe(true);
    });
  });

  it('routes every animated flow through real, connected nodes', () => {
    const connected = new Set(edges.map(([a, b]) => `${a}->${b}`));
    flows.forEach((flow) => {
      flow.path.forEach((id) => expect(ids.has(id), `unknown node: ${id}`).toBe(true));
      flow.path.slice(0, -1).forEach((from, i) => {
        const to = flow.path[i + 1];
        expect(
          connected.has(`${from}->${to}`) || connected.has(`${to}->${from}`),
          `flow crosses a non-existent edge: ${from} -> ${to}`,
        ).toBe(true);
      });
    });
  });

  it('leaves no node stranded without an edge', () => {
    const touched = new Set(edges.flat());
    nodes.forEach((n) => expect(touched.has(n.id), `orphan node: ${n.id}`).toBe(true));
  });

  it('gives every node a dossier the panel can render', () => {
    nodes.forEach((n) => {
      expect(n.dossier.title).toBeTruthy();
      expect(n.dossier.blurb.length).toBeGreaterThan(20);
      expect(n.dossier.points.length).toBeGreaterThan(0);
      expect(n.dossier.chips.length).toBeGreaterThan(0);
    });
  });

  it('keeps nodes inside the drawing area', () => {
    nodes.forEach((n) => {
      expect(n.x).toBeGreaterThan(66);
      expect(n.x).toBeLessThan(1000 - 66);
      expect(n.y).toBeGreaterThan(78);
      expect(n.y).toBeLessThan(462);
    });
  });

  it('marks exactly one node as primary', () => {
    expect(nodes.filter((n) => n.primary)).toHaveLength(1);
  });
});

describe('navigation', () => {
  it('has unique section ids', () => {
    const ids = nav.map((n) => n.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('exposes at least one mobile destination', () => {
    expect(nav.some((n) => n.mobile)).toBe(true);
  });

  it('includes the architecture section the topology renders into', () => {
    expect(nav.some((n) => n.id === 'architecture')).toBe(true);
  });
});
