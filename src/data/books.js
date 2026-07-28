import { ASSET } from "../config.js";
import { C } from "../styles/tokens.js";

export const BOOKS = [
  {
    id: 1, num: "Book one", title: "Piper and the Custard Alien Invasion", img: ASSET.book1,
    status: "Out now", live: true, front: C.strawberry, spine: C.strawberryD,
    blurb: "Gooey custard aliens are falling out of the Snackville sky, and the Custard Queen is behind it. Four small kittens decide that somebody has to do something, and that somebody is them.",
    meta: ["Ages 3–7", "32 pages", "Paperback", "Amazon UK"],
  },
  {
    id: 2, num: "Book two", title: "Piper and the Chocolate Volcano", img: ASSET.book2,
    status: "Coming soon", live: false, front: C.cocoa, spine: C.cocoaD,
    blurb: "Chocolate Mountain is rumbling. Inside it lives a dragon who isn't wicked — only lonely, and prone to sneezing. Piper works out that the answer isn't a battle. It's an invitation.",
    meta: ["Ages 3–7", "36 pages", "In production", "2026"],
  },
];

export const SPREADS = [
  { img: ASSET.p2, t: "It was a beautiful morning in Snackville." },
  { img: ASSET.p3, t: "Piper was halfway through a strawberry milkshake when the ground went RUMBLE." },
  { img: ASSET.p5, t: "A dark cloud climbed out of Chocolate Mountain and sat on the sky." },
  { img: ASSET.p15, t: "Deep inside the volcano, something very large sniffed, and sneezed." },
  { img: ASSET.p26, t: "“You don't have to be on your own,” said Piper. “We can be your friends.”" },
  { img: ASSET.p34, t: "Snackville was safe. The dragon was happy. Nobody went home early." },
];
