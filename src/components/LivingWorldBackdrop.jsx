const WORLD_ACTORS = {
  snackville: [
    { src: "/images/ambient/pepper-fly.webp", motion: "fly-left", secondary: false },
    { src: "/images/ambient/choco-fly.webp", motion: "fly-left-late", secondary: true },
  ],
  crumbhollow: [
    { src: "/images/ambient/grey-pie-rat-walk.webp", motion: "walk-right", secondary: false },
    { src: "/images/ambient/woofer-walk.webp", motion: "walk-left", secondary: true },
  ],
  sandwich: [
    { src: "/images/ambient/tomato-mouse-walk.webp", motion: "walk-left", secondary: false },
    { src: "/images/ambient/sandwich-citizen-walk.webp", motion: "walk-right", secondary: true },
  ],
};

export function LivingWorldBackdrop({ src, variant }) {
  const actors = WORLD_ACTORS[variant] ?? [];

  return (
    <div className={`living-world living-world--${variant}`} aria-hidden="true">
      <img src={src} alt="" decoding="async" />
      <div className="living-world__actors">
        {actors.map((actor) => (
          <img
            key={actor.src}
            className={`living-world__actor living-world__actor--${actor.motion}${actor.secondary ? " living-world__actor--secondary" : ""}`}
            src={actor.src}
            alt=""
            decoding="async"
          />
        ))}
      </div>
      <span className="living-world__veil" />
      <span className="living-world__atmosphere" />
    </div>
  );
}
