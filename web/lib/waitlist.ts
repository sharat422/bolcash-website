import { LAUNCH } from "./site";

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

/** Every user-facing string in the waitlist form, in one language. */
export type WaitlistText = {
  name: string;
  businessType: string;
  select: string;
  businessTypes: { readonly value: string; readonly label: string }[];
  city: string;
  phone: string;
  phoneHint: string;
  consent: string;
  submit: string;
  submitting: string;
  success: string;
  genericError: string;
  serverError: string;
  errors: {
    name: string;
    businessType: string;
    city: string;
    phone: string;
    consent: string;
  };
};

export const WAITLIST_TEXT_EN: WaitlistText = {
  name: "Name",
  businessType: "Business type",
  select: "Select",
  businessTypes: [...BUSINESS_TYPES],
  city: "City",
  phone: "Phone number",
  phoneHint: "10-digit Indian mobile number.",
  consent: "I agree to be contacted about the Bolcash launch.",
  submit: "Join the waitlist",
  submitting: "Joining…",
  success: `You are on the waitlist. We will message you when Bolcash launches in ${LAUNCH}.`,
  genericError: "Something went wrong. Please try again.",
  serverError: "Could not reach the server. Check your internet and try again.",
  errors: {
    name: "Enter your name.",
    businessType: "Choose your business type.",
    city: "Enter your city.",
    phone: "Enter a 10-digit Indian mobile number.",
    consent: "Please tick the box to agree to be contacted.",
  },
};

// Kannada form text. Have a native Kannada speaker review before the Bangalore event.
export const WAITLIST_TEXT_KN: WaitlistText = {
  name: "ಹೆಸರು",
  businessType: "ವ್ಯವಹಾರದ ವಿಧ",
  select: "ಆಯ್ಕೆಮಾಡಿ",
  businessTypes: [
    { value: "distributor", label: "ವಿತರಕರು" },
    { value: "trader", label: "ವ್ಯಾಪಾರಿ" },
    { value: "kirana", label: "ಕಿರಾಣಿ" },
    { value: "other", label: "ಇತರೆ" },
  ],
  city: "ನಗರ",
  phone: "ಫೋನ್ ಸಂಖ್ಯೆ",
  phoneHint: "10-ಅಂಕಿಯ ಭಾರತೀಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ.",
  consent: "ಬೋಲ್‌ಕ್ಯಾಶ್ ಬಿಡುಗಡೆಯ ಬಗ್ಗೆ ನನ್ನನ್ನು ಸಂಪರ್ಕಿಸಲು ನಾನು ಒಪ್ಪುತ್ತೇನೆ.",
  submit: "ವೇಟ್‌ಲಿಸ್ಟ್‌ಗೆ ಸೇರಿ",
  submitting: "ಸೇರುತ್ತಿದೆ…",
  success: `ನೀವು ವೇಟ್‌ಲಿಸ್ಟ್‌ನಲ್ಲಿದ್ದೀರಿ. ಬೋಲ್‌ಕ್ಯಾಶ್ ${LAUNCH}ರಲ್ಲಿ ಬಿಡುಗಡೆಯಾದಾಗ ನಿಮಗೆ ಸಂದೇಶ ಕಳುಹಿಸುತ್ತೇವೆ.`,
  genericError: "ಏನೋ ತಪ್ಪಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
  serverError: "ಸರ್ವರ್‌ಗೆ ಸಂಪರ್ಕ ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ನಿಮ್ಮ ಇಂಟರ್ನೆಟ್ ಪರಿಶೀಲಿಸಿ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
  errors: {
    name: "ನಿಮ್ಮ ಹೆಸರನ್ನು ನಮೂದಿಸಿ.",
    businessType: "ನಿಮ್ಮ ವ್ಯವಹಾರದ ವಿಧವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
    city: "ನಿಮ್ಮ ನಗರವನ್ನು ನಮೂದಿಸಿ.",
    phone: "10-ಅಂಕಿಯ ಭಾರತೀಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ.",
    consent: "ಸಂಪರ್ಕಿಸಲು ಒಪ್ಪಲು ಪೆಟ್ಟಿಗೆಯನ್ನು ಟಿಕ್ ಮಾಡಿ.",
  },
};

export const cleanPhone = (s: string) => s.replace(/[\s-]/g, "");

/** Returns an error message, or null if the values are fine. */
export function validateWaitlist(
  v: WaitlistValues,
  text: WaitlistText = WAITLIST_TEXT_EN,
): string | null {
  if (!v.name.trim()) return text.errors.name;
  if (!text.businessTypes.some((t) => t.value === v.business_type)) return text.errors.businessType;
  if (!v.city.trim()) return text.errors.city;
  if (!/^[6-9]\d{9}$/.test(cleanPhone(v.phone))) return text.errors.phone;
  if (!v.consent) return text.errors.consent;
  return null;
}
