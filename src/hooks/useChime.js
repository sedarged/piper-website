import { useCallback, useRef } from "react";

/**
 * Tiny synthesised chime, no audio files. Lazily creates one
 * AudioContext on first use (browsers block autoplay before a user
 * gesture, so this must only ever be called from an event handler).
 */
export function useChime() {
  const ctxRef = useRef(null);

  return useCallback((freq = 660, dur = 0.16) => {
    try {
      if (!ctxRef.current) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        ctxRef.current = new AudioCtx();
      }
      const ctx = ctxRef.current;
      if (ctx.state === "suspended") ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + dur);
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + dur + 0.02);
    } catch (e) {
      /* Web Audio unsupported or blocked — silently do nothing */
    }
  }, []);
}
