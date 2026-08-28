/**
 * Site-wide configuration.
 *
 * MAILING_ENDPOINT — paste your Formspree (or ConvertKit/Mailchimp) form
 * endpoint here and the "Send the pack" form in the Join section starts
 * delivering. Until then it fails gracefully with a setup note visible
 * only in the UI copy, never breaking the flow.
 *
 * These live here instead of a .env file on purpose: none of them are
 * secrets. The mailing endpoint is a public form-submission URL by
 * design (Formspree endpoints are meant to be called from the browser),
 * and the Drive asset IDs are already public links. If you later swap
 * to a provider that needs a real secret key, move that key into a
 * server-side function instead of this file.
 */

export const MAILING_ENDPOINT = "";

export const AMAZON_URL = "https://www.amazon.co.uk/dp/B0H45N194K";

/** Builds a direct-view URL for a public Google Drive file ID. */
export const drive = (id, size = 900) => {
  if (!id) return "";
  if (id.startsWith("/") || id.startsWith("http://") || id.startsWith("https://")) return id;
  return `https://lh3.googleusercontent.com/d/${id}=s${size}`;
};

/**
 * Drive file IDs for every illustration currently in use.
 * Swap an ID here and every component using that key updates everywhere —
 * nothing else in the codebase should ever reference a raw Drive ID.
 */
export const ASSET = {
  piper: "1KdO7AHgKzJZ4ajbue7fYraTqQkJ15E9g",
  croissant: "16vM2DV0dNeCtjZljK3OjUbCXCn9kKThC",
  toast: "10H-IMQzxxBKtBCrOZvrYzGdIHL9mG90I",
  sandwich: "1TYbPcPmMyH-isyzRKBCFn0vdcKDDwXon",
  squad: "/images/inside/custard-page-31.webp",
  map: "1D3b_j8XpcwmPWaXaaXXBd-3vhMhk759Z",
  book1: "/images/books/custard-alien-invasion.webp",
  book2: "/images/books/chocolate-volcano.webp",
  book3: "/images/books/ice-cream-robots.webp",
  book4: "/images/books/pizza-dragon.webp",
  book5: "/images/books/snackville-pie-rats.webp",
  book6: "/images/books/sandwich-castle.webp",
  p3: "/images/inside/custard-page-03.webp",
  p10: "/images/inside/custard-page-10.webp",
  p13: "/images/inside/custard-page-13.webp",
  p16: "/images/inside/custard-page-16.webp",
  p17: "/images/inside/custard-page-17.webp",
  p20: "/images/inside/custard-page-20.webp",
  p25: "/images/inside/custard-page-25.webp",
  p26: "/images/inside/custard-page-26.webp",
  p28: "/images/inside/custard-page-28.webp",
  p29: "/images/inside/custard-page-29.webp",
  p31: "/images/inside/custard-page-31.webp",
};
