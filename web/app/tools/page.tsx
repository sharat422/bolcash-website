import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BusinessTile } from "@/components/BusinessTile";
import { DownloadCTA } from "@/components/DownloadCTA";
import { pageMeta } from "@/lib/meta";
import { getTools, toolHref } from "@/lib/tools";

export const metadata = pageMeta({
  slug: "tools",
  title: "Free tools for shop owners",
  description:
    "Free calculators for shop owners: GST, interest, EMI, profit margin, discount, amount in words, MSME payment date and udhar reminder messages.",
});

export default function ToolsHub() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Tools", href: "/tools/" },
        ]}
      />
      <h1 className="mt-2 text-3xl font-bold md:text-4xl">Free tools for shop owners</h1>
      <p className="mt-3 text-lg text-muted">
        Simple calculators that run on your phone. No sign-up. Nothing you type is sent anywhere.
      </p>
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {getTools().map((t) => (
          <BusinessTile key={t.slug} name={t.name} href={toolHref(t.slug)} blurb={t.blurb} />
        ))}
      </div>
      <DownloadCTA slug="tools" title="Free tools for shop owners" />
    </>
  );
}
