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
export const drive = (id, size = 900) =>
  `https://lh3.googleusercontent.com/d/${id}=s${size}`;

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
  squad: "1CZZQti9BPGUXKCP6GlnyqVxa7KtO8v5R",
  map: "1D3b_j8XpcwmPWaXaaXXBd-3vhMhk759Z",
  book1: "1qI_IVDTYisjUnVgXiFdpjDFlM4zbWdW_",
  book2: "1xW7m-NcHSYE-ENz5oCBxkv0LZz-RxrNB",
  p2: "1U9LrSwMpa36ZiYxDlcCcE5jJmCiKJRek",
  p3: "1E6SVx6xFp8Vl61Z0mZVmoDJJsdYvlyL_",
  p5: "1kWJla2HTjQ_OSrDiVGuh3dUULE4TIv2M",
  p15: "1rlIAxXBeq6Zv8jeTdoavVIYmuR0GX0kN",
  p26: "1ynsh519uv7Xhjrjm0ymfgYXfLeifiv1a",
  p34: "1Wec-Wt2PMrMMfglXM8em9kU2NRNrN5KK",
};
