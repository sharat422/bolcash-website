import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { LastUpdated } from "./LastUpdated";

describe("LastUpdated", () => {
  it("shows a readable date and a machine date", () => {
    const html = renderToStaticMarkup(<LastUpdated date="2026-11-05" />);
    expect(html).toContain("Last updated:");
    expect(html).toContain('dateTime="2026-11-05"');
    expect(html).toContain("5 November 2026");
  });

  it("rejects a bad date", () => {
    expect(() => renderToStaticMarkup(<LastUpdated date="5/11/2026" />)).toThrow();
  });
});
