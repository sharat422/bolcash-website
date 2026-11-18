import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BusinessTile } from "@/components/BusinessTile";
import { Callout } from "@/components/Callout";
import { DownloadCTA } from "@/components/DownloadCTA";
import { LastUpdated } from "@/components/LastUpdated";
import { pageMeta } from "@/lib/meta";
import { getPages } from "@/lib/pages";

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPages().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const p = getPages().find((x) => x.slug === slug);
  if (!p) notFound();
  return pageMeta({ slug, title: p.title, description: p.description });
}

export default async function SitePage({ params }: Props) {
  const { slug } = await params;
  const all = getPages();
  const p = all.find((x) => x.slug === slug);
  if (!p) notFound();
  const others = all.filter((x) => x.slug !== slug);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: p.title, href: `/${p.slug}/` },
        ]}
      />
      <h1 className="mt-2 text-3xl font-bold md:text-4xl">{p.title}</h1>
      <p className="mt-3 text-lg text-muted">{p.description}</p>
      <div className="mt-2">
        <LastUpdated date={p.updated} />
      </div>

      {!p.reviewed && (
        <div className="mt-4">
          <Callout tone="warning" title="Draft">
            {p.draftNote}
          </Callout>
        </div>
      )}

      {p.sections.map((s) => (
        <section key={s.heading} className="mt-8">
          <h2 className="text-2xl font-bold">{s.heading}</h2>
          {s.paragraphs.map((t) => (
            <p key={t} className="mt-2">
              {t}
            </p>
          ))}
        </section>
      ))}

      <section className="mt-10">
        <h2 className="text-2xl font-bold">More about BolCash</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {others.map((o) => (
            <BusinessTile key={o.slug} name={o.title} href={`/${o.slug}/`} />
          ))}
        </div>
      </section>

      <DownloadCTA slug={p.slug} title={p.title} />
    </>
  );
}
