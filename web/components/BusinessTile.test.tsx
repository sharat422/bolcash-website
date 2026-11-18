import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { BusinessTile } from "./BusinessTile";

describe("BusinessTile", () => {
  it("is one link with the name and optional blurb", () => {
    const html = renderToStaticMarkup(
      <BusinessTile name="Kirana store" href="/business/kirana/" blurb="Daily udhar" />,
    );
    expect(html).toContain('href="/business/kirana/"');
    expect(html).toContain("Kirana store");
    expect(html).toContain("Daily udhar");
  });
});
