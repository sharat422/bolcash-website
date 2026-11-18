import { SITE_URL } from "@/lib/site";
import { JsonLd } from "./JsonLd";

export type Crumb = { name: string; href: string };

/** Items run from Home to the current page. The last one is not a link. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted">
      <ol className="flex flex-wrap items-center">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={c.href} className="flex items-center">
              {last ? (
                <span aria-current="page">{c.name}</span>
              ) : (
                <a href={c.href} className="inline-flex min-h-11 items-center underline">
                  {c.name}
                </a>
              )}
              {!last && (
                <span aria-hidden="true" className="px-2">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: items.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.name,
            item: `${SITE_URL}${c.href}`,
          })),
        }}
      />
    </nav>
  );
}
