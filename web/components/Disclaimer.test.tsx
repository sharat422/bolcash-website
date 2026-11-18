import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Disclaimer } from "./Disclaimer";

describe("Disclaimer", () => {
  it("uses the exact CA note from CLAUDE.md", () => {
    expect(renderToStaticMarkup(<Disclaimer />)).toContain(
      "This is general information, not tax or legal advice. Confirm with a CA.",
    );
  });
});
