import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ToolForm } from "./ToolForm";

describe("ToolForm", () => {
  it("renders labelled inputs, rate buttons and a result area", () => {
    const html = renderToStaticMarkup(<ToolForm slug="gst-calculator" />);
    expect(html).toContain('for="gst-calculator-amount"');
    expect(html).toContain("18%");
    expect(html).toContain('aria-live="polite"');
    expect(html).toContain("Nothing you type is sent anywhere");
  });

  it("fails loudly for an unknown tool", () => {
    expect(() => renderToStaticMarkup(<ToolForm slug="nope" />)).toThrow();
  });
});
