import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { PhoneMockup } from "./PhoneMockup";

describe("PhoneMockup", () => {
  it("shows alt text and the Preview label by default", () => {
    const html = renderToStaticMarkup(<PhoneMockup alt="Sample ledger screen" />);
    expect(html).toContain('alt="Sample ledger screen"');
    expect(html).toContain("Preview");
  });

  it("drops the label for real screens", () => {
    const html = renderToStaticMarkup(<PhoneMockup alt="Home" preview={false} />);
    expect(html).not.toContain("Preview");
  });
});
