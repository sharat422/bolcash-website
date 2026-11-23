import { SITE_URL } from "./site";

/**
 * Search keywords for Bolcash. Target: small FMCG distributors and agencies
 * in India searching for a khata / billing / collections app, or for answers
 * to their day-to-day questions (beat plan, collections, UPI reconciliation,
 * daily close, GST invoice for the CA).
 *
 * Honest scope: Bolcash is a bookkeeping app for small distributors, not a
 * full DMS / SFA. So the keywords target khata, billing, ledger and
 * collections terms — not enterprise DMS / SFA / order-booking terms, which
 * the big distributor platforms already own and Bolcash does not do.
 */
export const HOME_KEYWORDS = [
  "khata app for FMCG distributors",
  "distributor khata app",
  "udhar khata app for distributors",
  "FMCG distributor billing software",
  "distributor billing software India",
  "distributor accounting software India",
  "beat ledger app",
  "beat collections app",
  "distributor collections app",
  "GST billing app for distributors",
  "wholesale billing software India",
  "udhar khata app",
  "khata app for distributors",
  "daily close app for distributors",
  "distributor stock management app",
  "Bolcash",
];

export const FEATURES_KEYWORDS = [
  "khata app features",
  "beat ledger",
  "beat collections",
  "distributor daily close",
  "UPI reconciliation for distributors",
  "GST invoice for distributors",
  "CA Tally export",
  "distributor stock management",
  "Bolcash",
];

export const GUIDES_KEYWORDS = [
  "distributor guides",
  "GST guide for small business",
  "UPI guide for shops",
  "how to reconcile UPI payments",
  "MSME payment rules",
  "Bolcash",
];

export const TOOLS_KEYWORDS = [
  "GST calculator",
  "EMI calculator",
  "udhar reminder message",
  "free calculators for small business",
  "Bolcash",
];

export const BUSINESS_KEYWORDS = [
  "udhar khata app",
  "khata app for small business",
  "billing software for shops India",
  "Bolcash",
];

/** Questions FMCG distributors and agencies actually search for. */
export const FAQ_ITEMS: { question: string; answer: string }[] = [
  {
    question: "What is a beat plan?",
    answer:
      "A beat is the fixed route a salesman covers, usually on the same day each week. A beat plan lists which retailers to visit, in which order, so no shop is missed and no day is wasted.",
  },
  {
    question: "How do I track collections on a beat?",
    answer:
      "Record each collection against the retailer's bill, on the beat itself. Bolcash keeps one ledger per beat, so one salesman's collections never mix with another's, and you can see what is still due on each bill.",
  },
  {
    question: "How do I reconcile UPI payments as a distributor?",
    answer:
      "Match each UPI payment to the retailer's bill by hand, using the UPI reference. Bolcash records UPI payments against the bill and never holds or moves your money.",
  },
  {
    question: "How do I do a daily close for a distributor?",
    answer:
      "At the end of the day, match the cash collected to what was written down, for each beat. Bolcash reconciles cash, UPI, credit given and credit collected at the end of the day.",
  },
  {
    question: "Can I export my data for my CA or Tally?",
    answer:
      "Yes. Bolcash makes GST invoices with an export for your CA and Tally, and your data and export are always free.",
  },
  {
    question: "When does Bolcash launch, and what does it cost?",
    answer:
      "Bolcash launches in December 2026. Join the waitlist and we will message you when it launches, with the price.",
  },
  {
    question: "Which businesses is Bolcash for?",
    answer:
      "Small FMCG distributors with one to four beats and eighty to three hundred retailers. Hardware and building-material traders can use it too.",
  },
];

/** Structured data for the homepage. Keep every claim in here true of the app. */
export function softwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Bolcash",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Android, iOS",
    description:
      "Khata app for small FMCG distributors in India: beat ledgers, beat collections, UPI reconciliation, GST invoices with Tally export, stock basics, and a daily close that reconciles cash, UPI and credit.",
    inLanguage: ["en", "hi", "te", "kn"],
    author: { "@type": "Organization", name: "Bolcash", url: SITE_URL },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Bolcash",
    url: SITE_URL,
    description:
      "Bolcash is a khata app for small FMCG distributors in India: beat ledgers, collections, and a daily close that reconciles cash, UPI and credit.",
  };
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
