import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LastUpdated } from "@/components/LastUpdated";
import article from "../../../../content/articles/recording-partial-payments.json";

export const metadata: Metadata = {
  title: `${article.title} | Bolcash`,
  description:
    "A fictional worked example showing how to record a partial payment and an accepted goods return separately.",
};

export default function PartialPaymentsGuide() {
  return (
    <article className="mx-auto max-w-3xl">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides/" },
          { name: "Partial payments", href: "/guides/recording-partial-payments/" },
        ]}
      />
      <h1 className="text-3xl font-bold">{article.title}</h1>
      <LastUpdated date={article.updated} />
      <div
        className="mt-6 space-y-4 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_p]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_a]:text-primary [&_a]:underline [&_table]:my-4 [&_table]:w-full [&_td]:border [&_td]:p-2 [&_th]:border [&_th]:p-2"
        dangerouslySetInnerHTML={{ __html: article.bodyHtml }}
      />
      <section id="source-guide-partial" className="mt-8 border-t pt-6">
        <h2 className="text-xl font-bold">Source [1]: original teaching material</h2>
        <p className="my-2">
          This guide uses an original fictional example, not a customer case study or legal
          authority.
        </p>
      </section>
    </article>
  );
}
