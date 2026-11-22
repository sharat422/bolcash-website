import type { MetadataRoute } from "next";
import { getSiteRoutes } from "@/lib/routes";
import { pageUrl } from "@/lib/site";

export const dynamic = "force-static"; // required for the static export

export default function sitemap(): MetadataRoute.Sitemap {
  return getSiteRoutes().map((r) => ({
    url: pageUrl(r.path),
    ...(r.lastModified ? { lastModified: r.lastModified } : {}),
  }));
}
