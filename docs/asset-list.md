# Piper Website — Complete Asset List for Generation
### Everything still missing from the live site, with copy-paste prompts for ChatGPT/DALL·E

---

## How to use this file

Paste each prompt into ChatGPT (with image generation) or DALL·E exactly as written. Where a prompt says **[transparent background]**, ask ChatGPT to export as PNG with transparency — DALL·E sometimes adds a white background by default, so if that happens, ask it to "remove the background and make it transparent" as a follow-up.

Once generated, upload everything to a Google Drive folder called **Piper Website Assets — Batch 2**, share it publicly, and send me the folder. I'll extract the file IDs and wire every single one into the site in one pass.

---

## Already real and already live — no action needed

These are already working in the site, pulled from your existing Drive:

- Piper, Croissant Kitty, Toast Kitty, Sandwich Kitty portraits
- The Snack Squad group photo
- The Snackville map
- Both book covers (Book 1, Book 2)
- Six story preview pages from Book 2

Nothing below duplicates these. Everything below is either a total gap or a placeholder currently faked with CSS/SVG.

---

## PART 1 — The parallax world (highest priority)

This is the single biggest visual gap. The site currently scrolls through five layers of **flat vector shapes I drew in CSS** as a stand-in — plain clouds, a triangle mountain, coloured rectangle houses. It works, but it's placeholder. Real illustrated layers are what make the "walking through Snackville" effect actually land.

**Critical technical requirement for all five:** each image must be a **wide horizontal strip, seamlessly tileable left-to-right** (the site duplicates it and scrolls it sideways, so the right edge must flow into the left edge with no visible seam). Transparent background except where noted. No characters in any of these — they're pure environment.

### 1.1 — Far clouds layer
**Size:** 2400 × 400 px, seamless horizontal tile · **Format:** PNG, transparent background

```
A wide horizontal illustration strip of soft fluffy white clouds scattered across
a transparent background, in the style of a warm painterly children's picture
book. The clouds are simple, rounded, cotton-candy shapes, varying sizes, evenly
spaced. Some clouds are tinted very pale pink and pale gold at the edges as if
catching sunlight. The image must tile seamlessly left to right — the rightmost
cloud shapes should match up with the leftmost edge so it can repeat infinitely
with no visible seam. No ground, no characters, no text. Transparent background.
Landscape strip format, twice as wide as it is tall.
```

### 1.2 — Sugar mountains layer (mid distance)
**Size:** 2400 × 500 px, seamless horizontal tile · **Format:** PNG, transparent background

```
A wide horizontal illustration strip of soft rolling mountains made of blue-white
sugar and icing, like meringue peaks, sitting in the middle distance. Pale icy
blue and white colour palette, a few small sparkle glints on the peaks like sugar
crystals catching light. Painterly children's book style, soft and rounded, no
sharp edges. The image must tile seamlessly left to right with no visible seam
at the repeat point. No characters, no text, transparent background above the
mountain silhouette. Landscape strip format, roughly five times wider than tall.
```

### 1.3 — Chocolate Mountain silhouette layer
**Size:** 2400 × 600 px, seamless horizontal tile · **Format:** PNG, transparent background

```
A wide horizontal illustration strip showing a large dramatic chocolate mountain
silhouette on the right two-thirds of the frame, with smaller rolling chocolate
hills continuing across the rest of the strip. Rich dark chocolate brown with
warm amber glowing highlights near the peak, as if lit from within. A very
subtle wisp of warm golden smoke or steam rising from the very top. Painterly
children's storybook style, thick soft edges, warm and inviting rather than
scary. The image must tile seamlessly left to right. No characters, no text,
transparent background. Landscape strip format, four times wider than tall.
```

### 1.4 — Snackville rooftops layer
**Size:** 2400 × 450 px, seamless horizontal tile · **Format:** PNG, transparent background

```
A wide horizontal illustration strip of a row of whimsical candy-coloured
cottage rooftops seen from a slight distance, like a town skyline. Each
rooftop is a different bright colour — strawberry red, butter yellow, mint
green, grape purple, sky blue — some shaped like biscuit domes, some peaked
like candy canes, small chimneys with warm glowing golden windows beneath the
eaves. Painterly children's book illustration style, thick friendly outlines,
warm and cosy. The image must tile seamlessly left to right with no visible
seam. No characters, no text, transparent background above the roofline.
Landscape strip format, five times wider than tall.
```

### 1.5 — Foreground candy grass layer
**Size:** 2400 × 350 px, seamless horizontal tile · **Format:** PNG, transparent background

