/** `date` is YYYY-MM-DD (from frontmatter). */
export function LastUpdated({ date }: { date: string }) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error(`LastUpdated: bad date "${date}"`);
  const text = new Date(`${date}T00:00:00Z`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
  return (
    <p className="text-sm text-muted">
      Last updated: <time dateTime={date}>{text}</time>
    </p>
  );
}
