import { useEffect, useRef, useState } from "react";

/**
 * Reports whether the attached element has scrolled into view at least
 * once. Disconnects its own observer after the first reveal — a section
 * that has already animated in never needs to be watched again.
 */
export function useReveal(threshold = 0.14) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -6% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, seen];
}
