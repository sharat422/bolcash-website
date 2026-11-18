import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BusinessTile } from "@/components/BusinessTile";
import { Callout } from "@/components/Callout";
import { Card } from "@/components/Card";
import { Disclaimer } from "@/components/Disclaimer";
import { DownloadCTA } from "@/components/DownloadCTA";
import { Fact } from "@/components/Fact";
import { LastUpdated } from "@/components/LastUpdated";
import { SourceList } from "@/components/SourceList";
import { getGuides, guideHref } from "@/lib/guides";
import { pageMeta } from "@/lib/meta";
import { getTools, toolHref } from "@/lib/tools";

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const g = getGuides().find((x) => x.slug === slug);
  if (!g) notFound();
  return pageMeta({ slug: `guides/${slug}`, title: g.title, description: g.summary });
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const all = getGuides();
  const g = all.find((x) => x.slug === slug);
  if (!g) notFound();
  const tools = getTools().filter((t) => g.tools.includes(t.slug));
  const related = all.filter((x) => g.related.includes(x.slug));

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides/" },
          { name: g.title, href: guideHref(g.slug) },
        ]}
      />
      <h1 className="mt-2 text-3xl font-bold md:text-4xl">{g.title}</h1>
      <p className="mt-3 text-lg text-muted">{g.summary}</p>
      <div className="mt-2">
        <LastUpdated date={g.updated} />
      </div>

      {!g.reviewed && (
        <div className="mt-4">
          <Callout tone="warning" title="Draft">
            TODO: verify this guide against the official sources below before it is published.
          </Callout>
        </div>
      )}

      {g.facts.length > 0 && (
        <Card className="mt-6">
          <h2 className="text-lg font-semibold">Key facts</h2>
          <ul className="mt-2 space-y-3">
            {g.facts.map((id) => (
              <li key={id}>
                <Fact id={id} />
              </li>
            ))}
          </ul>
        </Card>
      )}

      {g.sections.map((s) => (
        <section key={s.heading} className="mt-8">
          <h2 className="text-2xl font-bold">{s.heading}</h2>
          {s.paragraphs.map((p) => (
            <p key={p} className="mt-2">
              {p}
            </p>
          ))}
        </section>
      ))}

      {tools.length > 0 && (
        <section className="mt-8">
          <h2 className="text-2xl font-bold">Free tool for this</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {tools.map((t) => (
              <BusinessTile key={t.slug} name={t.name} href={toolHref(t.slug)} blurb={t.blurb} />
            ))}
          </div>
        </section>
      )}

      <div className="mt-8">
        <SourceList sources={g.sources} />
      </div>

      {g.taxLegal && <Disclaimer />}

      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="text-2xl font-bold">Related guides</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {related.map((r) => (
              <BusinessTile key={r.slug} name={r.title} href={guideHref(r.slug)} />
            ))}
          </div>
        </section>
      )}

      <DownloadCTA slug={`guides/${g.slug}`} title={g.title} />
    </>
  );
}
