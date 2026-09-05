export function LivingWorldBackdrop({ src, variant }) {
  return (
    <div className={`living-world living-world--${variant}`} aria-hidden="true">
      <img src={src} alt="" decoding="async" />
      <span className="living-world__veil" />
      <span className="living-world__glow living-world__glow--one" />
      <span className="living-world__glow living-world__glow--two" />
      <span className="living-world__drift living-world__drift--one" />
      <span className="living-world__drift living-world__drift--two" />
    </div>
  );
}
