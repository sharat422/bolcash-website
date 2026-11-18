import { describe, expect, it } from "vitest";
import { getFact } from "./facts";
import { getGuides } from "./guides";
import { getTools } from "./tools";

// Rule 3: official sources only.
const OFFICIAL = [
  "gst.gov.in",
  "udyamregistration.gov.in",
  "msme.gov.in",
  "pib.gov.in",
  "npci.org.in",
  "mudra.org.in",
  "pmsvanidhi.mohua.gov.in",
];

describe("guides", () => {
  const all = getGuides();
  const slugs = all.map((g) => g.slug);

  it("has 16 guides with unique slugs", () => {
    expect(all).toHaveLength(16);
    expect(new Set(slugs).size).toBe(16);
  });

  it("every guide has a valid date and sections", () => {
    for (const g of all) {
      expect(g.updated, g.slug).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(g.sections.length, g.slug).toBeGreaterThanOrEqual(3);
    }
  });

  it("every guide links only to official sources (rule 3)", () => {
    for (const g of all) {
      expect(g.sources.length, g.slug).toBeGreaterThan(0);
      for (const s of g.sources) {
        const host = new URL(s.url).hostname;
        expect(
          OFFICIAL.some((d) => host === d || host.endsWith(`.${d}`)),
          `${g.slug}: ${host}`,
        ).toBe(true);
      }
    }
  });

  it("tax and legal topics carry the CA note (rule 4)", () => {
    for (const g of all) {
      if (g.facts.some((f) => /^(gst_|msme_|dpdp_)/.test(f))) expect(g.taxLegal, g.slug).toBe(true);
    }
  });

  it("facts, tools and related guides all exist", () => {
    const toolSlugs = getTools().map((t) => t.slug);
    for (const g of all) {
      g.facts.forEach((f) => expect(() => getFact(f), `${g.slug}: ${f}`).not.toThrow());
      g.tools.forEach((t) => expect(toolSlugs, g.slug).toContain(t));
      g.related.forEach((r) => expect(slugs, g.slug).toContain(r));
    }
  });

  it("copy has no numbers, prices or percentages: those come from facts.json (rule 2)", () => {
    for (const g of all) {
      const text = [
        g.title,
        g.summary,
        ...g.sections.flatMap((s) => [s.heading, ...s.paragraphs]),
      ].join(" ");
      expect(text, g.slug).not.toMatch(/[0-9₹%]/);
    }
  });
});
