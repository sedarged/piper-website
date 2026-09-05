import { C } from "../styles/tokens.js";

/**
 * The fourteen numbered stops on the Sandwich Kingdom map (Book 6: the
 * floating sandwich-castle world above the clouds). Coordinates are
 * percentages measured against the 1536 × 1024 map artwork.
 *
 * Selecting one opens an accessible field-note dialog and plays the
 * Sandwich Kingdom sound, particles and location-stable screen reaction
 * configured in worldFx.js.
 */
export const SANDWICH_PLACES = [
  {
    id: "cheese-road", n: 1, x: 8.9, y: 5.3, ink: C.butter,
    name: "The Cheese Road", who: "First steps into Sandwich Kingdom", kind: "Sky path",
    intro: "A sparkling ribbon of melted-cheese magic that climbs from Snackville high above the clouds.",
    d: "Piper and the Snack Squad follow it on their flying toast boards as they begin their journey to Sandwich Kingdom. The higher the road climbs, the more the familiar world below disappears into purple cloud.",
  },
  {
    id: "cloud-landing", n: 2, x: 28.5, y: 11, ink: C.sky,
    name: "Cloud Landing", who: "Travellers arriving by cloud", kind: "Landing point",
    intro: "The first safe landing point in Sandwich Kingdom, floating beside Sandwich Castle among soft violet clouds.",
    d: "Travellers arriving along the Cheese Road touch down here before making their way towards the enormous castle gates. From the landing, the whole sandwich kingdom stretches out around them.",
  },
  {
    id: "bread-slice-gates", n: 3, x: 23, y: 28, ink: C.butter,
    name: "The Bread-Slice Gates", who: "Guarded by a Sandwich Guard", kind: "Castle gate",
    intro: "Two enormous bread-slice gates guard the entrance to Sandwich Castle.",
    d: "A giant but friendly Sandwich Guard watches over them and asks every visitor for the royal password. Piper discovers that sometimes the best way through a difficult door is simply to be polite.",
  },
  {
    id: "sandwich-castle", n: 4, x: 49, y: 18, ink: C.ember,
    name: "Sandwich Castle", who: "Home of Sandwich Castle", kind: "Castle",
    intro: "The magnificent heart of Sandwich Kingdom.",
    d: "Its towers are built from golden bread, its windows glow like warm cheese, lettuce flags flutter from toothpick poles and colourful sandwich layers wrap around the towers. The Togetherstone normally keeps the entire castle strong, bright and balanced.",
  },
  {
    id: "castle-courtyard", n: 5, x: 47, y: 44, ink: C.mint,
    name: "The Castle Courtyard", who: "Heart of the castle", kind: "Courtyard",
    intro: "A busy open space at the heart of the castle where paths, towers and royal buildings meet.",
    d: "Later in the adventure, the courtyard becomes one of the most important places in the kingdom when everyone gathers together to help repair the cracked Togetherstone and save their home.",
  },
  {
    id: "mustard-marshes", n: 6, x: 76, y: 14, ink: C.butter,
    name: "The Mustard Marshes", who: "Home of the Mustard Boggle", kind: "Marsh",
    intro: "A bubbling golden marsh filled with mustard reeds, popping yellow bubbles and cracker stepping stones that can sink without warning.",
    d: "The Snack Squad must work together to cross safely. This is also the home of the enormous but gentle Mustard Boggle, who turns out to need help rather than a fight.",
  },
  {
    id: "tomato-tunnels", n: 7, x: 14, y: 40, ink: C.strawberry,
    name: "The Tomato Tunnels", who: "Home of the Tomato Mice", kind: "Tunnels",
    intro: "A twisting network of glossy tomato-red tunnels filled with echoes, secret openings and mysterious scratching sounds.",
    d: "Piper lights the way with her warm strawberry magic while Toast Kitty tries to follow the crumb trail. Hidden inside the tunnels lives an organised community of tiny Tomato Mice.",
  },
  {
    id: "scratched-wall", n: 8, x: 27, y: 54.6, ink: C.strawberry,
    name: "The Scratched Wall", who: "Marked by Crumbly", kind: "Secret clue",
    intro: "Deep inside the Tomato Tunnels is a wall covered with marks left behind by Crumbly.",
    d: "The scratches reveal the first real clue that the missing Togetherstone may not have been taken out of greed. It is here that Piper begins to understand that somebody in the kingdom has been feeling forgotten.",
  },
  {
    id: "great-bread-forest", n: 9, x: 61, y: 49.7, ink: C.grape,
    name: "The Great Bread Forest", who: "The crumb trail leads here", kind: "Forest",
    intro: "A huge magical forest where crusty bread trunks stretch towards the clouds, lettuce leaves rustle overhead and warm rolls grow like mushrooms.",
    d: "The heroes follow hundreds of crumbs through the trees as the trail leads them farther away from the castle and closer to the truth.",
  },
  {
    id: "toast-cottage", n: 10, x: 88.2, y: 57.7, ink: C.ember,
    name: "Wizard Brioche's Toast Cottage", who: "Wizard Brioche", kind: "Cottage",
    intro: "A small, welcoming toast cottage tucked beneath the enormous trees of the Great Bread Forest, with a breadstick chimney above the roof.",
    d: "Wizard Brioche lives here. He knows the forgotten history of Crumbly and helps the Snack Squad understand why the Keeper Beneath the Castle disappeared from royal life.",
  },
  {
    id: "hidden-staircase", n: 11, x: 58, y: 62.2, ink: C.grape,
    name: "The Hidden Staircase", who: "Revealed by the Cheese Compass", kind: "Secret passage",
    intro: "A secret staircase revealed when Wizard Brioche's magical Cheese Compass finally points downward.",
    d: "It spirals beneath the Great Bread Forest and marks the beginning of the journey into the forgotten foundations below the kingdom. Few visitors to Sandwich Kingdom even know that it exists.",
  },
  {
    id: "beneath-bread-forest", n: 12, x: 33.3, y: 71.6, ink: C.cocoa,
    name: "Beneath the Bread Forest", who: "Beneath the forest floor", kind: "Underground",
    intro: "A strange underground world hidden below the forest floor.",
    d: "Biscuit rocks, giant hanging noodles, cracker arches and glowing food-shaped formations fill the passageways. The Snack Squad must use everyone's different strengths here when the unstable underground path begins to crack around them.",
  },
  {
    id: "cheese-caves", n: 13, x: 48.8, y: 74.8, ink: C.cocoa,
    name: "The Cheese Caves", who: "Deep beneath the kingdom", kind: "Caves",
    intro: "Warm golden caves glowing with magical cheese light deep beneath Sandwich Kingdom.",
    d: "Their twisting passages lead farther towards Crumbly's hidden home. Beautiful crystal-like formations and dripping golden walls make the caves feel magical, but the collapsing cracker arches remind the team that the kingdom is still in danger.",
  },
  {
    id: "crumblys-cave", n: 14, x: 79.8, y: 77.5, ink: C.cocoa,
    name: "Crumbly's Cave", who: "Crumbly, the forgotten Keeper", kind: "Hidden home",
    intro: "The hidden home of Crumbly, the forgotten Keeper Beneath the Castle.",
    d: "Inside is a lonely table with only one enormous chair, a handmade model of Sandwich Castle with a doorway big enough for him, and the missing Togetherstone. This is where Piper finally learns that Crumbly never wanted to hurt the kingdom — he simply wanted somewhere he truly belonged.",
  },
];
