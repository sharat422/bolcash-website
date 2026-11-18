import { factData } from "@/lib/facts";
import { formatDate, inr, percent, rupeesInWords } from "@/lib/format";

export type Field = {
  name: string;
  label: string;
  type: "number" | "date" | "text" | "select";
  default: string;
  options?: { value: string; label: string }[];
  choices?: string[]; // quick-pick buttons
  suffix?: string;
  hint?: string;
};

export type Result =
  { error: string } | { rows: { label: string; value: string }[]; text?: string; link?: string };

export type Calc = { fields: Field[]; run: (v: Record<string, string>) => Result };

const num = (s: string | undefined) => (s?.trim() ? Number(s.replace(/,/g, "")) : NaN);
const bad = (...n: number[]) => n.some((x) => !Number.isFinite(x) || x < 0);
const need = (error = "Fill in the details to see the result.") => ({ error });

const gstRates = factData<{ rates: number[] }>("gst_slabs").rates;
const msme = factData<{ noAgreementDays: number; maxAgreementDays: number }>("msme_payment_rule");

export const calculators: Record<string, Calc> = {
  "gst-calculator": {
    fields: [
      { name: "amount", label: "Amount", type: "number", default: "", suffix: "₹" },
      {
        name: "rate",
        label: "GST rate",
        type: "number",
        default: "",
        suffix: "%",
        choices: gstRates.map(String),
      },
      {
        name: "mode",
        label: "What do you want to do?",
        type: "select",
        default: "add",
        options: [
          { value: "add", label: "Add GST to a price" },
          { value: "remove", label: "Remove GST from a price" },
        ],
      },
    ],
    run(v) {
      const a = num(v.amount);
      const r = num(v.rate);
      if (bad(a, r) || r > 100) return need();
      const base = v.mode === "remove" ? (a * 100) / (100 + r) : a;
      const gst = v.mode === "remove" ? a - base : (a * r) / 100;
      return {
        rows: [
          { label: "Price before GST", value: inr(base) },
          { label: "GST amount", value: inr(gst) },
          { label: "CGST (half of GST)", value: inr(gst / 2) },
          { label: "SGST (half of GST)", value: inr(gst / 2) },
          { label: "Price with GST", value: inr(base + gst) },
        ],
      };
    },
  },

  "interest-calculator": {
    fields: [
      { name: "principal", label: "Amount", type: "number", default: "", suffix: "₹" },
      { name: "rate", label: "Interest rate per year", type: "number", default: "", suffix: "%" },
      { name: "days", label: "Number of days", type: "number", default: "" },
    ],
    run(v) {
      const p = num(v.principal);
      const r = num(v.rate);
      const d = num(v.days);
      if (bad(p, r, d)) return need();
      const interest = (p * r * d) / 36500;
      return {
        rows: [
          { label: "Interest", value: inr(interest) },
          { label: "Amount plus interest", value: inr(p + interest) },
        ],
      };
    },
  },

  "emi-calculator": {
    fields: [
      { name: "loan", label: "Loan amount", type: "number", default: "", suffix: "₹" },
      { name: "rate", label: "Interest rate per year", type: "number", default: "", suffix: "%" },
      { name: "months", label: "Number of months", type: "number", default: "" },
    ],
    run(v) {
      const p = num(v.loan);
      const annual = num(v.rate);
      const n = num(v.months);
      if (bad(p, annual, n) || n < 1 || !Number.isInteger(n)) return need();
      const r = annual / 12 / 100;
      const emi = r === 0 ? p / n : (p * r * (1 + r) ** n) / ((1 + r) ** n - 1);
      return {
        rows: [
          { label: "Monthly EMI", value: inr(emi) },
          { label: "Total interest", value: inr(emi * n - p) },
          { label: "Total to pay", value: inr(emi * n) },
        ],
      };
    },
  },

  "profit-margin-calculator": {
    fields: [
      { name: "cost", label: "Cost price", type: "number", default: "", suffix: "₹" },
      { name: "sell", label: "Selling price", type: "number", default: "", suffix: "₹" },
    ],
    run(v) {
      const c = num(v.cost);
      const s = num(v.sell);
      if (bad(c, s) || c === 0 || s === 0) return need();
      const profit = s - c;
      return {
        rows: [
          { label: profit < 0 ? "Loss" : "Profit", value: inr(Math.abs(profit)) },
          { label: "Margin (of selling price)", value: percent((profit / s) * 100) },
          { label: "Markup (of cost price)", value: percent((profit / c) * 100) },
        ],
      };
    },
  },

  "discount-calculator": {
    fields: [
      { name: "price", label: "Price", type: "number", default: "", suffix: "₹" },
      { name: "off", label: "Discount", type: "number", default: "", suffix: "%" },
    ],
    run(v) {
      const p = num(v.price);
      const d = num(v.off);
      if (bad(p, d) || d > 100) return need();
      return {
        rows: [
          { label: "You save", value: inr((p * d) / 100) },
          { label: "Price after discount", value: inr(p - (p * d) / 100) },
        ],
      };
    },
  },

  "amount-in-words": {
    fields: [{ name: "amount", label: "Amount", type: "number", default: "", suffix: "₹" }],
    run(v) {
      const a = num(v.amount);
      if (bad(a)) return need();
      if (a >= 1e10) return { error: "Please enter an amount below 1,000 crore." };
      return {
        rows: [
          { label: "In figures", value: inr(a) },
          { label: "In words", value: rupeesInWords(a) },
        ],
      };
    },
  },

  "msme-payment-due-date": {
    fields: [
      { name: "date", label: "Date of acceptance of goods or services", type: "date", default: "" },
      {
        name: "agreement",
        label: "Written agreement with the supplier?",
        type: "select",
        default: "none",
        options: [
          { value: "none", label: "No written agreement" },
          { value: "written", label: "Yes, there is a written agreement" },
        ],
      },
      {
        name: "days",
        label: "Days agreed in writing",
        type: "number",
        default: "",
        hint: "Only if you have a written agreement.",
      },
    ],
    run(v) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(v.date ?? ""))
        return need("Pick the date to see the result.");
      let days = msme.noAgreementDays;
      if (v.agreement === "written") {
        const agreed = num(v.days);
        if (bad(agreed) || agreed < 1) return need("Enter the days agreed in writing.");
        days = Math.min(agreed, msme.maxAgreementDays);
      }
      const [y, m, d] = v.date!.split("-").map(Number) as [number, number, number];
      const due = new Date(Date.UTC(y, m - 1, d + days)).toISOString().slice(0, 10);
      return {
        rows: [
          { label: "Days allowed", value: String(days) },
          { label: "Last date to pay", value: formatDate(due) },
        ],
      };
    },
  },

  "udhar-reminder-message": {
    fields: [
      {
        name: "lang",
        label: "Language",
        type: "select",
        default: "en",
        options: [
          { value: "en", label: "English" },
          { value: "hi", label: "हिन्दी" },
        ],
      },
      { name: "name", label: "Customer name", type: "text", default: "" },
      { name: "amount", label: "Amount pending", type: "number", default: "", suffix: "₹" },
      { name: "shop", label: "Your shop name (optional)", type: "text", default: "" },
      {
        name: "phone",
        label: "Customer mobile number (optional)",
        type: "text",
        default: "",
        hint: "10 digits. Opens the chat directly.",
      },
    ],
    run(v) {
      const name = v.name?.trim() ?? "";
      const shop = v.shop?.trim() ?? "";
      const amount = num(v.amount);
      if (!name || bad(amount) || amount === 0)
        return need("Enter the customer name and the amount.");
      const phone = (v.phone ?? "").replace(/\D/g, "");
      if (v.phone?.trim() && phone.length !== 10)
        return need("Enter a 10-digit mobile number, or leave it empty.");

      const text =
        v.lang === "hi"
          ? `नमस्ते ${name}, ${shop ? `${shop} की तरफ़ से ` : ""}याद दिलाना: आपके ${inr(amount)} बाकी हैं। कृपया सुविधा से भुगतान कर दें। धन्यवाद।`
          : `Namaste ${name}, this is a reminder${shop ? ` from ${shop}` : ""}. ${inr(amount)} is pending. Please pay when you can. Thank you.`;
      const link = `https://wa.me/${phone ? `91${phone}` : ""}?text=${encodeURIComponent(text)}`;
      return { rows: [], text, link };
    },
  },
};
