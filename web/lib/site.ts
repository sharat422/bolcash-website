export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://bolcash.com").replace(
  /\/$/,
  "",
);

/** Absolute URL of a page from its slug, e.g. "guides/gst" -> https://bolcash.com/guides/gst/ */
export function pageUrl(slug: string): string {
  const s = slug.replace(/^\/+|\/+$/g, "");
  return s ? `${SITE_URL}/${s}/` : `${SITE_URL}/`;
}

/** Planned launch month, as given by the owner. */
export const LAUNCH = "December 2026";

/** Base URL of the API, from NEXT_PUBLIC_API_URL. Empty means same origin. Dev value is in .env.development. */
export const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");
