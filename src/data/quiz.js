/**
 * "Which kitten are you?" — four questions, each answer scores toward
 * one of the four cast members by their `key` in cast.js. Whichever key
 * has the most points at the end wins.
 */
export const QUIZ = [
  {
    q: "There is one donut left. What do you do?",
    a: [
      { t: "Cut it into four", k: "sandwich" },
      { t: "Grab it first", k: "croissant" },
      { t: "Build a donut machine", k: "toast" },
      { t: "Ask who wants it most", k: "piper" },
    ],
  },
  {
    q: "Something is making a funny noise outside.",
    a: [
      { t: "Go and see what it is", k: "piper" },
      { t: "Get there before anyone", k: "croissant" },
      { t: "Point a gadget at it", k: "toast" },
      { t: "Stand in front of everyone", k: "sandwich" },
    ],
  },
  {
    q: "Your favourite kind of morning is…",
    a: [
      { t: "Sunny, with a surprise in it", k: "piper" },
      { t: "Very early, before anyone", k: "croissant" },
      { t: "Rainy — good for building", k: "toast" },
      { t: "Busy, with everybody there", k: "sandwich" },
    ],
  },
  {
    q: "A monster appears. It looks a bit sad.",
    a: [
      { t: "Say hello to it", k: "piper" },
      { t: "Run rings round it", k: "croissant" },
      { t: "Work out why it's sad", k: "toast" },
      { t: "Offer it a sandwich", k: "sandwich" },
    ],
  },
];
