import type { Metadata } from "next";
import { pageUrl } from "./site";

/** Title, description and canonical URL for a page. `slug` is "" for home. */
export function pageMeta({
  slug,
  title,
  description,
  keywords,
}: {
  slug: string;
  title: string;
  description: string;
  keywords?: string[];
}): Metadata {
  const url = pageUrl(slug);
  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: "Bolcash", locale: "en_IN", type: "website" },
  };
}
