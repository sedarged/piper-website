import { useCallback, useRef } from "react";
import { isMuted } from "../lib/sound.js";

/**
 * Tiny synthesised sound engine, no audio files. Lazily creates one
 * AudioContext on first use (browsers block autoplay before a user
 * gesture, so this must only ever be called from an event handler).
 *
 * Two call shapes:
 *
 *   chime(660, 0.16)     one note — the original signature, still used
 *                        by every button tap, treasure and game
 *   chime({ ... })       a full voice, used by the map's per-location
 *                        signature sounds
 *
 * The object form is what lets twenty map locations sound genuinely
 * different from one another rather than being the same sine ping at
 * twenty pitches:
 *
 *   notes    [{ f, t, d }]  frequency, start offset and length, in
 *                           seconds — a sequence makes a doorbell, an
 *                           arpeggio or a two-tone siren
 *   type     oscillator waveform — "sine" (soft), "triangle" (hollow),
 *            "square" (electric), "sawtooth" (rough/rumbly)
 *   slide    multiplier applied to each note's pitch across its own
 *            length: >1 sweeps up (a whoosh), <1 sweeps down (a glug),
 *            1 holds steady
 *   vibrato  { rate, depth } — a wobble on top of the pitch, for the
 *            landing site's theremin
 *   gain     peak volume, 0..1 (default .08, matching the old ping)
 */
const clampGain = (value) => Math.max(0.0001, Math.min(0.3, value));

export function useChime() {
  const ctxRef = useRef(null);

  return useCallback((freqOrVoice = 660, dur = 0.16) => {
    if (isMuted()) return;
    try {
      if (!ctxRef.current) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        ctxRef.current = new AudioCtx();
      }
      const ctx = ctxRef.current;
      if (ctx.state === "suspended") ctx.resume();

      const voice = typeof freqOrVoice === "number"
        ? { notes: [{ f: freqOrVoice, t: 0, d: dur }], slide: 1.5 }
        : freqOrVoice;

      const {
        notes = [{ f: 660, t: 0, d: 0.16 }],
        type = "sine",
        slide = 1,
        vibrato = null,
        gain: peak = 0.08,
      } = voice;

      const now = ctx.currentTime;

      notes.forEach((note) => {
        const start = now + (note.t || 0);
        const length = note.d || 0.16;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = note.type || type;
        osc.frequency.setValueAtTime(note.f, start);
        const target = note.f * (note.slide || slide);
        // exponentialRampToValueAtTime throws on a zero/negative target and
        // is a no-op when the value doesn't actually change, so a flat note
        // (slide === 1) just holds its starting frequency.
        if (target > 0 && Math.abs(target - note.f) > 0.5) {
          osc.frequency.exponentialRampToValueAtTime(target, start + length);
        }

        // The vibrato LFO is created per note so it's garbage-collected
        // with the note's own oscillator rather than running forever.
        let lfo = null;
        if (vibrato) {
          lfo = ctx.createOscillator();
          const lfoGain = ctx.createGain();
          lfo.frequency.setValueAtTime(vibrato.rate, start);
          lfoGain.gain.setValueAtTime(vibrato.depth, start);
          lfo.connect(lfoGain);
          lfoGain.connect(osc.frequency);
          lfo.start(start);
          lfo.stop(start + length + 0.02);
        }

        const notePeak = clampGain((note.gain || peak));
        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.exponentialRampToValueAtTime(notePeak, start + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + length);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + length + 0.02);
      });
    } catch (_error) {
      /* Web Audio unsupported or blocked — silently do nothing */
    }
  }, []);
}
