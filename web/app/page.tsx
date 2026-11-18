import { Badge } from "@/components/Badge";
import { BusinessTile } from "@/components/BusinessTile";
import { Button } from "@/components/Button";
import { DownloadCTA } from "@/components/DownloadCTA";
import { FeatureCard } from "@/components/FeatureCard";
import { PhoneMockup } from "@/components/PhoneMockup";
import { StepList } from "@/components/StepList";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  slug: "",
  title: "Digital udhar khata and cash book for your shop",
  description:
    "BolCash is a mobile app to keep your udhar khata and cash book on your phone. For kirana, medical, dairy, hardware and wholesale shops and street vendors.",
});

const businesses = [
  { name: "Kirana store", href: "/business/kirana/" },
  { name: "Medical store", href: "/business/medical/" },
  { name: "Dairy", href: "/business/dairy/" },
  { name: "Hardware shop", href: "/business/hardware/" },
  { name: "Wholesale", href: "/business/wholesale/" },
  { name: "Street vendor", href: "/business/street-vendor/" },
];

export default function Home() {
  return (
    <>
      <section className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <Badge tone="accent">Coming soon</Badge>
          <h1 className="mt-3 text-3xl font-bold md:text-4xl">
            Keep your udhar khata and cash book on your phone
          </h1>
          <p className="mt-3 text-lg text-muted">
            BolCash is a mobile app for shop owners and street vendors. Write down who owes you.
            Write down what you owe.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Button href="#download">Get the app</Button>
            <Button href="/features/" variant="outline">
              See features
            </Button>
          </div>
        </div>
        <PhoneMockup alt="Preview of a BolCash customer list screen. Final app screens will differ." />
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold">What BolCash is for</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <FeatureCard title="Udhar khata">
            Note down what each customer owes you, and what you owe your suppliers.
          </FeatureCard>
          <FeatureCard title="Cash book">Record the money coming in and going out.</FeatureCard>
          <FeatureCard title="Balance for each person">
            See how much each customer or supplier owes.
          </FeatureCard>
        </div>
        <p className="mt-4">
          <a href="/features/" className="inline-flex min-h-11 items-center text-primary underline">
            All features
          </a>
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold">How it works</h2>
        <div className="mt-4">
          <StepList
            steps={[
              { title: "Add a customer", body: "Save their name and phone number." },
              { title: "Write the entry", body: "Note udhar given or payment received." },
              { title: "See the balance", body: "Know who owes you and how much." },
            ]}
          />
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold">For every kind of small shop</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {businesses.map((b) => (
            <BusinessTile key={b.href} {...b} />
          ))}
        </div>
      </section>

      <DownloadCTA slug="" title="BolCash: digital udhar khata and cash book" />
    </>
  );
}
