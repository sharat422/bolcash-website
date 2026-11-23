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
    // Legal prose is exempt: a privacy policy necessarily names years (DPDP Act),
    // ages and the registered address. The rule still applies to the about page.
    for (const p of all.filter((x) => x.slug === "about")) {
      const text = [
        p.title,
        p.description,
        ...p.sections.flatMap((s) => [s.heading, ...s.paragraphs]),
      ].join(" ");
      expect(text, p.slug).not.toMatch(/[0-9₹%]/);
    }
  });

  it("contact details come from the app config, not invented", () => {
    const c = all.find((p) => p.slug === "contact")!;
    const text = c.sections.flatMap((s) => s.paragraphs).join(" ");
    expect(text).toContain("support@bolcash.com");
    expect(text).toContain("privacy@bolcash.com");
    expect(text).toContain("Mancherial");
    expect(text).not.toContain("TODO: verify");
  });

  it("privacy and terms carry the app legal text and are still marked draft", () => {
    const privacy = all.find((x) => x.slug === "privacy")!;
    expect(privacy.sections.map((s) => s.heading)).toContain("Data we collect");
    expect(privacy.sections.map((s) => s.heading)).toContain("Grievance / Data Protection Officer");
    expect(JSON.stringify(privacy)).toContain("Digital Personal Data Protection Act");
    expect(privacy.draftNote).toContain("not yet reviewed by a lawyer");

    const terms = all.find((x) => x.slug === "terms")!;
    expect(terms.sections.map((s) => s.heading)).toContain("Acceptance");
    expect(terms.sections.map((s) => s.heading)).toContain("Governing law & contact");
    expect(terms.draftNote).toContain("not yet reviewed by a lawyer");

    for (const p of [privacy, terms]) {
      expect(JSON.stringify(p)).not.toContain("coming soon — the app is in pre-launch.");
    }
  });
});
