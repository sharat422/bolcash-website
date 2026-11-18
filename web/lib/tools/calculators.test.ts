import { describe, expect, it } from "vitest";
import { getFact } from "../facts";
import { getTools } from "../tools";
import { calculators, type Result } from "./calculators";

const run = (slug: string, v: Record<string, string>): Result => calculators[slug]!.run(v);
const rows = (r: Result) => {
  if ("error" in r) throw new Error(r.error);
  return Object.fromEntries(r.rows.map((x) => [x.label, x.value]));
};

describe("calculators", () => {
  it("GST: adds and removes", () => {
    const add = rows(run("gst-calculator", { amount: "1000", rate: "18", mode: "add" }));
    expect(add["GST amount"]).toBe("₹180");
    expect(add["Price with GST"]).toBe("₹1,180");
    const rem = rows(run("gst-calculator", { amount: "1180", rate: "18", mode: "remove" }));
    expect(rem["Price before GST"]).toBe("₹1,000");
    expect(rem["CGST (half of GST)"]).toBe("₹90");
  });

  it("GST: rejects empty and silly input", () => {
    expect(run("gst-calculator", { amount: "", rate: "18", mode: "add" })).toHaveProperty("error");
    expect(run("gst-calculator", { amount: "100", rate: "150", mode: "add" })).toHaveProperty(
      "error",
    );
    expect(run("gst-calculator", { amount: "-5", rate: "18", mode: "add" })).toHaveProperty(
      "error",
    );
  });

  it("GST rate buttons come from facts.json", () => {
    const f = calculators["gst-calculator"]!.fields.find((x) => x.name === "rate")!;
    expect(f.choices).toEqual(["0", "5", "18", "40"]);
    for (const r of f.choices!) expect(getFact("gst_slabs").value).toContain(`${r}%`);
  });

  it("interest", () => {
    const r = rows(run("interest-calculator", { principal: "10000", rate: "12", days: "365" }));
    expect(r["Interest"]).toBe("₹1,200");
    expect(r["Amount plus interest"]).toBe("₹11,200");
  });

  it("EMI", () => {
    const r = rows(run("emi-calculator", { loan: "100000", rate: "12", months: "12" }));
    expect(r["Monthly EMI"]).toBe("₹8,884.88");
    expect(
      rows(run("emi-calculator", { loan: "12000", rate: "0", months: "12" }))["Monthly EMI"],
    ).toBe("₹1,000");
    expect(run("emi-calculator", { loan: "1000", rate: "10", months: "0" })).toHaveProperty(
      "error",
    );
  });

  it("profit, margin and markup; loss", () => {
    const r = rows(run("profit-margin-calculator", { cost: "80", sell: "100" }));
    expect(r["Profit"]).toBe("₹20");
    expect(r["Margin (of selling price)"]).toBe("20%");
    expect(r["Markup (of cost price)"]).toBe("25%");
    expect(rows(run("profit-margin-calculator", { cost: "100", sell: "80" }))["Loss"]).toBe("₹20");
  });

  it("discount", () => {
    const r = rows(run("discount-calculator", { price: "2000", off: "10" }));
    expect(r["You save"]).toBe("₹200");
    expect(r["Price after discount"]).toBe("₹1,800");
  });

  it("amount in words", () => {
    expect(rows(run("amount-in-words", { amount: "150000" }))["In words"]).toBe(
      "One lakh fifty thousand rupees",
    );
    expect(run("amount-in-words", { amount: "1e10" })).toHaveProperty("error");
  });

  it("MSME due date uses the days in facts.json and caps agreed days", () => {
    const none = rows(
      run("msme-payment-due-date", { date: "2026-11-01", agreement: "none", days: "" }),
    );
    expect(none["Days allowed"]).toBe("15");
    expect(none["Last date to pay"]).toBe("16 November 2026");
    const capped = rows(
      run("msme-payment-due-date", { date: "2026-11-01", agreement: "written", days: "90" }),
    );
    expect(capped["Days allowed"]).toBe("45");
    expect(capped["Last date to pay"]).toBe("16 December 2026");
    expect(run("msme-payment-due-date", { date: "", agreement: "none", days: "" })).toHaveProperty(
      "error",
    );
  });

  it("MSME days match the fact text", () => {
    const v = getFact("msme_payment_rule").value;
    expect(v).toContain("within 15 days");
    expect(v).toContain("within 45 days");
  });

  it("reminder message and WhatsApp link", () => {
    const r = run("udhar-reminder-message", {
      lang: "en",
      name: "Ravi",
      amount: "1500",
      shop: "Sri Stores",
      phone: "98765 43210",
    });
    if ("error" in r) throw new Error(r.error);
    expect(r.text).toBe(
      "Namaste Ravi, this is a reminder from Sri Stores. ₹1,500 is pending. Please pay when you can. Thank you.",
    );
    expect(r.link).toMatch(/^https:\/\/wa\.me\/919876543210\?text=/);
    const hi = run("udhar-reminder-message", {
      lang: "hi",
      name: "रवि",
      amount: "1500",
      shop: "",
      phone: "",
    });
    if ("error" in hi) throw new Error(hi.error);
    expect(hi.text).toContain("₹1,500");
    expect(hi.link).toMatch(/^https:\/\/wa\.me\/\?text=/);
    expect(
      run("udhar-reminder-message", {
        lang: "en",
        name: "Ravi",
        amount: "1500",
        shop: "",
        phone: "123",
      }),
    ).toHaveProperty("error");
  });

  it("every tool page has a calculator and every calculator has a page", () => {
    expect(
      getTools()
        .map((t) => t.slug)
        .sort(),
    ).toEqual(Object.keys(calculators).sort());
    expect(getTools()).toHaveLength(8);
  });

  it("tool copy has no numbers, prices or percentages outside formulas and facts", () => {
    for (const t of getTools()) {
      const text = [
        t.name,
        t.blurb,
        t.intro,
        t.note ?? "",
        ...t.steps.flatMap((s) => [s.title, s.body ?? ""]),
      ].join(" ");
      expect(text, t.slug).not.toMatch(/[0-9₹%]/);
    }
  });
});
