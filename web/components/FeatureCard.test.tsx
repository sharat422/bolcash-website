import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { FeatureCard } from "./FeatureCard";

describe("FeatureCard", () => {
  it("renders title, text and a hidden icon", () => {
    const html = renderToStaticMarkup(
      <FeatureCard title="Udhar khata" icon="★">
        Keep track of credit.
      </FeatureCard>,
    );
    expect(html).toContain("Udhar khata");
    expect(html).toContain("Keep track of credit.");
    expect(html).toContain('aria-hidden="true"');
  });
});
