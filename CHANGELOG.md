# Changelog

All notable changes to the Piper website are documented here.

## [1.5.0] — 2026-08-24

### Fixed and improved

- Reframed the hero around the real first book cover instead of using a text-heavy interior page as decoration.
- Replaced the spinning-book demo interaction with a quieter editorial collection and explicit Explore / Look Inside actions.
- Changed the primary brand lockup to Piper's Snackville, with Wallace-Siedlarz Books presented as the imprint.
- Added durable local Explorer progress, safe focus isolation behind the intro, eager loading for the reveal and hero, lazy loading below the fold, and a child-friendly top-level recovery screen.
- Replaced the former gate/intro concept with a direct multi-world homepage so every visit begins immediately in the Wallace-Siedlarz storyworld.
- Added a dedicated "Explore more of Piper's world" chooser linking to Snackville, the Snack Squad, the book collection and real inside pages.
- Kept the full Snack Squad visible in the hero at desktop and mobile sizes instead of cropping the characters.
- Replaced remote book placeholders with the supplied covers and eleven optimised interior pages from *The Custard Alien Invasion*.
- Corrected Explorer completion to count all 20 map locations: 30 actions in total, with the final Keeper badge awarded only at full completion.
- Completed fresh browser QA at desktop and a true 390 px mobile viewport, including the homepage, world chooser, map, location dialog, books and Look Inside rail.
- Completed the mobile-first interaction pass: 44px-or-larger tap targets for map markers, a scroll-contained mobile menu and character drawer, a full-width mobile character panel, collision-safe toasts and deliberately swipeable wide map artwork.
- Removed the cinematic intro so every visit opens directly on the main Piper homepage.
- Added proper focus handling, Escape support, focus return and modal semantics to the mobile navigation and character drawer.
- Replaced the simulated book-button control with a native button, so Enter and Space both work without custom keyboard code.
- Corrected the parent/guardian email flow so it never reports success until a configured mailing endpoint accepts the request; validation and delivery errors are announced to assistive technology.

## [1.4.0] — 2026-08-23

### Added

- Replaced the previous eight-stop illustration with the official twenty-location Snackville map supplied for the Piper series.
- Added a keyboard- and touch-accessible hotspot for every numbered location, plus a complete alternate location index.
- Added individual storybook introductions, full location descriptions and Piper Explorer notes for all twenty places.
- Added an accessible field-note dialog with Escape, focus trapping, focus return and mobile bottom-sheet behaviour.

### Preserved

- Kept Explorer progress tracking and retained the Chocolate Dragon sneeze interaction at Chocolate Volcano and Dragon Cave.

## [1.3.0] — 2026-08-22

### Polished

- Completed a full-site interaction and responsive polish pass across the entry flow, hero, story, cast, quiz, map, books, activities and footer.
- Added reliable section scroll offsets, stronger keyboard focus states, touch feedback and resilient narrow-screen layouts.
- Tightened map and book frames, footer rhythm, mobile card spacing and cross-browser surface fallbacks.

## [1.2.0] — 2026-08-22

### Polished

- Refined the approved dark storybook direction without changing the architecture, artwork or interactions.
- Added a warmer editorial page system with layered parchment, book-edge borders, softer child-friendly corners and improved section rhythm.
- Deepened the Snackville portal, character arches, map frame, book presentation and activity cards with restrained dimensional effects.
- Improved map detail contrast, interactive states, keyboard focus, mobile spacing and small-screen typography.
- Added selective strawberry, berry and gold accents so the professional visual system still feels made for children.

## [1.1.0] — 2026-08-22

### Added

- Premium cinematic dark visual system based on the approved mockup #3.
- Editorial Wallace–Siedlarz brand lockup, gold ornament system and portal-style hero.
- Responsive character gallery, premium book catalogue, framed Snackville map and parchment activity surfaces.
- Web manifest, working SVG favicon and BookSeries structured data.
- ESLint configuration, content integrity tests and a single `npm run check` quality gate.
- Visible keyboard skip link and improved focus styling.

### Changed

- Reworked the full typography, spacing, colour, surface, button and motion hierarchy.
- Reordered and renamed navigation around the visitor journey: story, characters, Snackville, books, activities and joining the Squad.
- Rewrote primary homepage copy to communicate Piper and Snackville immediately.
- Replaced broken local social-image metadata with the existing public Snack Squad artwork.
- Added the required preview host configuration without replacing the existing Vite/React architecture.

### Preserved

- Existing gate, treasure hunt, Explorer progress, quiz/member card, character drawer, map hotspots, dragon sneeze, book spins and reduced-motion support.
