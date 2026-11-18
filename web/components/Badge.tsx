const tones = { neutral: "bg-surface-2 text-muted", accent: "bg-accent text-on-accent" };

export function Badge({
  tone = "neutral",
  children,
}: {
  tone?: keyof typeof tones;
  children: React.ReactNode;
}) {
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}
