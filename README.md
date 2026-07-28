# Piper the Strawberry Food Kitten

The website for the Piper picture book series, published by Wallace-Siedlarz
Books. A picture-book-for-a-website: a closed book cover opens on click,
scrolling down the page is walking through Snackville from dawn to
nightfall, and a "Join the Snack Squad" quiz turns into a printable member
card before ever asking a parent for an email address.

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

Everything else — book links, character art, the map — is already wired
to real Google Drive assets and the live Amazon listing.

## Project structure

```
src/
  App.jsx              Root component. Owns cross-section state (which
                        treasures are found, which character's drawer is
                        open, the Explorer progress) and the scroll engine.
  main.jsx              Entry point — mounts App, imports the two CSS files.
  config.js             Amazon URL, mailing endpoint, Google Drive asset IDs.

  components/           One file per visual piece: Gate, Nav, Hero, Cast,
                         CastDrawer, Join, MapHub, Books, Inside, Free,
                         GrownUps, Footer, plus small shared pieces
                         (Reveal, Img, Treasure, Divider, Icons, Landscape)
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

Six hidden treasures, eight map locations, two book spins, completing
the quiz, and reaching nightfall — 18 actions total (see
`data/treasures.js`, `TOTAL_ACTIONS`). Every interactive component
calls `mark(uniqueKey)` (passed down from `App.jsx`) when its action
completes; `mark` is idempotent, so calling it twice for the same key
is harmless. Crossing 6, 12, or 18 fires a badge celebration.

If you add a new interactive thing that should count toward the ring,
bump `TOTAL_ACTIONS` in `data/treasures.js` and call `mark()` with a
new, unique key from wherever that interaction lives.

## Known placeholders

- **The five parallax landscape layers** (`components/Landscape.jsx`)
  are flat vector illustrations, not painted artwork. See
  `docs/asset-list.md`, Part 1, for generation prompts to replace them.
- **The six free printables** (`data/printables.js`) all have an empty
  `url` until the actual PDFs exist. Cards route to the Join section
  instead of a dead link in the meantime. See `docs/asset-list.md`,
  Part 4.
- **`public/og-image.jpg`, `public/favicon.png`,
  `public/apple-touch-icon.png`** are referenced in `index.html` but
  don't exist yet. See `docs/asset-list.md`, Part 3.

## Testing

There's no automated test suite in this repo yet — everything so far
has been verified manually with ad-hoc Playwright scripts during
development, not committed as a lasting test suite. Adding one
(Vitest for the quiz-scoring and member-number logic, Playwright for
the full gate → quiz → card → email flow) is on the roadmap; see
`docs/top-tier-plan.md`, item 7.

## Deploying

Any static host that can serve a Vite build works: Vercel, Netlify, or
GitHub Pages are all zero-config for this project — connect the repo
and the build command (`npm run build`) and output directory (`dist`)
are auto-detected by the first two.
