/** Successive opaque sky layers fade over those below, avoiding dark dips. */
export function skyAtProgress(progress) {
  const p = Number.isFinite(progress) ? Math.max(0, Math.min(1, progress)) : 0;
  const ramp = (a, b) => Math.max(0, Math.min(1, (p - a) / (b - a)));
  return { dawn: 1, day: ramp(0.04, 0.20), dusk: ramp(0.50, 0.66), night: ramp(0.80, 0.92) };
}
