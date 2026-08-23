# Design QA — Interactive Snackville Map

- Source visual truth: `/workspace/scratch/e803d50b4375/upload/E8263F91-7CDC-42BC-8BF8-D1F0D61B66A4.jpeg`
- Source pixels: 1536 × 864
- Intended implementation view: Snackville map section, desktop viewport 1440 × 1000 CSS px, device scale factor 1
- Implementation screenshot: unavailable
- State: map loaded with all 20 location hotspots; location detail dialog open
- Density normalization: not performed because the browser-rendered implementation could not be captured

## Full-view comparison evidence

Blocked. The production source uses the supplied official map without redrawing or replacing its embedded artwork, labels, or border. The local preview service reports a running preview, but the required cloud browser cannot reach it and the endpoint is also unavailable to the checkout environment. A screenshot from source code or the static map asset would not be valid render evidence.

## Focused-region comparison evidence

Blocked for the same reason. The hotspot coordinates were derived from the numbered labels in the supplied map and are covered by data and content tests, but their visible alignment cannot be certified without a browser capture.

## Findings

- [P1] Browser-rendered visual evidence is unavailable.
  - Location: interactive map view and location detail dialog.
  - Evidence: source visual is available; implementation screenshot is not.
  - Impact: visual alignment, responsive crop, and modal composition cannot be honestly signed off.
  - Fix: capture desktop and mobile map states when the cloud preview becomes reachable, then compare against the source map at matching scale.

## Interaction evidence available outside visual QA

- All 20 official locations exist as unique, numbered interactive controls.
- Each location has a title, introduction, description, explorer note, and selected state.
- Chocolate Volcano and Dragon Cave invoke the preserved dragon-sneeze interaction.
- Location selection updates the existing Explorer progress system.
- The detail dialog supports Escape, focus trapping, focus return, and body scroll locking.
- Reduced-motion styling disables nonessential hotspot and dialog animation.

## Comparison history

- Pass 1: blocked before visual comparison because the required browser-rendered implementation screenshot could not be produced.
- No visual fixes were made from unverifiable evidence.

## Implementation checklist

- [x] Use the supplied official Snackville map artwork.
- [x] Add 20 clickable and keyboard-accessible locations.
- [x] Add in-world copy for every location.
- [x] Preserve Explorer progress and dragon/volcano behavior.
- [x] Add desktop, tablet, mobile, focus, selected, and reduced-motion styles.
- [ ] Capture and compare desktop and mobile renders once the preview transport is available.

final result: blocked
