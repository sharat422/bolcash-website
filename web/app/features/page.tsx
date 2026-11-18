import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Callout } from "@/components/Callout";
import { DownloadCTA } from "@/components/DownloadCTA";
import { FeatureCard } from "@/components/FeatureCard";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  slug: "features",
  title: "Features",
  description:
    "What BolCash is for: udhar khata, cash book and a balance for each customer or supplier.",
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
        BolCash helps you keep your shop&apos;s credit and cash records on your phone, not on paper.
      </p>

      <div className="mt-6">
        <Callout tone="warning" title="App not launched yet">
          This page says what BolCash is for. The full feature list: TODO: verify
        </Callout>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <FeatureCard title="Udhar khata">
          Note down what each customer owes you, and what you owe your suppliers.
        </FeatureCard>
        <FeatureCard title="Cash book">
          Record the money coming in and going out of your shop.
        </FeatureCard>
        <FeatureCard title="Balance for each person">
          See how much each customer or supplier owes, without adding up by hand.
        </FeatureCard>
      </div>

      <DownloadCTA slug="features" title="BolCash features" />
    </>
  );
}
