import { formatDate } from "@/lib/format";
import { getFact, type FactId } from "@/lib/facts";

export function Fact({ id }: { id: FactId }) {
  const { value, asOf, sourceName, sourceUrl } = getFact(id);
  return (
    <span>
      {value}
      <small className="block text-muted">
        {sourceUrl ? (
          <a
            href={sourceUrl}
            className="inline-flex min-h-11 items-center underline"
            rel="noopener"
          >
            Source: {sourceName}
          </a>
        ) : (
          <>TODO: verify</>
        )}
        {asOf ? ` (as of ${formatDate(asOf)})` : ""}
      </small>
    </span>
  );
}
