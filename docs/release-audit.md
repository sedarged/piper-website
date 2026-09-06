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

## Verified interaction inventory

| Surface | Desktop | iPhone 375 | iPhone 390 |
| --- | --- | --- | --- |
| Home, worlds, primary navigation and footer | Pass | Pass | Pass |
| Snackville: 8 cast profiles, quiz member card, 20 map hotspots | Pass | — | Map/dialog pass |
| Snackville Studio: Cottage, Memory, Whack-a-Snack, Pattern, Berry Catch | Pass: launch, one playable control and close each | — | — |
| Sandwich Kingdom: 10 profiles and 14 map hotspots | Pass | Hero/characters previously retested; no page overflow | — |
| Crumbhollow: 5 profiles and 12 map hotspots | Pass | Map opens at 75%; dialog overlays navigation; no page overflow | — |
| Mobile navigation and overlays | — | Menu/dialog pass | Menu, profile drawer and map dialog pass |

### Hotspot procedure

All map buttons were exercised in small groups. Each group waits for a modal to
become visible, validates its heading, closes it, and then allows the close
animation to finish before the next click. This avoids the known false negative
caused by clicking through a dialog during its exit transition.

## Automated final gate

- `npm run check`: pass (lint, 23 tests, production build).
- `git diff --check`: pass.
- `world character cut-outs are not placed on copied-paper rectangles`: pass.
- Character WEBPs: verified to carry an alpha channel, including the new
  Sandwich Kitty portrait.

## Release decision

Ready for a review PR after the temporary mobile QA wrapper is removed and the
same automated gate is repeated. No deployment or merge is part of this audit.
