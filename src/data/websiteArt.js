import { ASSET, drive } from "../config.js";

/**
 * Semantic artwork registry for the website.
 *
 * Every entry resolves to one complete high-quality image. Do not put sprite
 * sheets, contact sheets or crop atlases here. Keeping the mapping in one file
 * also makes later master-art upgrades a one-line change per character/world.
 */
export const WEBSITE_ART = {
  characters: {
    piper: { src: drive(ASSET.piper, 1600), alt: "Piper the Strawberry Food Kitten" },
    croissant: { src: drive(ASSET.croissant, 1600), alt: "Croissant Kitty" },
    toast: { src: drive(ASSET.toast, 1600), alt: "Toast Kitty" },
    sandwich: { src: drive(ASSET.sandwich, 1600), alt: "Sandwich Kitty" },
    toastReading: { src: drive(ASSET.toast, 1600), alt: "Toast Kitty" },
  },
  worlds: {
    snackville: { src: "/images/snackville-interactive-map.jpeg", alt: "Snackville, Piper's magical sweet-treat town" },
    crumbhollow: { src: "/images/worlds/crumbhollow-cover.webp", alt: "Crumbhollow, the hidden Pie-Rat village beneath Snackville" },
    sandwich: { src: "/images/worlds/sandwich-cover.webp", alt: "The floating Sandwich Kingdom above the clouds" },
  },
};

export const SQUAD_ART = [
  WEBSITE_ART.characters.piper,
  WEBSITE_ART.characters.croissant,
  WEBSITE_ART.characters.toast,
  WEBSITE_ART.characters.sandwich,
];
