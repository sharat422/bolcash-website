import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static"; // required for the static export

// Everything is allowed. /styleguide/ and /go/* keep out of search with a noindex tag instead:
// a Disallow would stop crawlers from ever seeing that tag.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
