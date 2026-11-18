export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://bolcash.in").replace(
  /\/$/,
  "",
);

/** Absolute URL of a page from its slug, e.g. "guides/gst" -> https://bolcash.in/guides/gst/ */
export function pageUrl(slug: string): string {
  const s = slug.replace(/^\/+|\/+$/g, "");
  return s ? `${SITE_URL}/${s}/` : `${SITE_URL}/`;
}
