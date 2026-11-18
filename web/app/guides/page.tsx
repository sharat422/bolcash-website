import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BusinessTile } from "@/components/BusinessTile";
import { DownloadCTA } from "@/components/DownloadCTA";
import { getGuides, guideHref } from "@/lib/guides";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  slug: "guides",
  title: "Guides for shop owners",
  description:
    "Plain-language guides for shop owners on GST, Udyam registration, MSME rules, Mudra loans, PM SVANidhi, UPI and data protection.",
});

export default function GuidesHub() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides/" },
        ]}
      />
      <h1 className="mt-2 text-3xl font-bold md:text-4xl">Guides for shop owners</h1>
      <p className="mt-3 text-lg text-muted">
        Short guides in plain language. Each one shows the date it was last updated and links to the
        official sources.
      </p>
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {getGuides().map((g) => (
          <BusinessTile key={g.slug} name={g.title} href={guideHref(g.slug)} blurb={g.summary} />
        ))}
      </div>
      <DownloadCTA slug="guides" title="Guides for shop owners" />
    </>
  );
}
