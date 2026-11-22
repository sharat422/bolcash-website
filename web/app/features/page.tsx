import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Callout } from "@/components/Callout";
import { DownloadCTA } from "@/components/DownloadCTA";
import { FeatureCard } from "@/components/FeatureCard";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  slug: "features",
  title: "Features",
  description:
    "BolCash features: a ledger for each beat, beat collections matched to the bill, a reconciled daily close, GST invoices with export for your CA and Tally, stock basics, income and expenses, customer records, receipt scanning, recurring expenses and reports.",
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
          A separate ledger for each beat or route — one salesman&apos;s collections never mix with
          another&apos;s.
        </FeatureCard>
        <FeatureCard title="Beat collections">
          Collections matched to the retailer&apos;s bill, including UPI payments, reconciled by
          hand against the bill. Bolcash never holds or moves your money.
        </FeatureCard>
        <FeatureCard title="Reconcile the daily close">
          Cash collected matched to what was written down, before the day ends — a reconciling close
          for each beat.
        </FeatureCard>
      </div>

      <h2 className="mt-10 text-2xl font-bold">For your CA and your stock</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <FeatureCard title="GST invoices and CA/Tally export">
          GST invoices with export for your CA / Tally.
        </FeatureCard>
        <FeatureCard title="Stock basics">Items in, items sold, items left.</FeatureCard>
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
