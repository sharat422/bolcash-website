import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Callout } from "@/components/Callout";
import { DownloadCTA } from "@/components/DownloadCTA";
import { FeatureCard } from "@/components/FeatureCard";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  slug: "features",
  title: "Features",
  description:
    "BolCash features: a ledger for each beat, beat collections, a reconciled daily close, income and expenses, customer records, receipt scanning, recurring expenses and reports.",
});

export default function Features() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Features", href: "/features/" },
        ]}
      />
      <h1 className="mt-2 text-3xl font-bold md:text-4xl">BolCash features</h1>
      <p className="mt-3 text-lg text-muted">
        BolCash helps you keep your shop&apos;s and your route&apos;s records on your phone, not on
        paper.
      </p>

      <div className="mt-6">
        <Callout tone="warning" title="App not launched yet">
          This page says what BolCash is built to do.
        </Callout>
      </div>

      <h2 className="mt-10 text-2xl font-bold">For beats and routes</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <FeatureCard title="Beat or route ledger">
          Keep a ledger for each beat or route.
        </FeatureCard>
        <FeatureCard title="Beat collections">
          Record the money you collect on each beat.
        </FeatureCard>
        <FeatureCard title="Reconcile the daily close">
          Reconcile your day&apos;s collections when you close for the day.
        </FeatureCard>
      </div>

      <h2 className="mt-10 text-2xl font-bold">For every business</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <FeatureCard title="Income and expenses">
          Record the money coming in and going out.
        </FeatureCard>
        <FeatureCard title="Customer records">Manage the records of your customers.</FeatureCard>
        <FeatureCard title="Receipt scanning">
          Scan a receipt and review what BolCash reads from it.
        </FeatureCard>
        <FeatureCard title="Recurring expenses">Note the expenses that repeat.</FeatureCard>
        <FeatureCard title="Reports">See your records as reports.</FeatureCard>
      </div>

      <DownloadCTA slug="features" title="BolCash features" />
    </>
  );
}
