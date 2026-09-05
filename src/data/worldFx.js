/**
 * Per-world flavour for the two lighter worlds' maps.
 *
 * Snackville's twenty locations each have a fully bespoke effect (see
 * data/wow.js). Sandwich Kingdom and Crumbhollow don't — their maps are
 * a discovery-and-field-note experience rather than a toybox — but they
 * shouldn't feel like the same generic chime and confetti twice over
 * either. So each world gets:
 *
 *   - its own confetti mix, drawn from the shared treasure icons
 *   - its own arrival voice (see hooks/useChime.js): the kingdom's is a
 *     bright fanfare up in the clouds, the hollow's is a low, close
 *     lantern-lit phrase underground
 *   - its own rotation of screen reactions (from styles/wow.css), so
 *     visiting the fourth stop doesn't look identical to the first
 *   - its own "explored everything" celebration voice
 *
 * The reaction for a given location is picked by its position in the
 * world's list, not at random, so the same place always reacts the same
 * way — a child re-tapping a location gets a consistent answer.
 */
export const WORLD_FX = {
  sandwich: {
    confettiKinds: ["croix", "star", "bean"],
    // High, open and airy — a castle in the clouds.
    arrival: {
      type: "triangle",
      notes: [{ f: 698, t: 0, d: 0.16 }, { f: 880, t: 0.11, d: 0.16 }, { f: 1175, t: 0.23, d: 0.34 }],
    },
    complete: {
      type: "triangle",
      notes: [
        { f: 698, t: 0, d: 0.18 }, { f: 880, t: 0.13, d: 0.18 },
        { f: 1046, t: 0.26, d: 0.18 }, { f: 1397, t: 0.39, d: 0.5 },
      ],
    },
    reactions: ["spring", "waft", "glow", "pop", "drift"],
  },

  crumbhollow: {
    confettiKinds: ["donut", "scale", "berry"],
    // Low, close and warm — a lantern-lit burrow under the town.
    arrival: {
      type: "sine",
      gain: 0.07,
      notes: [{ f: 262, t: 0, d: 0.2 }, { f: 349, t: 0.13, d: 0.2 }, { f: 294, t: 0.28, d: 0.3 }],
    },
    complete: {
      type: "sine",
      gain: 0.08,
      notes: [
        { f: 262, t: 0, d: 0.2 }, { f: 330, t: 0.14, d: 0.2 },
        { f: 392, t: 0.28, d: 0.2 }, { f: 523, t: 0.42, d: 0.5 },
      ],
    },
    reactions: ["hush", "rustle", "roll", "breathe", "hop"],
  },
};
