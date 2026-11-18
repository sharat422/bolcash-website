const tones = {
  info: "border-primary",
  warning: "border-accent",
};

export function Callout({
  tone = "info",
  title,
  children,
}: {
  tone?: keyof typeof tones;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <aside role="note" className={`rounded-md border-l-4 bg-surface-2 p-4 ${tones[tone]}`}>
      {title && <p className="font-semibold">{title}</p>}
      <div className={title ? "mt-1" : ""}>{children}</div>
    </aside>
  );
}
