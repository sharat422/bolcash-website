import Link from "next/link";
import type { Metadata } from "next";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { FeatureCard } from "@/components/FeatureCard";
import { JsonLd } from "@/components/JsonLd";
import { WaitlistForm } from "@/components/WaitlistForm";
import { pageMeta } from "@/lib/meta";
import {
  FAQ_ITEMS,
  HOME_KEYWORDS,
  faqJsonLd,
  organizationJsonLd,
  softwareApplicationJsonLd,
} from "@/lib/seo";
import { LAUNCH } from "@/lib/site";

const tagline =
  "For small FMCG distributors in India: beat ledgers, collections, and a daily close that reconciles cash, UPI and credit.";

const base = pageMeta({
  slug: "",
  title: "Bolcash — khata app for FMCG distributors in India",
  description:
    "Khata app for small FMCG distributors in India: beat ledgers, beat collections, UPI reconciliation, GST invoices with Tally export, stock basics, and a daily close that reconciles cash, UPI and credit.",
  keywords: HOME_KEYWORDS,
});

export const metadata: Metadata = {
  ...base,
  title: { absolute: "Bolcash — khata app for FMCG distributors in India" },
  openGraph: {
    ...base.openGraph,
    title: "Bolcash — khata app for FMCG distributors in India",
    description: tagline,
  },
};

export default function Home() {
  return (
    <>
      <JsonLd data={softwareApplicationJsonLd()} />
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={faqJsonLd()} />

      <section>
        <Badge tone="accent">Launching {LAUNCH}</Badge>
        <h1 className="mt-3 text-3xl font-bold md:text-4xl">
          Bolcash — the khata app for FMCG distributors in India
        </h1>
        <p className="mt-3 text-lg text-muted">{tagline}</p>
        <div className="mt-5">
          <Button href="#waitlist">Join the waitlist</Button>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold">Who it is for</h2>
        <p className="mt-3 text-lg">Small FMCG distributors with 1-4 beats and 80-300 retailers.</p>
        <ul className="mt-3 space-y-2">
          <li>
            <strong>Hardware and building-material traders:</strong> manage your customer records
            and record your income and expenses.
          </li>
          <li>
            <strong>Kirana shops:</strong> keep your customer records and your income and expenses
            in one place.
          </li>
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold">What Bolcash does</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <FeatureCard title="Beat/route ledger">
            One ledger per beat. Staff see only their own beat.
          </FeatureCard>
          <FeatureCard title="Beat collections">
            Record who paid, on which bill, and what is still due.
          </FeatureCard>
          <FeatureCard title="Daily close">
            Cash, UPI, credit given and credit collected, reconciled at the end of the day.
          </FeatureCard>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold">Questions distributors ask</h2>
        <div className="mt-4 space-y-6">
          {FAQ_ITEMS.map((f) => (
            <div key={f.question}>
              <h3 className="text-lg font-semibold">{f.question}</h3>
              <p className="mt-1 text-muted">{f.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="waitlist" className="mt-12 scroll-mt-20 rounded-lg bg-surface-2 p-6">
        <h2 className="text-2xl font-bold">Join the waitlist</h2>
        <p className="mt-2 text-muted">We will message you when Bolcash launches in {LAUNCH}.</p>
        <div className="mt-4">
          <WaitlistForm source="home" />
          <noscript>
            <p className="mt-3 font-semibold">Please turn on JavaScript to join the waitlist.</p>
          </noscript>
        </div>
        <p className="mt-4 text-sm text-muted">
          We use your details only to contact you about the launch.
        </p>
        <Link
          href="/privacy/"
          className="inline-flex min-h-11 items-center text-sm text-muted underline"
        >
          Privacy policy
        </Link>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold">What Bolcash does not do</h2>
        <p className="mt-3 text-lg">
          No bank login. No money movement. Your data and export are always free.
        </p>
      </section>
    </>
  );
}
