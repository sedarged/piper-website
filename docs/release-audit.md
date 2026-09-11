# World pages release audit

## Scope

The approved world structure is exactly **Snackville**, **Sandwich Kingdom** and
**Crumbhollow**. This audit preserves the supplied illustrated maps: map
hotspots are invisible hit areas over their printed numbers, with no added
markers, leader lines, labels or replacement map art.

## Defects found and corrected

| ID | Finding | Correction | Retest evidence |
| --- | --- | --- | --- |
| AQ-01 | Sandwich Kingdom portraits looked as though they were pasted onto pale reference cards. | Replaced `.character-atlas__cards .cc-f { background:#fff8ea }` with a restrained translucent world-light gradient. | Desktop and iPhone character cards render against the world background; regression test added. |
| AQ-02 | Sandwich Kitty’s published Snackville portrait showed cat ears, which conflicts with the character canon. | Added a dedicated no-ear, alpha-transparent canonical portrait and pointed `ASSET.sandwich` at it; original source remains untouched. | iPhone 390 profile drawer visually checked: the bread/sandwich hood has a continuous rounded silhouette and no ears. |
| AQ-03 | Custard Queen was incorrectly described as a benevolent “Royal Protector”, contradicting the Custard Alien Invasion story. | Reframed her card and profile as the mischievous antagonist; preserved child-safe language and the existing approved portrait. | Regression test asserts the antagonist copy and excludes the former protector language. |
| AQ-04 | The official Snackville environment was still overlaid with legacy generic SVG scenery. | Removed the mounted SVG landscape layers; the supplied Snackville environment remains the sole scenic artwork, with its established subtle actors. | Regression test rejects any mounted legacy landscape layer. |
| AQ-05 | The universe homepage was a flat near-black field and borrowed Snackville imagery for its main visual identity. | Added a new neutral Piper-style storyworld crossroads plate, animated depth breathing and independent drifting light motes; no single world is represented. | Desktop and 390px hero/menu screenshots checked with reduced-motion fallback covered by CSS. |
| AQ-06 | Homepage navigation labels visually ran together. | Gave every desktop destination its own bordered tile inside a wider navigation rail with clear hover/focus states. | Desktop header checked at full width; mobile retains the dedicated sheet. |
| AQ-07 | Game boards reused small generic site icons and flat surfaces unrelated to their scenes. | Added eight bespoke illustrated game objects and art-directed each modal/board against a location-appropriate Piper environment. | All five games opened in browser; object scale, contrast and touch targets checked. |
| AQ-08 | The map and badge Studio cards were dead “Coming soon” placeholders. | Built a full-bleed A3 map PDF and four-character A4 badge sheet, plus honest in-card previews and direct downloads. | Both PDFs rendered and inspected at page size; browser links open the real files. |
| AQ-09 | Piper’s floating helper only replayed one passive tip. | Turned the helper into an expandable FAQ guide with four useful navigation/exploration answers and moved it inward/downward. | Open/close, all question buttons and narrow-screen fit checked. |
| AQ-10 | The neutral homepage PNG contained a damaged image stream: Chrome decoded only its top strip, leaving the “Choose a world” hero looking black even though the CSS animation was running. | Re-encoded the original master as a compact, fully valid WebP and made it a real full-bleed animated hero layer. Reduced and repositioned the Snackville portal so the neutral crossroads remains the dominant scene, with a translucent reading panel above it. | The complete illustration renders on desktop and iPhone 375/390; both mobile widths retain the menu, readable actions and zero page-level horizontal overflow. |

## Verified interaction inventory

| Surface | Desktop | iPhone 375 | iPhone 390 |
| --- | --- | --- | --- |
| Home, worlds, primary navigation and footer | World cards, navigation, book call-to-action and footer return pass | Menu and world chooser pass; no page overflow | Menu and world chooser pass; no page overflow |
| Snackville: 8 cast profiles, quiz member card, 20 map hotspots | 8/8 profile cycle, completed quiz card and 20/20 field notes pass; no overflow | Cottage field note and game overlays pass; no page overflow | 8 cast cards, 20 hotspots, Piper profile and map dialog pass; no page overflow |
| Snackville Studio: Cottage, Memory, Whack-a-Snack, Pattern, Berry Catch | All 5 launch, expose their playable starting state and close cleanly | All 5 launch, expose their playable starting state and close cleanly | Overlay interaction and closure pass |
| Sandwich Kingdom: 10 profiles and 14 map hotspots | 10/10 profile cycle and 14/14 field notes pass; official map and internal-only pan retained | 10 cards, map pan and Cheese Road field note pass; no page overflow | 10 cards, Crumbly's Cave dialog and official background pass; no page overflow |
| Crumbhollow: 5 profiles and 12 map hotspots | 5/5 profile cycle and 12/12 field notes pass; official map and internal-only pan retained | 12 hotspots, Shiving Basket Market dialog and internal-only map pan pass; no page overflow | 5 cards, 12 hotspots, Woofer profile and Discovery Ledge dialog pass; no page overflow |
| Mobile navigation and overlays | Character drawers, map dialogs and game overlays close without covering navigation | Menu, Snackville games and map dialog pass | Menu, profile drawer and map dialog pass |

### Hotspot procedure

All map buttons were exercised in small groups. Each group waits for a modal to
become visible, validates its heading, closes it, and then allows the close
animation to finish before the next click. This avoids the known false negative
caused by clicking through a dialog during its exit transition.

## Automated final gate

- `npm run check`: pass (lint, full Node test suite, production build).
- `git diff --check`: pass.
- `world character cut-outs are not placed on copied-paper rectangles`: pass.
- Character WEBPs: verified to carry an alpha channel, including the new
  Sandwich Kitty portrait.

## Release decision

Ready for the final automated gate and source-control review. The browser
regression was completed before commit: desktop plus iPhone 375 and 390 were
checked across the three worlds, menus, maps, dialogs, profiles, books, quiz,
games and footers.
