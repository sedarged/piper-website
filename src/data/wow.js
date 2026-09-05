/**
 * The twenty signature "wow" effects — one per Snackville map location,
 * keyed by that location's own `id` (see data/places.js).
 *
 * The brief for this table is that no two locations may *feel* alike.
 * Recolouring one template twenty times is exactly what it exists to
 * avoid, so every entry is unique along all four of these axes at once:
 *
 *   reaction   How the whole screen responds. Twenty distinct named
 *              animations (see the `--rx-*` blocks in styles/wow.css) —
 *              the volcano's multi-axis quake, the dragon's slow
 *              sleeping breath, the cart's sideways roll, the caves'
 *              icy freeze. Every location has its own; none is reused.
 *
 *   particles  Which sprite falls/rises/drifts, and — more importantly
 *              — *how*. Each `kind` maps to its own CSS keyframe with
 *              its own trajectory and easing, so the fort's bricks slam
 *              down and stop dead while the park's donuts swing like
 *              pendulums, even though both are "things falling".
 *              Locations that use a different mechanic entirely
 *              (streaks, rings, confetti) have no particles at all.
 *
 *   wash       An optional full-screen colour wash with its own shape
 *              and timing: the volcano's ember flare, the landing
 *              site's alien scan-beam sweeping down the screen, the
 *              caves' frost creeping in from the edges.
 *
 *   sound      A synthesised voice, not a single ping — a doorbell
 *              phrase, a two-tone siren, a whoosh, a snore, a theremin
 *              with vibrato, a shimmering arpeggio. See hooks/useChime.js
 *              for the shape of these.
 *
 * The one-line `signature` on each entry is the intended feel, kept
 * next to the parameters that produce it so the two can be checked
 * against each other. tests/content.test.js asserts the uniqueness this
 * table promises, so a future edit can't quietly collapse two
 * locations back into the same effect.
 */
