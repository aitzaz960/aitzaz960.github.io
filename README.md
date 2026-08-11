# portfolio

Portfolio site for **Aitzaz Ahmad** — senior full stack engineer, Islamabad.

React + Vite. No UI kit, no CSS framework, no component library — every
element is written for this project.

[**Live site**](https://aitzaz960.github.io/portfolio/)

---

## The idea

An engineering datasheet rather than a brochure. Two diagrams carry the
technical argument, and they answer different questions:

- **The hero trace** — where the time goes inside a single request, hop by
  hop, from gateway to third party.
- **The system** — the shape of the whole architecture. Ten services, the
  stores they read, the routes a request takes. Selecting any node opens
  what the work there involved.

Everything else is deliberately quiet so those two land.

Content is data, not markup: every string lives in `src/data/`, and
components render it. Adding a job to the site means appending an object to
an array and touching no JSX.

Two earlier design directions — an interactive systems console and an
editorial long-form profile — are preserved on the `design-explorations`
branch.

## Quick start

Requires Node 20+ (see `.nvmrc`).

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script | Does |
|---|---|
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint across the project |
| `npm run test` | Vitest suite, single run |
| `npm run test:watch` | Vitest in watch mode |

## Architecture

```
src/
├── data/
│   ├── content.js        every string on the page
│   └── topology.js       service graph + the dossier behind each node
├── hooks/
│   ├── useTheme.js       light/dark, follows the OS, persists safely
│   ├── useInView.js      one-shot IntersectionObserver for reveals
│   └── useScrollSpy.js   active section + page progress, rAF-batched
├── lib/motion.js         reduced-motion helper
├── components/           one per section, plus Reveal / Rich / SystemMap
├── styles/
│   ├── base.css          document reset
│   ├── tokens.css        colour and type variables for both themes
│   ├── layout.css        shell, nav rail, section rhythm
│   ├── sections.css      per-section styling
│   └── motion.css        reveals, reduced motion, print
└── __tests__/            data-integrity and component tests
```

### Decisions worth explaining

**Content is data.** Components never hardcode copy, so a content edit
carries no risk of breaking layout — and the topology diagram is generated
from the same graph the tests validate, rather than hand-drawn.

**Theme by attribute, not re-render.** Switching light/dark writes one
attribute on `<html>`. No component re-renders; CSS custom properties do
the work.

**No layout reads on scroll.** `useScrollSpy` batches measurement into
`requestAnimationFrame`, so scrolling never forces synchronous layout.

**Accessibility is structural, not bolted on.** `useInView` returns `true`
immediately under `prefers-reduced-motion`, so content is never gated
behind an animation that will not run. The SVG topology nodes are real
controls — focusable, keyboard-operable, with `aria-pressed` state — and
below 720px the graph is replaced by a plain button list, because a
ten-node diagram is not readable on a phone.

**A twelve-line markdown parser instead of a dependency.** `Rich.jsx`
renders `**bold**` from the content files. That is the only formatting
the copy needs; a markdown library would be 40 kB for one feature.

## Testing

```bash
npm run test
```

29 tests across two files. They target the parts that fail silently:

- **Data integrity** — every topology edge references a node that exists,
  every animated flow traverses edges that exist, no node is orphaned,
  emphasis markers are balanced, experience stays in reverse-chronological
  order, outbound links are marked external.
- **Components** — the markdown parser, the topology map's mouse *and*
  keyboard interaction paths, and a regression test for the connector
  geometry: nodes sharing a column need a vertical curve, because running
  horizontal S-curve maths on them draws a fishhook that loops back past
  the target.

A typo in a node id is invisible at build time and shows up in production
as a blank panel. These tests catch that class of bug, which is the only
reason they are worth writing.

## CI/CD

Two workflows in `.github/workflows/`:

- **`ci.yml`** — lint, test and build on every push and pull request.
- **`deploy.yml`** — on `main`, re-verifies then publishes to GitHub Pages.

The deploy job runs lint and tests again before building, so a broken
`main` cannot reach production. Permissions are least-privilege and
concurrent deployments are cancelled rather than queued.

### Enabling Pages

1. **Settings → Pages → Source: GitHub Actions.**
2. Push to `main`.

`vite.config.js` sets `base: './'`, so the build works at both
`user.github.io/` and `user.github.io/repo/` without configuration.

## Licence

MIT — see [LICENSE](LICENSE).
