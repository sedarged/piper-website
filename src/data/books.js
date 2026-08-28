import { ASSET } from "../config.js";
import { C } from "../styles/tokens.js";

export const BOOKS = [
  {
    id: 1, num: "Book one", title: "Piper and the Custard Alien Invasion", img: ASSET.book1,
    status: "Out now", live: true, front: C.strawberry,
    blurb: "Gooey custard aliens are falling out of the Snackville sky, and the Custard Queen is behind it. Four small kittens decide that somebody has to do something, and that somebody is them.",
    meta: ["Ages 3–7", "32 pages", "Paperback", "Amazon UK"],
  },
  {
    id: 2, num: "Book two", title: "Piper and the Chocolate Volcano", img: ASSET.book2,
    status: "Coming soon", live: false, front: C.cocoa,
    blurb: "Chocolate Mountain is rumbling. Inside it lives a dragon who isn't wicked — only lonely, and prone to sneezing. Piper works out that the answer isn't a battle. It's an invitation.",
    meta: ["Ages 3–7", "36 pages", "In production", "2026"],
  },
];

export const SPREADS = [
  { img: ASSET.p3, page: 3, t: "Meet the four very special food kittens of Snackville." },
  { img: ASSET.p10, page: 10, t: "One by one, the stars begin to disappear." },
  { img: ASSET.p13, page: 13, t: "Tiny custard aliens bounce through the town." },
  { img: ASSET.p16, page: 16, t: "Piper and the Snack Squad stand together." },
  { img: ASSET.p17, page: 17, t: "Croissant Kitty whirls up a buttery tornado." },
  { img: ASSET.p20, page: 20, t: "The Custard Queen grows bigger and bigger." },
  { img: ASSET.p25, page: 25, t: "The aliens land safely in jelly puddles." },
  { img: ASSET.p26, page: 26, t: "Snackville is saved and the whole town cheers." },
  { img: ASSET.p28, page: 28, t: "The friends wonder whether the aliens will return." },
  { img: ASSET.p29, page: 29, t: "The Snack Squad falls asleep beneath the stars." },
  { img: ASSET.p31, page: 31, t: "Meet Piper, Croissant Kitty, Toast Kitty and Sandwich Kitty." },
];
