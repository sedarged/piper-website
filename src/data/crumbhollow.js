import { C } from "../styles/tokens.js";

/**
 * The twelve numbered stops on the Crumbhollow map — the hidden Pie-Rat
 * village beneath Snackville, replacing the old "Pie-Rats Underground
 * Village" placeholder. Coordinates are percentages measured against the
 * 1536 × 864 map artwork.
 *
 * The map itself doesn't give exact book lore for every stop, so these
 * descriptions are written as website flavour copy around what the map
 * shows (canals, docks, a market), not new book canon — same interaction
 * pattern as Snackville and Sandwich Kingdom (WorldMap.jsx).
 */
export const CRUMBHOLLOW_PLACES = [
  {
    id: "discovery-ledge", n: 1, x: 6, y: 17, ink: C.butter,
    name: "Discovery Ledge", who: "First glimpse of the village", kind: "Lookout",
    intro: "A quiet rocky ledge overlooking the hidden waterways of Crumbhollow.",
    d: "From here, curious explorers can catch their first glimpse of the lantern-lit village below and hear the distant creak of docks, boats and underground pipes.",
  },
  {
    id: "whispering-drain-tunnel", n: 2, x: 13, y: 29, ink: C.cocoa,
    name: "Whispering Drain Tunnel", who: "One of the oldest tunnels", kind: "Tunnel",
    intro: "One of the oldest tunnels leading into Crumbhollow.",
    d: "Water trickles through the giant pipe while strange little echoes bounce along the walls, making every drip and footstep sound like a secret whisper from deeper underground.",
  },
  {
    id: "crumb-canal-harbor", n: 3, x: 30, y: 19, ink: C.sky,
    name: "Crumb Canal Harbor", who: "Pie-Rats ferrying supplies", kind: "Harbor",
    intro: "The busy waterway at the heart of Crumbhollow.",
    d: "Tiny boats drift between wooden jetties while Pie-Rats ferry baskets, crumbs and supplies through the glowing blue canals beneath Snackville.",
  },
  {
    id: "cake-tin-town-hall", n: 4, x: 50, y: 15, ink: C.ember,
    name: "Cake-Tin Town Hall", who: "The village meeting place", kind: "Town hall",
    intro: "Crumbhollow's central meeting place, built beneath a giant old cake tin.",
    d: "Important village decisions are made here, notices are shared and Pie-Rats gather whenever something unusual is happening beneath Snackville.",
  },
  {
    id: "biscuit-box-bakery", n: 5, x: 63, y: 12, ink: C.butter,
    name: "Biscuit-Box Bakery", who: "Fresh pies, every day", kind: "Bakery",
    intro: "A cosy bakery built from an enormous biscuit box, glowing warmly beside the canal.",
    d: "Fresh pies, biscuits and crumb-filled treats are baked here every day, making it one of the best-smelling places in the whole underground village.",
  },
  {
    id: "captain-wooders-dock", n: 6, x: 90, y: 32, ink: C.sky,
    name: "Captain Wooder's House & Dock", who: "Captain Wooder", kind: "Home & dock",
    intro: "A private waterside home and dock belonging to Captain Wooder.",
    d: "Boats can pull up directly outside, making this a useful base for planning journeys through the canals and keeping an eye on everything moving through Crumbhollow.",
  },
  {
    id: "grey-first-mates-ropehouse", n: 7, x: 10, y: 49, ink: C.cocoa,
    name: "Grey First Mate's Ropehouse", who: "The Grey First Mate", kind: "Workshop",
    intro: "A rugged workshop packed with rope, knots, nets and dockside equipment.",
    d: "The Grey First Mate keeps the village supplied with everything needed to tie up boats, repair bridges and handle life on the underground waterways.",
  },
  {
    id: "streeg-pie-rats-barrel-yard", n: 8, x: 20, y: 62, ink: C.grape,
    name: "Streeg Pie-Rats Barrel Yard", who: "The Streeg Pie-Rats", kind: "Storage yard",
    intro: "A crowded storage yard filled with barrels, crates and supplies arriving from every corner of Crumbhollow.",
    d: "The Streeg Pie-Rats keep the yard organised — or at least as organised as a Pie-Rat barrel yard ever gets.",
  },
  {
    id: "pancake-hat-pier", n: 9, x: 41, y: 78, ink: C.butter,
    name: "Pancake-Hat Pier", who: "Boats loading and departing", kind: "Pier",
    intro: "A lively wooden pier named after the unmistakable pancake-shaped hats seen around this part of the village.",
    d: "Small boats stop here to load supplies, collect passengers and set off through the winding canal network.",
  },
  {
    id: "jam-jar-lantern-square", n: 10, x: 66, y: 58, ink: C.strawberry,
    name: "Jam-Jar Lantern Square", who: "Evening gathering place", kind: "Town square",
    intro: "The warm glowing centre of evening life in Crumbhollow.",
    d: "Colourful jam jars have been turned into hanging lanterns, filling the square with red, gold and amber light while villagers gather, trade stories and meet friends.",
  },
  {
    id: "patchwork-burrows", n: 11, x: 85, y: 53, ink: C.grape,
    name: "Patchwork Burrows", who: "Crumbhollow residents", kind: "Homes",
    intro: "A cluster of tiny homes built into the cave walls from salvaged wood, cloth, barrels and mismatched materials.",
    d: "No two burrows look exactly alike, giving this corner of Crumbhollow its cosy, handmade personality.",
  },
  {
    id: "shiving-basket-market", n: 12, x: 93, y: 71, ink: C.ember,
    name: "Shiving Basket Market", who: "Traders of Crumbhollow", kind: "Market",
    intro: "Crumbhollow's bustling underground market, packed with baskets of food, odd treasures and useful supplies.",
    d: "Mysterious things brought in from the canals turn up here too. It is one of the busiest places in the village and a perfect spot for discovering something unexpected.",
  },
];
