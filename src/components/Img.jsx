import { useState } from "react";

/**
 * A plain <img> that degrades to a typographic placeholder instead of a
 * broken-image icon if the source fails to load — most relevant while a
 * Google Drive asset ID is still a placeholder or the file's sharing
 * permission hasn't been set to "anyone with the link" yet.
 */
export function Img({ src, alt, fb, style, ...rest }) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        style={{
          width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center",
          background: "var(--paper-3, #FFE3C0)", fontFamily: "var(--d)", fontWeight: 800, fontSize: 26,
          color: "rgba(42,26,46,.4)", textAlign: "center", padding: 10, ...style,
        }}
      >
        {fb}
      </div>
    );
  }

  return <img src={src} alt={alt} onError={() => setFailed(true)} style={style} {...rest} />;
}