export const WOW_FX = {
  cottage: {
    signature: "A warm doorbell — the whole screen glows and hearts waft up from the garden.",
    reaction: "glow",
    particles: { kind: "heart", count: 12, life: 2600 },
    wash: { kind: "warm", life: 900 },
    sound: {
      type: "triangle",
      notes: [{ f: 784, t: 0, d: 0.34 }, { f: 587, t: 0.16, d: 0.44 }, { f: 659, t: 0.46, d: 0.5 }],
    },
    toastTitle: "Ding dong!",
    toastBody: "The cottage bell rang all through the garden.",
    guide: "Piper says the bell means someone's welcome for tea.",
  },

  "berry-patch": {
    signature: "A quick leafy rustle, then berries tumble down and bounce off the bottom.",
    reaction: "rustle",
    particles: { kind: "berry", count: 16, life: 2600 },
    sound: {
      type: "sine",
      notes: [{ f: 392, t: 0, d: 0.14 }, { f: 330, t: 0.1, d: 0.2 }, { f: 294, t: 0.22, d: 0.26 }],
    },
    toastTitle: "Berry shower!",
    toastBody: "The berry bush let go of everything it was holding.",
    guide: "Piper says that happens when you tickle the roots.",
  },

  hq: {
    signature: "A two-tone siren, hard alarm pulses and green rings sweeping outward.",
    reaction: "alarm",
    rings: { count: 4, color: "#6F9C7E" },
    wash: { kind: "signal", life: 1100 },
    sound: {
      type: "square",
      gain: 0.05,
      notes: [
        { f: 494, t: 0, d: 0.22 }, { f: 370, t: 0.2, d: 0.22 },
        { f: 494, t: 0.4, d: 0.22 }, { f: 370, t: 0.6, d: 0.26 },
      ],
    },
    toastTitle: "Alert!",
    toastBody: "The golden S is glowing — Snackville needs a hero.",
    guide: "That's the signal. Something's about to happen.",
  },

  square: {
    signature: "A party pop — the page bounces and the square fills with confetti.",
    reaction: "pop",
    confettiBurst: 46,
    wash: { kind: "gold", life: 520 },
    sound: {
      type: "triangle",
      notes: [
        { f: 523, t: 0, d: 0.13 }, { f: 659, t: 0.09, d: 0.13 },
        { f: 784, t: 0.18, d: 0.13 }, { f: 1046, t: 0.27, d: 0.4 },
      ],
    },
    toastTitle: "Piñata!",
    toastBody: "Candy Path Square just got a lot more colourful.",
    guide: "Somebody's going to be sweeping confetti for a week.",
  },

  fountain: {
    signature: "A glugging pour — the screen ripples while chocolate arcs up and falls back.",
    reaction: "ripple",
    particles: { kind: "fountain", count: 16, life: 2200 },
    sound: {
      type: "sine",
      slide: 0.5,
      notes: [{ f: 330, t: 0, d: 0.3 }, { f: 262, t: 0.14, d: 0.34 }, { f: 196, t: 0.3, d: 0.4 }],
    },
    toastTitle: "Splash!",
    toastBody: "The fountain overflowed with warm chocolate.",
    guide: "Careful — it's warmer than it looks.",
  },

  "sweet-treats-street": {
    signature: "The page drifts on the breeze as cinnamon spirals upward.",
    reaction: "waft",
    particles: { kind: "aroma", count: 12, life: 2900 },
    wash: { kind: "spice", life: 1400 },
    sound: {
      type: "sine",
      slide: 1.9,
      gain: 0.05,
      notes: [{ f: 440, t: 0, d: 0.55 }, { f: 554, t: 0.22, d: 0.5 }],
    },
    toastTitle: "Mmm, cinnamon!",
    toastBody: "The bakery bell brought the whole street outside.",
    guide: "Follow your nose. It never lies on this street.",
  },

  "cupcake-cart": {
    signature: "A double bell and a sideways roll, leaving sugar stars popping in its wake.",
    reaction: "roll",
    particles: { kind: "trailstar", count: 10, life: 2400 },
    sound: {
      type: "triangle",
      gain: 0.07,
      notes: [
        { f: 1175, t: 0, d: 0.16 }, { f: 1175, t: 0.16, d: 0.16 },
        { f: 880, t: 0.34, d: 0.3 },
      ],
    },
    toastTitle: "Ding ding!",
    toastBody: "The cart rattled past, leaving sugar stars behind.",
    guide: "Its wheels always leave a trail like that.",
  },

  "croissant-house": {
    signature: "A single hard whoosh — the view lurches as Croissant Kitty blurs past.",
    reaction: "zoom",
    streaks: { count: 1, image: "croissant" },
    speedLines: { count: 14 },
    sound: {
      type: "sawtooth",
      slide: 0.22,
      gain: 0.05,
      notes: [{ f: 1400, t: 0, d: 0.36 }],
    },
    toastTitle: "Whoosh!",
    toastBody: "Croissant Kitty just zoomed past the weather vane.",
    guide: "Blink and you'll miss her. She's the fastest in Snackville.",
  },

  "sandwich-fort": {
    signature: "One heavy slam with no rebound — bricks drop, land hard and stay put.",
    reaction: "slam",
    particles: { kind: "brick", count: 9, life: 1700 },
    sound: {
      type: "sawtooth",
      slide: 0.4,
      gain: 0.09,
      notes: [{ f: 150, t: 0, d: 0.34 }, { f: 98, t: 0.06, d: 0.4 }],
    },
    toastTitle: "Thud!",
    toastBody: "The drawbridge slammed shut, safe and sound.",
    guide: "Sandwich Kitty built it strong enough for twelve kittens.",
  },

  workshop: {
    signature: "An electric zap — the screen stutters and sparks arc out and droop.",
    reaction: "flicker",
    particles: { kind: "spark", count: 20, life: 1100 },
    sound: {
      type: "square",
      slide: 2.6,
      gain: 0.045,
      notes: [{ f: 620, t: 0, d: 0.1 }, { f: 900, t: 0.08, d: 0.09 }, { f: 1300, t: 0.15, d: 0.12 }],
    },
    toastTitle: "Ping!",
    toastBody: "Toast Kitty's invention sparked to life.",
    guide: "That's usually a good sign. Usually.",
  },

  "donut-park": {
    signature: "The page sways like a branch while donuts swing down on invisible strings.",
    reaction: "sway",
    particles: { kind: "donut", count: 11, life: 2700 },
    sound: {
      type: "triangle",
      notes: [{ f: 466, t: 0, d: 0.2 }, { f: 622, t: 0.14, d: 0.2 }, { f: 466, t: 0.3, d: 0.3 }],
    },
    toastTitle: "Donut rain!",
    toastBody: "The whole tree let go at once. Breakfast, sorted.",
    guide: "Croissant Kitty is already down there catching them.",
  },

  "jellybean-hill": {
    signature: "Three rising boings as beans hop along the ground and the page hops with them.",
    reaction: "hop",
    particles: { kind: "jellybean", count: 14, life: 2600 },
    sound: {
      type: "sine",
      slide: 2.2,
      notes: [{ f: 262, t: 0, d: 0.16 }, { f: 349, t: 0.16, d: 0.16 }, { f: 440, t: 0.32, d: 0.24 }],
    },
    toastTitle: "Jellybeans everywhere!",
    toastBody: "The barrel rolled a little too far downhill.",
    guide: "Blue ones bounce highest, according to Piper.",
  },

  "croissant-bridge": {
    signature: "A record-breaking dash — the screen snaps sideways under three fast crossings.",
    reaction: "dash",
    streaks: { count: 3, image: "bridge" },
    sound: {
      type: "triangle",
      slide: 1.8,
      notes: [{ f: 659, t: 0, d: 0.12 }, { f: 880, t: 0.1, d: 0.12 }, { f: 1319, t: 0.22, d: 0.34 }],
    },
    toastTitle: "Ding!",
    toastBody: "Someone just set a new crossing record.",
    guide: "The bell only rings for the fastest paws.",
  },

  "cloud-bridge": {
    signature: "A soft boing — everything squashes and stretches as the clouds puff up.",
    reaction: "spring",
    particles: { kind: "cloud", count: 11, life: 2600 },
    sound: {
      type: "sine",
      gain: 0.07,
      notes: [{ f: 330, t: 0, d: 0.2, slide: 2.4 }, { f: 660, t: 0.18, d: 0.3, slide: 0.5 }],
    },
    toastTitle: "Boing!",
    toastBody: "The whipped-cream clouds bounced you right up.",
    guide: "Soft, bouncy, and always pointing home.",
  },

  volcano: {
    signature: "A deep rumble and a hard quake as chocolate erupts upward, then rains back down.",
    reaction: "quake",
    particles: { kind: "chocolate", count: 14, life: 2800 },
    wash: { kind: "ember", life: 1200 },
    sound: {
      type: "sawtooth",
      slide: 0.55,
      gain: 0.1,
      notes: [{ f: 110, t: 0, d: 0.7 }, { f: 82, t: 0.12, d: 0.66 }, { f: 165, t: 0.3, d: 0.4 }],
    },
    toastTitle: "Bless you!",
    toastBody: "The Chocolate Dragon sneezed. That happens a lot.",
    guide: "He does that. He's not cross — he's just dusty.",
  },

  "hidden-cave": {
    signature: "Everything hushes and darkens; something twinkles in the shadows.",
    reaction: "hush",
    particles: { kind: "glint", count: 8, life: 1600 },
    wash: { kind: "shadow", life: 1500 },
    sound: {
      type: "triangle",
      slide: 3.2,
      gain: 0.055,
      notes: [{ f: 1568, t: 0, d: 0.5 }],
    },
    toastTitle: "Shh...",
    toastBody: "Something glinted in the shadows of the cave.",
    guide: "Toast Kitty says bring a torch next time.",
  },

  "dragon-cave": {
    signature: "A slow sleeping breath — the page swells and settles as smoke rings drift up.",
    reaction: "breathe",
    particles: { kind: "smoke", count: 9, life: 2600 },
    sound: {
      type: "sawtooth",
      slide: 0.75,
      gain: 0.075,
      notes: [{ f: 87, t: 0, d: 0.85 }, { f: 131, t: 0.55, d: 0.7 }],
    },
    toastTitle: "Roooar... *sniff*",
    toastBody: "The dragon stirred in his sleep, puffing smoke rings.",
    guide: "He's not awake yet. Just dreaming, probably.",
  },

  "chocolate-river": {
    signature: "A lazy current — the page floats sideways while a boat bobs downstream.",
    reaction: "drift",
    particles: { kind: "boat", count: 6, life: 3400 },
    sound: {
      type: "sine",
      slide: 0.6,
      gain: 0.06,
      notes: [{ f: 880, t: 0, d: 0.12 }, { f: 587, t: 0.18, d: 0.16 }, { f: 740, t: 0.4, d: 0.2 }],
    },
    toastTitle: "Ripple!",
    toastBody: "A marshmallow boat drifted safely down the river.",
    guide: "Never race a marshmallow boat after lunchtime.",
  },

  "landing-site": {
    signature: "A wavering theremin as a scan-beam sweeps down and footprints press into the dust.",
    reaction: "beam",
    particles: { kind: "footprint", count: 8, life: 3000 },
    wash: { kind: "beam", life: 1700 },
    sound: {
      type: "sine",
      slide: 1.7,
      gain: 0.06,
      vibrato: { rate: 13, depth: 26 },
      notes: [{ f: 620, t: 0, d: 0.75 }],
    },
    toastTitle: "Beep boop!",
    toastBody: "Tiny footprints sparkled in the dust for a moment.",
    guide: "The custard aliens might be closer than you think.",
  },

  "ice-cream-caves": {
    signature: "A shimmering arpeggio as the colour drains and frost creeps in from the edges.",
    reaction: "freeze",
    particles: { kind: "frost", count: 16, life: 2600 },
    wash: { kind: "frost", life: 1800 },
    sound: {
      type: "triangle",
      gain: 0.05,
      notes: [
        { f: 1046, t: 0, d: 0.3 }, { f: 1319, t: 0.1, d: 0.3 },
        { f: 1568, t: 0.2, d: 0.3 }, { f: 2093, t: 0.3, d: 0.5 },
      ],
    },
    toastTitle: "The caves echo back!",
    toastBody: "Something sparkly answered from deep inside.",
    guide: "Toast Kitty thinks it's the door he's been looking for.",
  },
};
