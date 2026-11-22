import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BusinessTile } from "@/components/BusinessTile";
import { DownloadCTA } from "@/components/DownloadCTA";
import { FeatureCard } from "@/components/FeatureCard";
import { businessHref, getBusinesses } from "@/lib/business";
import { pageMeta } from "@/lib/meta";

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getBusinesses().map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const b = getBusinesses().find((x) => x.slug === slug);
  if (!b) notFound();
  return pageMeta({
    slug: `business/${slug}`,
    title: `Udhar khata app for ${b.plural}`,
    description: `BolCash for ${b.plural}: keep your udhar khata and cash book on your phone.`,
  });
}

export default async function BusinessPage({ params }: Props) {
  const { slug } = await params;
  const all = getBusinesses();
  const b = all.find((x) => x.slug === slug);
  if (!b) notFound();
  const others = all.filter((x) => x.slug !== slug).slice(0, 4);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Business types", href: "/business/" },
          { name: b.name, href: businessHref(b.slug) },
        ]}
      />
      <h1 className="mt-2 text-3xl font-bold md:text-4xl">BolCash for {b.plural}</h1>
      <p className="mt-3 text-lg text-muted">{b.intro}</p>

      <h2 className="mt-10 text-2xl font-bold">How BolCash can help you</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {b.uses.map((u) => (
          <FeatureCard key={u.title} title={u.title}>
            {u.body}
          </FeatureCard>
        ))}
      </div>
      <p className="mt-4">
        <Link
          href="/features/"
          className="inline-flex min-h-11 items-center text-primary underline"
        >
          All features
        </Link>
      </p>

      <h2 className="mt-10 text-2xl font-bold">Other business types</h2>
      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {others.map((o) => (
          <BusinessTile key={o.slug} name={o.name} href={businessHref(o.slug)} />
        ))}
      </div>

      <DownloadCTA slug={`business/${b.slug}`} title={`BolCash for ${b.plural}`} />
    </>
  );
}
