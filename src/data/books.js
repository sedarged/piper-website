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
    blurb: "Chocolate Volcano is rumbling. Inside it lives a dragon who isn't wicked — only lonely, and prone to sneezing. Piper works out that the answer isn't a battle. It's an invitation.",
    meta: ["Ages 3–7", "36 pages", "In production", "2026"],
  },
  {
    id: 3, num: "Book three", title: "Piper and the Ice Cream Robots", img: ASSET.book3,
    status: "Coming soon", live: false, front: "#184a91",
    blurb: "Friendly ice cream robots suddenly turn Snackville into a frozen maze. Piper and the Snack Squad must follow the mysterious signal, reach their icy factory and bring their new friends back.",
    meta: ["Ages 3–7", "Illustrated adventure", "Coming soon"],
  },
  {
    id: 4, num: "Book four", title: "Piper and the Pizza Dragon", img: ASSET.book4,
    status: "Coming soon", live: false, front: "#a24424",
    blurb: "A furious Pizza Dragon rises above Snackville, growing larger with every angry roar. Piper must uncover the Custard Queen's lie before Pepper's fiery Rising Rage changes the world forever.",
    meta: ["Ages 3–7", "Illustrated adventure", "Coming soon"],
  },
  {
    id: 5, num: "Book five", title: "Piper and the Snackville Pie-rats", img: ASSET.book5,
    status: "Coming soon", live: false, front: "#56331e",
    blurb: "Far beneath Snackville, the Pie-rats guard a glowing underground village of canals, workshops and ancient secrets. Piper follows a trail of golden syrup into their hidden world.",
    meta: ["Ages 3–7", "Illustrated adventure", "Coming soon"],
  },
  {
    id: 6, num: "Book six", title: "Piper and the Sandwich Castle", img: ASSET.book6,
    status: "Coming soon", live: false, front: "#654187",
    blurb: "A sparkling sandwich road climbs through the clouds towards an enchanted royal kingdom. Piper enters a towering castle where every layer hides a puzzle, a promise and a new adventure.",
    meta: ["Ages 3–7", "Illustrated adventure", "Coming soon"],
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
