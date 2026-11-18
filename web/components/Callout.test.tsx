import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Callout } from "./Callout";

describe("Callout", () => {
  it("is a note with an optional title", () => {
    const html = renderToStaticMarkup(
      <Callout tone="warning" title="Careful">
        Check the date.
      </Callout>,
    );
    expect(html).toContain('role="note"');
    expect(html).toContain("Careful");
    expect(html).toContain("border-accent");
  });
});
