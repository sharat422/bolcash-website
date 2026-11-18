import { describe, expect, it } from "vitest";
import { getPages } from "./pages";

describe("trust pages", () => {
  const all = getPages();

  it("has the 4 trust pages", () => {
    expect(all.map((p) => p.slug).sort()).toEqual(["about", "contact", "privacy", "terms"]);
    for (const p of all) expect(p.group).toBe("trust");
  });

  it("every page has a date, a draft note and sections", () => {
    for (const p of all) {
      expect(p.updated, p.slug).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(p.draftNote, p.slug).toContain("TODO: verify");
      expect(p.sections.length, p.slug).toBeGreaterThanOrEqual(3);
    }
  });

  it("copy has no numbers, prices or percentages (rule 2)", () => {
    for (const p of all) {
      const text = [
        p.title,
        p.description,
        ...p.sections.flatMap((s) => [s.heading, ...s.paragraphs]),
      ].join(" ");
      expect(text, p.slug).not.toMatch(/[0-9₹%]/);
    }
  });

  it("contact details are not invented: every detail line is a TODO", () => {
    const c = all.find((p) => p.slug === "contact")!;
    const lines = c.sections
      .flatMap((s) => s.paragraphs)
      .filter((t) => /^(Name|Email|Postal address)/.test(t) || t.startsWith("Email for"));
    expect(lines.length).toBeGreaterThan(0);
    for (const l of lines) expect(l).toContain("TODO: verify");
  });

  it("the terms carry the CA note (rule 4)", () => {
    const t = all.find((p) => p.slug === "terms")!;
    expect(JSON.stringify(t)).toContain("Confirm with a CA.");
  });

  it("the privacy page makes no claim about tracking that the site breaks", () => {
    const p = all.find((x) => x.slug === "privacy")!;
    expect(JSON.stringify(p)).toContain("We do not use analytics or tracking tools");
  });
});
