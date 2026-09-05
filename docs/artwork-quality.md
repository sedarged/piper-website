# Website artwork quality contract

The website should render complete approved artwork, not regions cut out of contact sheets or composite reference images.

## Rules

- Character surfaces use complete high-resolution character sources.
- Character cards, drawers and guide avatars protect anatomy with `object-fit: contain` unless a dedicated composition explicitly requires another treatment.
- World surfaces use complete world/cover images; do not reintroduce `ReferenceCrop` or `worlds-homepage-reference.webp` into runtime rendering.
- The Snack Squad chooser is assembled from individual character artwork rather than a baked story-page screenshot.
- `src/data/websiteArt.js` is the semantic upgrade point when a better dedicated master becomes available.
- Do not hide poor artwork with blur, aggressive compression, sprite atlases or arbitrary face/headpiece crops.

These rules are enforced by `tests/artwork-quality.test.js` for the regressions that can be checked statically.
