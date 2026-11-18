import { JsonLd } from "./JsonLd";

export type FaqItem = { q: string; a: string };

/** Accordion (native <details>, no JS) plus FAQPage JSON-LD. Answers are plain text. */
export function FAQ({ items }: { items: FaqItem[] }) {
  return (
    <section>
      <h2 className="text-2xl font-bold">Frequently asked questions</h2>
      <div className="mt-4 divide-y divide-line rounded-lg border border-line bg-surface">
        {items.map((i) => (
          <details key={i.q} className="group p-4">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 font-semibold">
              {i.q}
              <span aria-hidden="true" className="text-primary group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-2 text-muted">{i.a}</p>
          </details>
        ))}
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((i) => ({
            "@type": "Question",
            name: i.q,
            acceptedAnswer: { "@type": "Answer", text: i.a },
          })),
        }}
      />
    </section>
  );
}
