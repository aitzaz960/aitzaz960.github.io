import { useMemo } from 'react';

import { edges, flows, nodes } from '../data/topology';

const NODE_W = 132;
const NODE_H = 46;
/** Cropped to the node bounds so the diagram never floats in dead space. */
const VIEW = '0 78 1000 384';

const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

/**
 * Connector between two node edges.
 *
 * Nodes in the same column need a vertical curve — running the horizontal
 * S-curve maths on them produces a fishhook that loops back past the target.
 */
function leg(a, b) {
  const sameColumn = Math.abs(b.x - a.x) < NODE_W;

  if (sameColumn) {
    const down = b.y > a.y;
    const y1 = a.y + (down ? NODE_H / 2 : -NODE_H / 2);
    const y2 = b.y + (down ? -NODE_H / 2 : NODE_H / 2);
    const bend = Math.max(20, Math.abs(y2 - y1) * 0.42) * (down ? 1 : -1);
    return {
      move: `M ${a.x} ${y1}`,
      curve: `C ${a.x} ${y1 + bend}, ${b.x} ${y2 - bend}, ${b.x} ${y2}`,
      exit: { x: b.x + NODE_W / 2, y: b.y },
    };
  }

  const x1 = a.x + NODE_W / 2;
  const x2 = b.x - NODE_W / 2;
  const bend = Math.max(36, (x2 - x1) * 0.55);
  return {
    move: `M ${x1} ${a.y}`,
    curve: `C ${x1 + bend} ${a.y}, ${x2 - bend} ${b.y}, ${x2} ${b.y}`,
    exit: { x: b.x + NODE_W / 2, y: b.y },
  };
}

function wirePath(a, b) {
  const { move, curve } = leg(a, b);
  return `${move} ${curve}`;
}

/**
 * One continuous path per flow, bridged straight across each node it passes
 * through — a packet is visibly consumed by a service rather than
 * teleporting around it.
 */
function flowPath(ids) {
  const segs = [];
  ids.slice(0, -1).forEach((from, i) => {
    const a = byId[from];
    const b = byId[ids[i + 1]];
    const { move, curve, exit } = leg(a, b);
    if (i === 0) segs.push(move);
    segs.push(curve);
    if (i < ids.length - 2) segs.push(`L ${exit.x} ${exit.y}`);
  });
  return segs.join(' ');
}

export default function SystemMap({ activeId, onSelect }) {
  const wires = useMemo(
    () => edges.map(([from, to]) => ({
      key: `${from}-${to}`,
      from,
      to,
      d: wirePath(byId[from], byId[to]),
    })),
    [],
  );

  const packets = useMemo(
    () => flows.map((f) => ({ ...f, d: flowPath(f.path), key: f.path.join('-') })),
    [],
  );

  const isHot = (wire) => activeId && (wire.from === activeId || wire.to === activeId);

  return (
    <>
      <svg
        className="map__svg"
        viewBox={VIEW}
        role="group"
        aria-label="Service topology. Select a node to read about that part of the system."
      >
        <g>
          {wires.map((wire) => (
            <path key={wire.key} d={wire.d} className={`wire ${isHot(wire) ? 'is-hot' : ''}`} />
          ))}
        </g>

        {/* Ambient traffic, following routes the system really takes. */}
        <g aria-hidden="true" className="packets">
          {packets.map((p) => (
            <circle key={p.key} r="3.5" className="packet">
              <animateMotion
                dur={`${p.duration}s`}
                begin={`${p.delay}s`}
                path={p.d}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0;1;1;1;0"
                keyTimes="0;0.06;0.5;0.94;1"
                dur={`${p.duration}s`}
                begin={`${p.delay}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </g>

        <g>
          {nodes.map((node) => {
            const active = node.id === activeId;
            return (
              <g
                key={node.id}
                className={`snode ${active ? 'is-active' : ''} ${node.primary ? 'snode--primary' : ''}`}
                transform={`translate(${node.x - NODE_W / 2}, ${node.y - NODE_H / 2})`}
                role="button"
                tabIndex={0}
                aria-pressed={active}
                aria-label={`${node.label}${node.sub ? `, ${node.sub}` : ''}`}
                onClick={() => onSelect(node.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelect(node.id);
                  }
                }}
              >
                <rect width={NODE_W} height={NODE_H} />
                <text x={NODE_W / 2} y={node.sub ? 21 : 28} textAnchor="middle">
                  {node.label}
                </text>
                {node.sub && (
                  <text className="snode__sub" x={NODE_W / 2} y="35" textAnchor="middle">
                    {node.sub}
                  </text>
                )}
              </g>
            );
          })}
        </g>
      </svg>

      {/* Below 720px the graph stops being readable, so the same choice is
          offered as a plain list. Identical data, appropriate control. */}
      <div className="map__picker">
        {nodes.map((node) => (
          <button
            key={node.id}
            type="button"
            className={`map__pick ${node.id === activeId ? 'is-on' : ''}`}
            onClick={() => onSelect(node.id)}
            aria-pressed={node.id === activeId}
          >
            {node.label}
          </button>
        ))}
      </div>
    </>
  );
}
