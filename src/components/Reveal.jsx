import { useReveal } from "../hooks/useReveal.js";

/**
 * Wraps any content in a scroll-triggered reveal animation. `kind`
 * selects the animation direction via CSS class: "rv" (fade + rise,
 * the default), "rv-up" (rise further, used for editorial cards), or "rv-l"
 * (slide in from the left, used in the hero).
 */
export function Reveal({ children, delay = 0, kind = "rv", as: Tag = "div", className = "", style, ...rest }) {
  const [ref, seen] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`${kind} ${seen ? "in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
