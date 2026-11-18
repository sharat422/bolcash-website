import { describe, expect, it } from "vitest";
import { formatDate, inr, rupeesInWords } from "./format";

describe("format", () => {
  it("groups rupees the Indian way", () => {
    expect(inr(150000)).toBe("₹1,50,000");
    expect(inr(12345678)).toBe("₹1,23,45,678");
    expect(inr(1234.5)).toBe("₹1,234.50");
  });

  it("writes amounts in words", () => {
    expect(rupeesInWords(0)).toBe("Zero rupees");
    expect(rupeesInWords(1)).toBe("One rupee");
    expect(rupeesInWords(100)).toBe("One hundred rupees");
    expect(rupeesInWords(1234567)).toBe(
      "Twelve lakh thirty-four thousand five hundred sixty-seven rupees",
    );
    expect(rupeesInWords(10000000)).toBe("One crore rupees");
    expect(rupeesInWords(250.5)).toBe("Two hundred fifty rupees and fifty paise");
  });

  it("formats dates and rejects bad ones", () => {
    expect(formatDate("2026-11-05")).toBe("5 November 2026");
    expect(() => formatDate("5/11/2026")).toThrow();
  });
});
