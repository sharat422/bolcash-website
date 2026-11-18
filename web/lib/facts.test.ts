import { describe, expect, it } from "vitest";
import data from "../../content/facts.json";
import { getFact, type FactId } from "./facts";

describe("facts", () => {
  it("every fact has a value and a source name", () => {
    for (const id of Object.keys(data) as FactId[]) {
      const f = getFact(id);
      expect(f.value).not.toBe("");
      expect(f.sourceName).not.toBe("");
    }
  });

  it("throws on an unknown id", () => {
    expect(() => getFact("nope" as FactId)).toThrow();
  });
});