```
A wide horizontal illustration strip of a foreground meadow made of bright
green candy-grass with a few tall lollipop stalks growing up out of it at
irregular intervals, each lollipop a different bright colour — strawberry red,
grape purple, butter yellow, sky blue, ember orange. Painterly children's book
style, thick outlines, cheerful and bouncy looking grass texture. The image
must tile seamlessly left to right with no visible seam. No characters, no
text, transparent background above the grass. Landscape strip format, seven
times wider than tall.
```

---

## PART 2 — Piper the guide character

The site has a small floating Piper avatar that follows you down the page and gives tips in a speech bubble. Right now it reuses the main hero portrait, which is a static "hero pose" — not ideal for a small circular avatar that's meant to feel chatty and alive.

### 2.1 — Piper guide avatar
**Size:** 600 × 600 px, square · **Format:** PNG, transparent background

```
A close-up head-and-shoulders portrait of Piper, a small strawberry-themed
kitten character, facing slightly to one side with a warm friendly open-mouth
smile, as if mid-conversation. She has bright strawberry-pink fur, big
sparkly blue eyes, a small strawberry-shaped hat or hair accessory, and a
pink cape visible at the shoulders. The expression should feel chatty and
approachable, like a helpful guide, not a static hero pose. Square
composition, centred, designed to be cropped into a circle. Painterly
children's picture book illustration style matching a warm pastel palette.
Transparent background. No text.
```

---

## PART 3 — Brand identity (currently doesn't exist at all)

The site has no favicon and no social share image yet — there's no `<head>` metadata in the current build. These are small but they're what someone sees in a browser tab or when the link is shared on WhatsApp/iMessage before they ever click through.

### 3.1 — Favicon
**Size:** 512 × 512 px, square · **Format:** PNG, transparent background

```
A simple, bold icon of a strawberry with a small smiling kitten face inside
it, designed to be instantly recognisable at very small sizes like a browser
tab icon. Bright strawberry red with a green leafy top, two small friendly
cartoon eyes and a smile. Extremely simple shapes, thick clean outlines, no
fine detail that would disappear when shrunk down. Centred, square
composition. Transparent background. No text.
```

### 3.2 — Social share image (Open Graph)
**Size:** 1200 × 630 px, landscape · **Format:** PNG or JPG, solid background (no transparency needed)

```
A wide landscape illustration for a social media link preview card. Piper, a
small strawberry-themed kitten character with pink fur and a cape, standing
in the centre of a warm painterly Snackville street scene at golden hour —
candy-coloured cottage rooftops, a lollipop lamppost, warm glowing windows.
Leave generous empty space in the upper third of the image for a text
headline to be added afterward. Warm pastel colour palette matching a
children's picture book. Landscape composition, 1200 by 630 pixels. No text
baked into the image — leave the top clear for overlay text.
```

---

## PART 4 — The six free printables

These are referenced throughout the site (the "Free stuff" section and the welcome-pack email) but none exist yet — every download link is currently empty. These are the actual lead-magnet content, so they matter for the email funnel to have any real value behind it.

### 4.1 — Colouring pages (6 pages)
**Size:** 2480 × 3508 px (A4 at 300dpi), one file per page · **Format:** PNG or PDF, black outline on white, no colour

```
A children's colouring book page, black outline only on a pure white
background, no shading or colour fill. Show [CHARACTER] from a strawberry
food kitten picture book series, in a simple friendly pose, thick clean
linework suitable for a young child to colour in with crayons. Leave plenty
of open, simple-shaped areas — no tiny intricate details. Portrait A4 page
format with generous white margin around the edge. No text, no background
scenery, just the character centred on the page.
```
Generate six times, swapping `[CHARACTER]` for: **Piper**, **Croissant Kitty**, **Toast Kitty**, **Sandwich Kitty**, **the Custard Queen**, **the Chocolate Dragon**.

### 4.2 — The Snackville map poster (blank, colour-in version)
**Size:** 3508 × 2480 px (A3 landscape at 300dpi) · **Format:** PNG or PDF, black outline on white

```
A hand-drawn fantasy map illustration in black outline only on a pure white
background, no colour fill, suitable for a child to colour in with crayons.
The map shows a small whimsical town called Snackville with these features
loosely scattered across it: a cottage with a strawberry-shaped roof, a
lunchbox-shaped headquarters building with a star on top, a workshop with a
gear-shaped chimney, a town square with a fountain, a bridge made of clouds,
a large mountain with a wisp of smoke at the peak, a rolling hill, and a park
with a few trees. Thick clean linework, simple open shapes a child can
colour, decorative compass rose in one corner, a winding path connecting the
locations. Landscape A3 format. No text or labels.
```

