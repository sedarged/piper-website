import { ASSET } from "../config.js";
import { C } from "../styles/tokens.js";

export const CAST = [
  {
    key: "piper", n: "01", name: "Piper", role: "Strawberry Food Kitten", img: ASSET.piper,
    ink: C.strawberry, badge: "Brave",
    line: "Leads the Snack Squad. Braver than she is big.",
    bio: "Piper lives in a cottage with a strawberry for a roof, on the north edge of Snackville. She is the one who says “let's go and see” when everybody else says “let's stay here.”",
    power: "A warm strawberry glow that melts trouble instead of fighting it.",
    secret: "Piper is scared of the dark. She goes anyway.",
  },
  {
    key: "croissant", n: "02", name: "Croissant Kitty", role: "Fastest in town", img: ASSET.croissant,
    ink: C.butter, badge: "Quick",
    line: "Past the cupcake carts before you've seen her tail.",
    bio: "Flaky, buttery and very fast. She delivers the morning bread to every house in Snackville before the sun is properly up, which is why she always knows the news first.",
    power: "A buttery gust that clears any path — she calls it the Whoosh.",
    secret: "She has never once been on time for anything that wasn't bread.",
  },
  {
    key: "toast", n: "03", name: "Toast Kitty", role: "Inventor", img: ASSET.toast,
    ink: C.ember, badge: "Clever",
    line: "Builds machines that beep, buzz, ding and pop.",
    bio: "Toast Kitty's workshop sits under a chimney shaped like a slice of bread. He has never been wrong about which way to go, though often wrong about how long it would take.",
    power: "A waffle-steam puffer that reveals hidden doors and paths.",
    secret: "Invention 41 was a machine for finding lost socks. It is still lost.",
  },
  {
    key: "sandwich", n: "04", name: "Sandwich Kitty", role: "The strong one", img: ASSET.sandwich,
    ink: C.mint, badge: "Kind",
    line: "Lifts a pickle barrel, a cheese wheel and three jelly jars.",
    bio: "When Sandwich Kitty says “behind me,” everybody gets behind him and everybody is fine. He is the largest of the four and the quietest, and he has never broken a promise.",
    power: "Layered sandwich dams that hold back anything, including chocolate.",
    secret: "He cries at happy endings. Every single time.",
  },
];

/**
 * Snackville's full on-page character gallery. The quiz intentionally still
 * uses the four-member CAST above; the wider gallery also introduces the
 * friends and rivals children meet across the Snackville books.
 */
export const SNACKVILLE_CHARACTERS = [
  ...CAST,
  {
    key: "pepper", n: "05", name: "Pepper", role: "Pizza Dragon", img: "/images/characters/snackville/pepper.webp",
    ink: "#D96A2B", badge: "Fiery",
    line: "A warm-hearted dragon with a seriously crispy roar.",
    bio: "Pepper watches over the warm mountain above Snackville. His pizza-patterned wings look fierce, but he would rather guide a lost traveller home than frighten anybody.",
    power: "A spinning pizza-fire gust that lights dark paths without burning them.",
    secret: "He practises tiny, quiet roars when nobody is listening.",
  },
  {
    key: "choco", n: "06", name: "Choco", role: "Chocolate Dragon", img: "/images/characters/snackville/choco.webp",
    ink: "#7A4B35", badge: "Loyal",
    line: "Guardian of the Chocolate Volcano and keeper of its oldest paths.",
    bio: "Choco's cocoa scales glow when the Chocolate Volcano rumbles. He knows every tunnel beneath it and never leaves a friend behind when the ground begins to shake.",
    power: "A rich cocoa shield that cools hot stone and steadies trembling bridges.",
    secret: "The fiercest-looking dragon in Snackville loves marshmallow tea.",
  },
  {
    key: "custard-queen", n: "07", name: "Custard Queen", role: "Royal Protector", img: "/images/characters/snackville/custard-queen.webp",
    ink: "#B7892F", badge: "Royal",
    line: "A bold custard monarch with a kingdom-sized heart.",
    bio: "The Custard Queen arrives with a jewelled spoon crown, a magnificent purple cape and enough confidence to fill a palace. She learns that the strongest royal order can be an act of kindness.",
    power: "Her custard sceptre raises golden shields around anyone who needs help.",
    secret: "She keeps every thank-you note tucked inside her crown box.",
  },
  {
    key: "ice-cream-robots", n: "08", name: "Ice Cream Robots", role: "Frozen Friends", img: "/images/characters/snackville/ice-cream-robots.webp",
    ink: "#4F86B7", badge: "Cool",
    line: "Scoop-topped machines with blinking eyes and a friendly mission.",
    bio: "The Ice Cream Robots wake inside the shimmering caves with frosted shells, cherry antennae and a lot to learn about Snackville. Together they turn a chilly mystery into a new friendship.",
    power: "Perfectly timed snowflake beams that build bridges from sparkling ice.",
    secret: "Their happiest beep sounds exactly like a tiny ice-cream van.",
  },
];
