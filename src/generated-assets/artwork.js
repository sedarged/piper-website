import c0 from "./characters-00.js";
import c1 from "./characters-01.js";
import c2 from "./characters-02.js";
import c3 from "./characters-03.js";
import w0 from "./worlds-00.js";
import w1 from "./worlds-01.js";
import w2 from "./worlds-02.js";
import w3 from "./worlds-03.js";
import l0 from "./locations-00.js";
import l1 from "./locations-01.js";
import l2 from "./locations-02.js";

const dataUri = (...parts) => `data:image/webp;base64,${parts.join("")}`;

export const CHARACTER_SPRITE = dataUri(c0, c1, c2, c3);
export const WORLD_SPRITE = dataUri(w0, w1, w2, w3);
export const LOCATION_SPRITE = dataUri(l0, l1, l2);

const spriteCell = (image, columns, rows, col, row, aspectRatio = "2 / 3") => ({
  image,
  backgroundSize: `${columns * 100}% ${rows * 100}%`,
  backgroundPosition: `${columns === 1 ? 0 : (col / (columns - 1)) * 100}% ${rows === 1 ? 0 : (row / (rows - 1)) * 100}%`,
  aspectRatio,
});

// 4 x 2 character sprite. These are the corrected website references from the
// August asset batch, not the older Drive portraits.
export const CHARACTER_ART = {
  piper: spriteCell(CHARACTER_SPRITE, 4, 2, 0, 0),
  croissant: spriteCell(CHARACTER_SPRITE, 4, 2, 1, 0),
  toast: spriteCell(CHARACTER_SPRITE, 4, 2, 2, 0),
  sandwich: spriteCell(CHARACTER_SPRITE, 4, 2, 3, 0),
  squad: spriteCell(CHARACTER_SPRITE, 4, 2, 0, 1),
  toastReading: spriteCell(CHARACTER_SPRITE, 4, 2, 1, 1),
  croissantStanding: spriteCell(CHARACTER_SPRITE, 4, 2, 2, 1),
  piperAlt: spriteCell(CHARACTER_SPRITE, 4, 2, 3, 1),
};

// 3 x 2 story-world sprite.
export const WORLD_ART = {
  snackville: spriteCell(WORLD_SPRITE, 3, 2, 0, 0),
  island: spriteCell(WORLD_SPRITE, 3, 2, 1, 0),
  pieRats: spriteCell(WORLD_SPRITE, 3, 2, 2, 0),
  sandwichKingdom: spriteCell(WORLD_SPRITE, 3, 2, 0, 1),
  sandwichAdventure: spriteCell(WORLD_SPRITE, 3, 2, 1, 1),
  iceCreamRobots: spriteCell(WORLD_SPRITE, 3, 2, 2, 1),
};

// 4 x 3 location sprite built from the remaining generated Snackville artwork.
export const LOCATION_ART = {
  cloudKingdom: spriteCell(LOCATION_SPRITE, 4, 3, 0, 0),
  jellybeanHill: spriteCell(LOCATION_SPRITE, 4, 3, 1, 0),
  chocolateMountain: spriteCell(LOCATION_SPRITE, 4, 3, 2, 0),
  chocolateVolcano: spriteCell(LOCATION_SPRITE, 4, 3, 3, 0),
  donutTreeVillage: spriteCell(LOCATION_SPRITE, 4, 3, 0, 1),
  chocolateFountainVillage: spriteCell(LOCATION_SPRITE, 4, 3, 1, 1),
  strawberryCottage: spriteCell(LOCATION_SPRITE, 4, 3, 2, 1),
  piperStreet: spriteCell(LOCATION_SPRITE, 4, 3, 3, 1),
  candyVillage: spriteCell(LOCATION_SPRITE, 4, 3, 0, 2),
  castleBySea: spriteCell(LOCATION_SPRITE, 4, 3, 1, 2),
  candyIsland: spriteCell(LOCATION_SPRITE, 4, 3, 2, 2),
  gingerbreadVillage: spriteCell(LOCATION_SPRITE, 4, 3, 3, 2),
};

export const LOCATION_ART_ORDER = Object.values(LOCATION_ART);
