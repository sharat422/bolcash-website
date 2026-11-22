import article from "../../content/articles/recording-partial-payments.json";
import { getBusinesses } from "./business";
import { getGuides } from "./guides";
import { getPages } from "./pages";
import { getTools } from "./tools";

export type SiteRoute = { path: string; lastModified?: string };

// Pages that are not driven by a content file. Not listed on purpose: /styleguide/ and /go/*
// (noindex). `pnpm check:links` compares this list with the built pages, so a page missed here fails.
const fixed = ["/", "/features/", "/download/", "/business/", "/tools/", "/guides/", "/hi/"];

/** Every indexable route, for sitemap.xml. `lastModified` only where the content has an `updated` date. */
export function getSiteRoutes(): SiteRoute[] {
  return [
    ...fixed.map((path) => ({ path })),
    ...getBusinesses().map((b) => ({ path: `/business/${b.slug}/` })),
    ...getTools().map((t) => ({ path: `/tools/${t.slug}/` })),
    ...getGuides().map((g) => ({ path: `/guides/${g.slug}/`, lastModified: g.updated })),
    { path: "/guides/recording-partial-payments/", lastModified: article.updated },
    ...getPages().map((p) => ({ path: `/${p.slug}/`, lastModified: p.updated })),
  ];
}
