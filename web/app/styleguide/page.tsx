import type { Metadata } from "next";
import { Badge } from "@/components/Badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BusinessTile } from "@/components/BusinessTile";
import { Button } from "@/components/Button";
import { Callout } from "@/components/Callout";
import { Card } from "@/components/Card";
import { ComparisonTable } from "@/components/ComparisonTable";
import { Disclaimer } from "@/components/Disclaimer";
import { DownloadCTA } from "@/components/DownloadCTA";
import { Fact } from "@/components/Fact";
import { FAQ } from "@/components/FAQ";
import { FeatureCard } from "@/components/FeatureCard";
import { LastUpdated } from "@/components/LastUpdated";
import { PhoneMockup } from "@/components/PhoneMockup";
import { SourceList } from "@/components/SourceList";
import { StepList } from "@/components/StepList";

export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

const colours = [
  "canvas",
  "surface",
  "surface-2",
  "ink",
  "muted",
  "line",
  "primary",
  "primary-strong",
  "on-primary",
  "accent",
  "on-accent",
];
const sizes = ["text-sm", "text-base", "text-lg", "text-xl", "text-2xl", "text-3xl", "text-4xl"];
const radii = ["rounded-sm", "rounded-md", "rounded-lg", "rounded-full"];
const spaces = [1, 2, 3, 4, 6, 8, 12];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="border-b border-line pb-2 text-2xl font-bold">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default function Styleguide() {
  return (
    <>
      <h1 className="text-3xl font-bold md:text-4xl">Styleguide</h1>
      <p className="mt-2 text-muted">
        Every token and component. Not indexed. Switch the browser to dark mode to see the dark
        colours.
      </p>

      <Section title="Colours">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {colours.map((c) => (
            <li key={c} className="overflow-hidden rounded-md border border-line">
              <div className="h-12" style={{ background: `var(--${c})` }} />
              <p className="p-2 text-sm">{c}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Type">
        <p className="text-muted">Noto Sans + Noto Sans Devanagari</p>
        <ul className="mt-3 space-y-3">
          {sizes.map((s) => (
            <li key={s} className={s}>
              {s}: Udhar khata, ₹1,50,000 <span lang="hi">उधार खाता, नमस्ते</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 font-bold">Bold</p>
        <p className="font-semibold">Semibold</p>
        <p>Regular</p>
      </Section>

      <Section title="Spacing (4px steps)">
        <ul className="space-y-2">
          {spaces.map((n) => (
            <li key={n} className="flex items-center gap-3 text-sm">
              <span className="w-24">
                {n} = {n * 4}px
              </span>
              <span className="h-4 bg-primary" style={{ width: `calc(var(--spacing) * ${n})` }} />
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Radius">
        <ul className="flex flex-wrap gap-4">
          {radii.map((r) => (
            <li key={r} className="text-center text-sm">
              <div className={`h-16 w-16 border-2 border-primary bg-surface-2 ${r}`} />
              {r.replace("rounded-", "")}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Buttons (44px tap target)">
        <div className="flex flex-wrap gap-3">
          <Button href="#">Primary</Button>
          <Button href="#" variant="accent">
            Accent
          </Button>
          <Button href="#" variant="outline">
            Outline
          </Button>
        </div>
      </Section>

      <Section title="Badge">
        <div className="flex gap-3">
          <Badge>Neutral</Badge>
          <Badge tone="accent">Accent</Badge>
        </div>
      </Section>

      <Section title="Card">
        <Card>
          <h3 className="text-lg font-semibold">Card title</h3>
          <p className="mt-1 text-muted">Card body text on a surface.</p>
        </Card>
      </Section>

      <Section title="Breadcrumbs, LastUpdated, Disclaimer, SourceList">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Styleguide", href: "/styleguide/" },
          ]}
        />
        <LastUpdated date="2026-11-06" />
        <div className="mt-4">
          <SourceList sources={[{ name: "GST portal", url: "https://www.gst.gov.in" }]} />
        </div>
        <Disclaimer />
      </Section>

      <Section title="StepList, Callout">
        <StepList
          steps={[
            { title: "First step", body: "Short sentence about it." },
            { title: "Second step" },
          ]}
        />
        <div className="mt-4 grid gap-3">
          <Callout title="Info">Sample information note.</Callout>
          <Callout tone="warning" title="Warning">
            Sample warning note.
          </Callout>
        </div>
      </Section>

      <Section title="FeatureCard, BusinessTile">
        <div className="grid gap-3 sm:grid-cols-2">
          <FeatureCard title="Feature title" icon="★">
            Sample feature text.
          </FeatureCard>
          <BusinessTile name="Business type" href="#" blurb="Sample line" />
        </div>
      </Section>

      <Section title="ComparisonTable">
        <ComparisonTable
          caption="Sample comparison"
          columns={["Option A", "Option B"]}
          rows={[
            { label: "Row one", cells: ["Sample", "Sample"] },
            { label: "Row two", cells: ["Sample", "Sample"] },
          ]}
        />
      </Section>

      <Section title="FAQ">
        <FAQ items={[{ q: "Sample question?", a: "Sample answer." }]} />
      </Section>

      <Section title="PhoneMockup (placeholder, labelled Preview)">
        <PhoneMockup alt="Placeholder preview of the BolCash customer list screen" />
      </Section>

      <Section title="Fact">
        <p>
          <Fact id="udyam_registered" />
        </p>
      </Section>

      <DownloadCTA slug="styleguide" title="BolCash styleguide" />
    </>
  );
}
