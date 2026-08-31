# Piper the Strawberry Food Kitten

The Wallace-Siedlarz Productions website and home of the Piper picture-book
storyworlds. Visitors begin on the multi-world homepage, enter Snackville,
meet the Snack Squad, browse the books and turn through real story pages. A
"Join the Snack Squad" quiz becomes a printable member card before ever asking
a parent for an email address.

## Quick start

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`). The dev
server hot-reloads on save.

```bash
npm run build      # production build, output in dist/
npm run preview    # serve the production build locally to sanity-check it
```

## Before you deploy

One thing needs to be set for the site to be fully functional:

**`MAILING_ENDPOINT`** in `src/config.js` — currently empty. The "Send
the pack" form in the Join section will render and validate correctly
without it, but won't actually deliver anywhere until you paste in a
Formspree (or ConvertKit/Mailchimp) form endpoint. See the comment in
`src/config.js` for details.

Everything else — book links, local cover and interior art, character art and
the official interactive map — is already wired to production assets and the
live Amazon listing.

## Project structure

```
src/
  App.jsx              Root component. Owns cross-section state (which
                        treasures are found, which character's drawer is
                        open, the Explorer progress) and the scroll engine.
  main.jsx              Entry point — mounts App and imports the CSS layers.
  config.js             Amazon URL, mailing endpoint and local/remote assets.

  components/           One file per visual piece: Nav, Hero, Cast,
                         CastDrawer, Join, MapHub, Books, Inside, Free,
                         GrownUps, Footer, plus small shared pieces
                         (ErrorBoundary, Reveal, Img, Treasure, Divider, Icons, Landscape)
                         and the FX overlay (FxLayers, ExplorerRing,
                         PiperGuide, Toast, BadgeCelebration).

  data/                  Pure content, no logic: character bios, quiz
                         questions, book details, map locations, treasure
                         hunt items, free printables, nav sections, and
                         Piper's per-section guide messages.

  hooks/                 useChime (Web Audio sound effects), useReveal
                         (scroll-triggered fade-in), and useScrollEngine
                         (see below — read this one before touching
                         anything scroll-related).

  styles/                tokens.css (design tokens, reset, typography,
                         the living sky, parallax layers) and
                         components.css (everything else). tokens.js
                         exports the same palette as JS for inline SVG fills.
```

## Read this before touching scroll behaviour

`src/hooks/useScrollEngine.js` has a long comment at the top explaining
why the sky, parallax layers, and day/night state are driven by direct
DOM writes through refs instead of React state.

Short version: an earlier version stored scroll progress in
`useState`, which triggered a full re-render of the ~700-node page tree
on every scroll frame. Measured before/after with identical tests:

- Before: 2197ms of JS execution across a 14.3s scroll
- After: 484ms of JS execution across a 10.7s scroll

That's roughly 3.4x less JS work per second of scrolling. If you're
adding new scroll-driven visuals, extend `useScrollEngine`'s ref-based
approach rather than reaching for `useState` — it's very easy to
silently reintroduce the jank this hook exists to eliminate.

## The Explorer progress system

Six hidden treasures, twenty map locations, six explored books, completing
the quiz, and reaching nightfall — 30 actions total (see
`data/treasures.js`, `TOTAL_ACTIONS`). Every interactive component
calls `mark(uniqueKey)` (passed down from `App.jsx`) when its action
completes; `mark` is idempotent, so calling it twice for the same key
is harmless. Progress is saved locally in the visitor's browser. Crossing
6, 18, or 30 fires a badge celebration.

If you add a new interactive thing that should count toward the ring,
bump `TOTAL_ACTIONS` in `data/treasures.js` and call `mark()` with a
new, unique key from wherever that interaction lives.

## Known placeholders

- **The five parallax landscape layers** (`components/Landscape.jsx`)
  are flat vector illustrations, not painted artwork. See
  `docs/asset-list.md`, Part 1, for generation prompts to replace them.
- **Two of the five Activities cards** (`data/printables.js`, the
  Snackville map poster and the Snack Squad badge) still have an empty
  `url` until the actual PDFs exist, and show a "coming soon" state
  instead of a dead link. The other three cards are real playable
  mini-games (see `components/games/`), not print-and-wait
  placeholders. See `docs/asset-list.md`, Part 4.

## Testing

Run `npm test` for the content and interaction-contract suite, or
`npm run check` for lint, tests and the production build. Browser QA is also
required for the homepage, navigation, map dialog, book controls and responsive
layouts before a release is signed off.

## Deploying

The production target is Cloudflare Pages under the project name
`wallace-siedlarz`. Connect this repository and configure:

- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: repository root

Until a custom domain is connected, the intended public address is
`https://wallace-siedlarz.pages.dev` (subject to Cloudflare project-name
availability).
