/**
 * Render a semantic artwork entry from the central website art registry.
 * The registry deliberately points at complete, high-resolution assets —
 * never contact sheets, sprite atlases or destructive crop-sheet regions.
 */
export function ArtImage({ art, alt, className = "", ...props }) {
  const src = typeof art === "string" ? art : art?.src;
  const resolvedAlt = alt ?? (typeof art === "string" ? "" : art?.alt) ?? "";

  if (!src) return null;

  return <img {...props} className={className} src={src} alt={resolvedAlt} />;
}
