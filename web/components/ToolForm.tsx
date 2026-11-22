"use client";

import { useState } from "react";
import { calculators } from "@/lib/tools/calculators";
import { Button } from "./Button";
import { inputClass as input } from "./ui";

/** Runs fully in the browser. Nothing typed here is sent anywhere. */
export function ToolForm({ slug }: { slug: string }) {
  const calc = calculators[slug];
  if (!calc) throw new Error(`No calculator for ${slug}`);
  const [v, setV] = useState<Record<string, string>>(() =>
    Object.fromEntries(calc.fields.map((f) => [f.name, f.default])),
  );
  const result = calc.run(v);

  return (
    <div className="rounded-lg border border-line bg-surface p-5">
      <form onSubmit={(e) => e.preventDefault()} className="grid gap-4">
        {calc.fields.map((f) => {
          const id = `${slug}-${f.name}`;
          const set = (value: string) => setV((s) => ({ ...s, [f.name]: value }));
          return (
            <div key={f.name}>
              <label htmlFor={id} className="mb-1 block font-semibold">
                {f.label}
                {f.suffix && <span className="font-normal text-muted"> ({f.suffix})</span>}
              </label>
              {f.type === "select" ? (
                <select
                  id={id}
                  value={v[f.name]}
                  onChange={(e) => set(e.target.value)}
                  className={input}
                >
                  {f.options?.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={id}
                  type={f.type === "date" ? "date" : "text"}
                  inputMode={f.type === "number" ? "decimal" : undefined}
                  autoComplete="off"
                  value={v[f.name]}
                  onChange={(e) => set(e.target.value)}
                  className={input}
                />
              )}
              {f.hint && <p className="mt-1 text-sm text-muted">{f.hint}</p>}
              {f.choices && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {f.choices.map((c) => (
                    <button
                      key={c}
                      type="button"
                      aria-pressed={v[f.name] === c}
                      onClick={() => set(c)}
                      className="min-h-11 min-w-11 rounded-md border border-primary px-3 font-semibold text-primary aria-pressed:bg-primary aria-pressed:text-on-primary"
                    >
                      {c}
                      {f.suffix}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </form>

      <div aria-live="polite" className="mt-5 rounded-md bg-surface-2 p-4">
        {"error" in result ? (
          <p className="text-muted">{result.error}</p>
        ) : (
          <>
            {result.rows.length > 0 && (
              <dl className="divide-y divide-line">
                {result.rows.map((r) => (
                  <div key={r.label} className="flex justify-between gap-4 py-2">
                    <dt className="text-muted">{r.label}</dt>
                    <dd className="text-right font-semibold">{r.value}</dd>
                  </div>
                ))}
              </dl>
            )}
            {result.text && <p className="whitespace-pre-wrap">{result.text}</p>}
            {result.link && (
              <div className="mt-3">
                <Button href={result.link} external>
                  Send on WhatsApp
                </Button>
              </div>
            )}
          </>
        )}
      </div>
      <p className="mt-3 text-sm text-muted">
        Everything runs on your phone. Nothing you type is sent anywhere.
      </p>
    </div>
  );
}
