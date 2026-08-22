import { useEffect, useRef } from "react";

/**
 * ARCHITECTURE NOTE — read this before touching scroll behaviour.
 *
 * Earlier versions of this site stored scroll progress in React state
 * (`const [prog, setProg] = useState(0)`) and derived the sky colours,
 * sun/moon position, and the day/night flag from it via useMemo. That
 * meant every single scroll frame triggered a full React re-render of
 * the ~700-node page tree, just to recompute which sky gradient should
 * be visible.
 *
 * Measured impact (real wheel-scroll + Chrome DevTools tracing,
 * identical test before/after):
 *   Before: 2197ms of JS execution across a 14.3s scroll  (~15% of scroll time)
 *   After:   484ms of JS execution across a 10.7s scroll  (~4.5% of scroll time)
 *
 * ~3.4x less JS work per second of scrolling. The fix: everything
 * visual that changes on scroll (parallax layers, sky layer opacities,
 * the stars layer, the sun/moon position and colour, the `data-night`
 * attribute) is written directly to the DOM via refs, inside a single
 * requestAnimationFrame loop, entirely outside React's render cycle.
 *
 * React is only told about the day/night change ONCE, at the moment it
 * crosses the threshold — purely so the "reached nightfall" achievement
 * can fire. It is never told about intermediate scroll positions.
 *
 * DO NOT reintroduce `useState` for scroll position or sky phase without
 * re-measuring. It will silently bring back the jank this hook exists
 * to eliminate.
 */
export function useScrollEngine({ landRefs, skyRefs, sunmoonRef, rootRef, onNightfall, reduceMotion }) {
  const nightRef = useRef(false);
  const onNightfallRef = useRef(onNightfall);
  onNightfallRef.current = onNightfall; // always call the latest callback, without resubscribing

  useEffect(() => {
    let raf = 0;
    let latest = 0;
    let running = false;

    // Each parallax layer travels a fraction of its own overflow. Every
    // landscape SVG is rendered at 200% width, so its overflow exactly
    // equals one viewport width — this guarantees the layer can never
    // run out of runway and show a gap, no matter how long the page is.
    const depth = [0.14, 0.30, 0.50, 0.74, 1.0];
    const seg = (v, a, b) => Math.max(0, Math.min(1, (v - a) / (b - a)));

    const apply = () => {
      running = false;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const p = scrollable > 0 ? Math.min(1, latest / scrollable) : 0;

      // parallax landscape layers
      if (!reduceMotion.current) {
        const over = window.innerWidth;
        landRefs.current.forEach((el, i) => {
          if (el) el.style.transform = `translate3d(${-(p * over * depth[i]).toFixed(1)}px,0,0)`;
        });
      }

      // sky phases: dawn -> day -> dusk -> night, each a 0..1 opacity
      const dawn = 1 - seg(p, 0.04, 0.20);
      const day = seg(p, 0.04, 0.20) * (1 - seg(p, 0.50, 0.66));
      const dusk = seg(p, 0.50, 0.66) * (1 - seg(p, 0.80, 0.92));
      const night = seg(p, 0.80, 0.92);
      if (skyRefs.dawn.current) skyRefs.dawn.current.style.opacity = dawn;
      if (skyRefs.day.current) skyRefs.day.current.style.opacity = day;
      if (skyRefs.dusk.current) skyRefs.dusk.current.style.opacity = dusk;
      if (skyRefs.night.current) skyRefs.night.current.style.opacity = night;
      if (skyRefs.stars.current) skyRefs.stars.current.style.opacity = Math.max(0.6, night);

      // sun/moon position + colour
      const nightOn = night > 0.5;
      if (sunmoonRef.current) {
        const el = sunmoonRef.current;
        el.style.top = `${12 + Math.sin(p * Math.PI) * -6 + p * 22}vh`;
        el.style.background = nightOn
          ? "radial-gradient(circle at 38% 34%, #FFF6E9, #E8D9B8)"
          : `radial-gradient(circle at 38% 34%, #FFF3B0, ${dusk > 0.4 ? "#FF9A4D" : "#FFD447"})`;
        el.style.boxShadow = nightOn
          ? "0 0 60px rgba(255,246,233,.5)"
          : "0 0 80px rgba(255,200,60,.65)";
      }

      // night flag — only touch the DOM attribute directly. Only tell
      // React about it (via the callback) the moment it actually flips.
      if (rootRef.current) rootRef.current.setAttribute("data-night", nightOn ? "1" : "0");
      if (nightOn !== nightRef.current) {
        nightRef.current = nightOn;
        if (nightOn) onNightfallRef.current?.();
      }
    };

    const onScroll = () => {
      latest = window.scrollY;
      if (!running) {
        running = true;
        raf = requestAnimationFrame(apply);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // set correct initial state without waiting for the first scroll event
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
