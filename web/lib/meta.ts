import type { Metadata } from "next";
import { pageUrl } from "./site";

/** Title, description and canonical URL for a page. `slug` is "" for home. */
export function pageMeta({
  slug,
  title,
  description,
}: {
  slug: string;
  title: string;
  description: string;
}): Metadata {
  return { title, description, alternates: { canonical: pageUrl(slug) } };
}
