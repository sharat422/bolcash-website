const round2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;

/** 150000 -> ₹1,50,000 (Indian digit grouping). */
export function inr(n: number): string {
  const v = round2(n);
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: Number.isInteger(v) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(v);
}

export const percent = (n: number) => `${round2(n)}%`;

/** "2026-11-05" -> "5 November 2026" */
export function formatDate(iso: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) throw new Error(`Bad date "${iso}"`);
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

const ones = [
  "",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
];
const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

function below100(n: number) {
  return n < 20 ? ones[n]! : tens[Math.floor(n / 10)]! + (n % 10 ? `-${ones[n % 10]}` : "");
}
function below1000(n: number) {
  const h = Math.floor(n / 100);
  return [h ? `${ones[h]} hundred` : "", n % 100 ? below100(n % 100) : ""]
    .filter(Boolean)
    .join(" ");
}

/** 150000 -> "One lakh fifty thousand rupees". Indian system. Below 1000 crore. */
export function rupeesInWords(amount: number): string {
  const paiseTotal = Math.round(amount * 100);
  const rupees = Math.floor(paiseTotal / 100);
  const paise = paiseTotal % 100;
  if (rupees >= 1e10) throw new Error("Amount too large");

  const groups: [number, string][] = [
    [Math.floor(rupees / 1e7), "crore"],
    [Math.floor((rupees % 1e7) / 1e5), "lakh"],
    [Math.floor((rupees % 1e5) / 1e3), "thousand"],
  ];
  const words = [
    ...groups.filter(([n]) => n > 0).map(([n, name]) => `${below1000(n)} ${name}`),
    rupees % 1e3 ? below1000(rupees % 1e3) : "",
  ].filter(Boolean);

  let text = `${words.length ? words.join(" ") : "zero"} ${rupees === 1 ? "rupee" : "rupees"}`;
  if (paise) text += ` and ${below100(paise)} paise`;
  return text.charAt(0).toUpperCase() + text.slice(1);
}
