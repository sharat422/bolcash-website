"use client";

import { useEffect, useState } from "react";
import { API_URL, LAUNCH } from "@/lib/site";
import { BUSINESS_TYPES, cleanPhone, validateWaitlist, type WaitlistValues } from "@/lib/waitlist";
import { buttonClass } from "./Button";
import { inputClass } from "./ui";

const empty: WaitlistValues = { name: "", business_type: "", city: "", phone: "", consent: false };

/**
 * Waitlist sign-up. Posts JSON to {API_URL}/waitlist.
 * The fields stay disabled until JavaScript has loaded, so without JS nothing can be sent by mistake.
 */
export function WaitlistForm({ source = "home" }: { source?: string }) {
  const [v, setV] = useState<WaitlistValues>(empty);
  const [ready, setReady] = useState(false);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => setReady(true), []);

  const set = <K extends keyof WaitlistValues>(k: K, value: WaitlistValues[K]) =>
    setV((s) => ({ ...s, [k]: value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const problem = validateWaitlist(v);
    if (problem) return setError(problem);
    setError("");
    setSending(true);
    try {
      const res = await fetch(`${API_URL}/waitlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...v,
          name: v.name.trim(),
          city: v.city.trim(),
          phone: cleanPhone(v.phone),
          source,
        }),
      });
      if (res.ok) return setDone(true);
      let msg = "Something went wrong. Please try again.";
      try {
        const body = await res.json();
        if (typeof body.detail === "string") msg = body.detail;
      } catch {}
      setError(msg);
    } catch {
      setError("Could not reach the server. Check your internet and try again.");
    } finally {
      setSending(false);
    }
  }

  if (done) {
    return (
      <p role="status" className="rounded-md border-l-4 border-primary bg-surface-2 p-4 text-lg">
        You are on the waitlist. We will message you when Bolcash launches in {LAUNCH}.
      </p>
    );
  }

  const field = "mb-1 block font-semibold";
  return (
    <form onSubmit={submit} noValidate>
      <fieldset disabled={!ready || sending} className="grid min-w-0 gap-4 border-0 p-0">
        <div>
          <label htmlFor="wl-name" className={field}>
            Name
          </label>
          <input
            id="wl-name"
            autoComplete="name"
            value={v.name}
            onChange={(e) => set("name", e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="wl-type" className={field}>
            Business type
          </label>
          <select
            id="wl-type"
            value={v.business_type}
            onChange={(e) => set("business_type", e.target.value)}
            className={inputClass}
          >
            <option value="">Select</option>
            {BUSINESS_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="wl-city" className={field}>
            City
          </label>
          <input
            id="wl-city"
            autoComplete="address-level2"
            value={v.city}
            onChange={(e) => set("city", e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="wl-phone" className={field}>
            Phone number
          </label>
          <input
            id="wl-phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            value={v.phone}
            onChange={(e) => set("phone", e.target.value)}
            aria-describedby="wl-phone-hint"
            className={inputClass}
          />
          <p id="wl-phone-hint" className="mt-1 text-sm text-muted">
            10-digit Indian mobile number.
          </p>
        </div>
        <label className="flex min-h-11 items-start gap-3">
          <input
            type="checkbox"
            checked={v.consent}
            onChange={(e) => set("consent", e.target.checked)}
            className="mt-1 h-6 w-6 shrink-0 accent-primary"
          />
          <span>I agree to be contacted about the Bolcash launch.</span>
        </label>
        {error && (
          <p
            role="alert"
            className="rounded-md border-l-4 border-accent bg-surface-2 p-3 font-semibold"
          >
            {error}
          </p>
        )}
        <button type="submit" className={buttonClass("primary", "w-full sm:w-auto")}>
          {sending ? "Joining…" : "Join the waitlist"}
        </button>
      </fieldset>
    </form>
  );
}
