This folder is where the brand assets referenced in index.html belong
once they exist: favicon.png, apple-touch-icon.png, og-image.jpg, and
manifest.json. See docs/asset-list.md, Part 3 — Brand identity, for
generation prompts.

Anything placed directly in public/ is copied as-is into the build
output and served from the site root (e.g. public/favicon.png becomes
/favicon.png).

This file exists only so the empty public/ folder isn't dropped by Git
(Git doesn't track empty directories) — delete it once real assets
land here.
