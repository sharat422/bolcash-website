import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Breadcrumbs } from "./Breadcrumbs";

describe("Breadcrumbs", () => {
  const html = renderToStaticMarkup(
    <Breadcrumbs
      items={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/guides/" },
        { name: "GST", href: "/guides/gst/" },
      ]}
    />,
  );

  it("links all but the current page", () => {
    expect(html).toContain('href="/guides/"');
    expect(html).not.toContain('href="/guides/gst/"');
    expect(html).toContain('aria-current="page"');
  });

  it("outputs BreadcrumbList JSON-LD with absolute URLs", () => {
    const json = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/)?.[1];
    const data = JSON.parse(json!);
    expect(data["@type"]).toBe("BreadcrumbList");
    expect(data.itemListElement[2]).toMatchObject({
      position: 3,
      item: "https://bolcash.com/guides/gst/",
    });
  });
});