### 4.3 — Cut-out Snack Squad badge
**Size:** 2480 × 3508 px (A4 at 300dpi) · **Format:** PNG or PDF, full colour

```
A printable page containing four separate circular badge designs arranged in
a 2 by 2 grid, each with a dashed cut-line border around it, designed for a
child to cut out with scissors and wear. Each badge shows a small friendly
strawberry-kitten-themed emblem: badge one says nothing but shows a
strawberry with a star; badge two shows a croissant with a lightning bolt;
badge three shows a slice of toast with a gear; badge four shows a sandwich
with a small shield. Bright cheerful colours, thick outlines, simple bold
shapes. Include a small hole or tab at the top of each badge as if for a
ribbon or pin. Portrait A4 page layout with even spacing between the four
badges. No text needed inside the badges themselves.
```

### 4.4 — Chocolate Mountain maze
**Size:** 2480 × 3508 px (A4 at 300dpi), 2 pages · **Format:** PNG or PDF, black outline on white

```
A children's maze puzzle page, black outline only on a pure white background.
The maze path winds from a small illustration of a strawberry kitten
character in the bottom left corner, through a winding maze of pathways, up
to a small friendly dragon character sitting at the top right corner. Draw
the maze walls as clean thick black lines, with a clear single solvable path
of medium difficulty suitable for a 5 to 7 year old — not too easy, not
frustratingly hard. Simple decorative candy and mountain elements can border
the edges of the maze lightly. Portrait A4 page format. No text.
```
Generate twice for a two-page maze (easier page 1, slightly harder page 2).

### 4.5 — Spot the difference (3 puzzles)
**Size:** 2480 × 3508 px (A4 at 300dpi), one file per puzzle · **Format:** PNG or PDF, full colour

```
A spot-the-difference puzzle page for children, showing two nearly identical
side-by-side colour illustrations of a lively town square scene in a candy
themed village — cottages, a fountain, a few strawberry kitten characters
going about their day. The two images should be visually busy and colourful
but contain exactly ten small differences between them (for example: a
missing window, a different coloured rooftop, an extra cloud, a flower that
isn't there in one version). Do not mark or highlight the differences — they
should be genuinely hidden for a child to find by looking carefully. Warm
painterly children's book illustration style. Landscape A4 format, two panels
side by side with a thin divider line between them. No text.
```
Generate three times for three different scenes (suggest: Candy Path Square, Donut Tree Park, Jellybean Hill).

### 4.6 — Read-aloud notes (for grown-ups)
**Not an image asset** — this is a text document. I can write this one directly once you confirm you'd like it (a short PDF with page-by-page questions to ask, suggested voices for each character, and where natural pause points are in Book 1). No image generation needed.

---

## PART 5 — Small polish items already flagged during build

These aren't blocking anything, but they're real gaps I noted while building and testing the site.

### 5.1 — Gate cover illustration (optional upgrade)
The book-opening intro currently reuses the Snack Squad group photo inside a circular window. It works well, but a purpose-made "cover illustration" — like an actual book jacket — would make the opening moment feel even more like a real book.

**Size:** 1000 × 1000 px, square · **Format:** PNG or JPG

```
A charming children's book cover illustration, square format, showing Piper
the strawberry kitten standing confidently in the foreground with the Snack
Squad — a croissant kitten, a toast kitten, and a sandwich kitten — grouped
just behind her, all smiling toward the viewer. Behind them, a warm glimpse
of the candy-coloured Snackville town at golden hour. Rich warm strawberry
red colour dominates the palette with soft gold accents. Painterly
children's picture book illustration style, inviting and joyful, designed to
work as a book cover. Square composition. Leave a little open space near the
top for a title to be added afterward. No text baked in.
```

---

## Summary checklist

| # | Asset | Files | Priority |
|---|---|---|---|
| 1.1–1.5 | Parallax landscape layers | 5 | **Highest — biggest visible gap** |
| 2.1 | Piper guide avatar | 1 | High |
| 3.1 | Favicon | 1 | High |
| 3.2 | Social share image | 1 | High |
| 4.1 | Colouring pages | 6 | Medium — needed for email funnel to deliver real value |
| 4.2 | Map poster (blank) | 1 | Medium |
| 4.3 | Cut-out badge sheet | 1 | Medium |
| 4.4 | Maze | 2 | Medium |
| 4.5 | Spot the difference | 3 | Medium |
| 4.6 | Read-aloud notes | — | Text only, no image needed |
| 5.1 | Gate cover illustration | 1 | Optional upgrade |

**Total images to generate: 21**

Once you have them, drop everything in one Drive folder, share it publicly, and send it over — I'll pull the file IDs and wire all 21 into the live site in a single pass.
