import { formatDate } from "@/lib/format";

/** `date` is YYYY-MM-DD (from frontmatter). */
export function LastUpdated({ date }: { date: string }) {
  return (
    <p className="text-sm text-muted">
      Last updated: <time dateTime={date}>{formatDate(date)}</time>
    </p>
  );
}
