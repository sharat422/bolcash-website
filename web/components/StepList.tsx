export type Step = { title: string; body?: string };

export function StepList({ steps }: { steps: Step[] }) {
  return (
    <ol className="space-y-4">
      {steps.map((s, i) => (
        <li key={s.title} className="flex gap-3">
          <span
            aria-hidden="true"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-on-primary"
          >
            {i + 1}
          </span>
          <div>
            <h3 className="font-semibold">{s.title}</h3>
            {s.body && <p className="mt-1 text-muted">{s.body}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}
