import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BusinessTile } from "@/components/BusinessTile";
import { Card } from "@/components/Card";
import { DownloadCTA } from "@/components/DownloadCTA";
import { businessHref, getBusinesses } from "@/lib/business";
import { pageMeta } from "@/lib/meta";
import { BUSINESS_KEYWORDS } from "@/lib/seo";

export const metadata = pageMeta({
  slug: "business",
  title: "Business types",
  description:
    "How BolCash helps small FMCG distributors, hardware and building-material traders, and kirana shops.",
  keywords: BUSINESS_KEYWORDS,
});

// The three main segments. One line each, using only features listed on /features/.
const main = [
  {
    title: "Small FMCG distributors",
    who: "One to four beats, and 80 to 300 retailers.",
    help: "Keep a ledger for each beat, record your collections, and reconcile the daily close.",
    href: businessHref("fmcg-distributor"),
    link: "FMCG distributors",
  },
  {
    title: "Hardware and building-material traders",
    who: "Customers who buy again and again.",
    help: "Manage your customer records, and record your income and expenses.",
    href: businessHref("hardware"),
    link: "Hardware shops",
  },
  {
    title: "Kirana shops",
    who: "Regular customers and daily sales.",
    help: "Record your income and expenses, and keep your customer records in one place.",
    href: businessHref("kirana"),
    link: "Kirana stores",
  },
];

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
        Pick your kind of business to see how BolCash can help you.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {main.map((m) => (
          <Card key={m.title}>
            <h2 className="text-xl font-bold">{m.title}</h2>
            <p className="mt-1 text-sm text-muted">{m.who}</p>
            <p className="mt-2">{m.help}</p>
            <a
              href={m.href}
              className="mt-2 inline-flex min-h-11 items-center text-primary underline"
            >
              {m.link}
            </a>
          </Card>
        ))}
      </div>

      <h2 className="mt-10 text-2xl font-bold">All business types</h2>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {getBusinesses().map((b) => (
          <BusinessTile key={b.slug} name={b.name} href={businessHref(b.slug)} blurb={b.blurb} />
        ))}
      </div>
      <DownloadCTA slug="business" title="BolCash for your business" />
    </>
  );
}
