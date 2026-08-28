export function SpriteArt({ art, alt = "", className = "", style = {} }) {
  if (!art) return null;
  return (
    <span
      className={className}
      role={alt ? "img" : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        aspectRatio: art.aspectRatio,
        backgroundImage: `url("${art.image}")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: art.backgroundSize,
        backgroundPosition: art.backgroundPosition,
        backgroundColor: "transparent",
        ...style,
      }}
    />
  );
}
