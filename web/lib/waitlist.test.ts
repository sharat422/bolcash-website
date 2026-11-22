import { describe, expect, it } from "vitest";
import { cleanPhone, validateWaitlist, type WaitlistValues } from "./waitlist";

const ok: WaitlistValues = {
  name: "Ravi",
  business_type: "distributor",
  city: "Pune",
  phone: "9876543210",
  consent: true,
};

describe("validateWaitlist", () => {
  it("accepts good values", () => {
    expect(validateWaitlist(ok)).toBeNull();
    expect(validateWaitlist({ ...ok, phone: "98765 43210" })).toBeNull();
    expect(validateWaitlist({ ...ok, phone: "98765-43210" })).toBeNull();
  });

  it("needs a name, a type from the list, and a city", () => {
    expect(validateWaitlist({ ...ok, name: "  " })).toMatch(/name/);
    expect(validateWaitlist({ ...ok, business_type: "" })).toMatch(/business type/);
    expect(validateWaitlist({ ...ok, business_type: "Bank" })).toMatch(/business type/);
    expect(validateWaitlist({ ...ok, city: "" })).toMatch(/city/);
  });

  it("needs a 10-digit Indian mobile number starting 6 to 9", () => {
    for (const phone of ["", "12345", "98765432101", "5876543210", "98765abcde"]) {
      expect(validateWaitlist({ ...ok, phone }), phone).toMatch(/10-digit/);
    }
    expect(cleanPhone(" 98765 43210 ")).toBe("9876543210");
  });

  it("needs consent", () => {
    expect(validateWaitlist({ ...ok, consent: false })).toMatch(/agree/);
  });
});
