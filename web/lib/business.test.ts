import { describe, expect, it } from "vitest";
import { getBusinesses } from "./business";

describe("business content", () => {
  const all = getBusinesses();

  it("has the 10 business-type pages with unique slugs", () => {
    expect(all).toHaveLength(10);
    expect(new Set(all.map((b) => b.slug)).size).toBe(10);
  });

  it("every page has an intro and 3 uses with text", () => {
    for (const b of all) {
      expect(b.name, b.slug).not.toBe("");
      expect(b.intro.length, b.slug).toBeGreaterThan(40);
      expect(b.uses, b.slug).toHaveLength(3);
      for (const u of b.uses) expect(u.title && u.body, b.slug).toBeTruthy();
    }
  });

  it("has no numbers, prices or percentages (those need a source in facts.json)", () => {
    for (const b of all) {
      const text = [b.name, b.blurb, b.intro, ...b.uses.flatMap((u) => [u.title, u.body])].join(
        " ",
      );
      expect(text, b.slug).not.toMatch(/[0-9₹%]/);
    }
  });
});
