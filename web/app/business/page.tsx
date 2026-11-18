import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BusinessTile } from "@/components/BusinessTile";
import { DownloadCTA } from "@/components/DownloadCTA";
import { businessHref, getBusinesses } from "@/lib/business";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  slug: "business",
  title: "Business types",
  description:
    "BolCash for kirana, medical, dairy, hardware, wholesale and other small shops and street vendors.",
});

export default function BusinessHub() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Business types", href: "/business/" },
        ]}
      />
      <h1 className="mt-2 text-3xl font-bold md:text-4xl">BolCash for your business</h1>
      <p className="mt-3 text-lg text-muted">
        Pick your kind of shop to see how a digital udhar khata and cash book can help you.
      </p>
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {getBusinesses().map((b) => (
          <BusinessTile key={b.slug} name={b.name} href={businessHref(b.slug)} blurb={b.blurb} />
        ))}
      </div>
      <DownloadCTA slug="business" title="BolCash for your business" />
    </>
  );
}
