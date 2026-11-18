import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { SourceList } from "./SourceList";

describe("SourceList", () => {
  it("renders each source as a link", () => {
    const html = renderToStaticMarkup(
      <SourceList sources={[{ name: "GST portal", url: "https://www.gst.gov.in" }]} />,
    );
    expect(html).toContain('href="https://www.gst.gov.in"');
    expect(html).toContain("GST portal");
  });

  it("fails the build when a guide has no sources", () => {
    expect(() => renderToStaticMarkup(<SourceList sources={[]} />)).toThrow();
  });
});
