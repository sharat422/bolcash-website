/** `value` is what the API accepts. `label` is what people see. */
export const BUSINESS_TYPES = [
  { value: "distributor", label: "Distributor" },
  { value: "trader", label: "Trader" },
  { value: "kirana", label: "Kirana" },
  { value: "other", label: "Other" },
] as const;

/** The form fields. The JSON sent to POST {API_URL}/waitlist is these plus `source` (the page slug). */
export type WaitlistValues = {
  name: string;
  business_type: string;
  city: string;
  phone: string;
  consent: boolean;
};

export const cleanPhone = (s: string) => s.replace(/[\s-]/g, "");

/** Returns an error message, or null if the values are fine. */
export function validateWaitlist(v: WaitlistValues): string | null {
  if (!v.name.trim()) return "Enter your name.";
  if (!BUSINESS_TYPES.some((t) => t.value === v.business_type)) return "Choose your business type.";
  if (!v.city.trim()) return "Enter your city.";
  if (!/^[6-9]\d{9}$/.test(cleanPhone(v.phone))) return "Enter a 10-digit Indian mobile number.";
  if (!v.consent) return "Please tick the box to agree to be contacted.";
  return null;
}
