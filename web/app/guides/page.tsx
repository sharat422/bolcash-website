import type { Metadata } from "next";
export const metadata: Metadata = { title: "Practical guides | Bolcash" };
export default function Guides() {
  return (
    <section>
      <h1 className="text-3xl font-bold">Practical guides</h1>
      <ul className="mt-6">
        <li>
          <a
            href="/guides/recording-partial-payments/"
            className="inline-block min-h-11 py-2 text-primary underline"
          >
            Recording a partial payment and a goods return
          </a>
          <p>
            A fictional worked example with separate entries, running balances and a daily
            checklist.
          </p>
        </li>
      </ul>
    </section>
  );
}
