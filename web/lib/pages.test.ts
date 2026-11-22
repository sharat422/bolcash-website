import { describe, expect, it } from "vitest";
import { getPages } from "./pages";

describe("trust pages", () => {
  const all = getPages();

  it("has the 4 trust pages", () => {
    expect(all.map((p) => p.slug).sort()).toEqual(["about", "contact", "privacy", "terms"]);
    for (const p of all) expect(p.group).toBe("trust");
  });

  it("every page has a date and a draft note", () => {
    for (const p of all) {
      expect(p.updated, p.slug).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(p.draftNote, p.slug).toContain("TODO: verify");
      expect(p.sections.length, p.slug).toBeGreaterThanOrEqual(1);
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

  it("privacy and terms are placeholders until lawyer-reviewed text is supplied", () => {
    for (const slug of ["privacy", "terms"]) {
      const p = all.find((x) => x.slug === slug)!;
      expect(p.sections, slug).toHaveLength(1);
      expect(JSON.stringify(p), slug).toContain("coming soon — the app is in pre-launch.");
    }
  });
});
