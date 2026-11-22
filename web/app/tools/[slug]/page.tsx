import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BusinessTile } from "@/components/BusinessTile";
import { Callout } from "@/components/Callout";
import { Disclaimer } from "@/components/Disclaimer";
import { DownloadCTA } from "@/components/DownloadCTA";
import { Fact } from "@/components/Fact";
import { StepList } from "@/components/StepList";
import { ToolForm } from "@/components/ToolForm";
import { pageMeta } from "@/lib/meta";
import { getTools, toolHref } from "@/lib/tools";

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getTools().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const t = getTools().find((x) => x.slug === slug);
  if (!t) notFound();
  return pageMeta({
    slug: `tools/${slug}`,
    title: `${t.name}: free online`,
    description: `${t.intro}`,
    keywords: [t.name, "free calculator", "Bolcash"],
  });
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const all = getTools();
  const t = all.find((x) => x.slug === slug);
  if (!t) notFound();
  const others = all.filter((x) => x.slug !== slug).slice(0, 4);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Tools", href: "/tools/" },
          { name: t.name, href: toolHref(t.slug) },
        ]}
      />
      <h1 className="mt-2 text-3xl font-bold md:text-4xl">{t.name}</h1>
      <p className="mt-3 text-lg text-muted">{t.intro}</p>

      <div className="mt-6">
        <ToolForm slug={t.slug} />
        <noscript>
          <p className="mt-3 font-semibold">
            This tool needs JavaScript. Please turn it on in your browser.
          </p>
        </noscript>
      </div>

      {t.facts?.map((id) => (
        <p key={id} className="mt-4">
          <Fact id={id} />
        </p>
      ))}
      {t.note && (
        <div className="mt-4">
          <Callout tone="warning">{t.note}</Callout>
        </div>
      )}

      <h2 className="mt-10 text-2xl font-bold">How to use it</h2>
      <div className="mt-4">
        <StepList steps={t.steps} />
      </div>

      {t.formula && (
        <>
          <h2 className="mt-10 text-2xl font-bold">How it is worked out</h2>
          <p className="mt-2">{t.formula}</p>
        </>
      )}

      {t.disclaimer && <Disclaimer />}

      <h2 className="mt-10 text-2xl font-bold">More free tools</h2>
      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {others.map((o) => (
          <BusinessTile key={o.slug} name={o.name} href={toolHref(o.slug)} />
        ))}
      </div>

      <DownloadCTA slug={`tools/${t.slug}`} title={t.name} />
    </>
  );
}
