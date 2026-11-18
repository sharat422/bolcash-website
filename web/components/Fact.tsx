import { getFact, type FactId } from "@/lib/facts";

export function Fact({ id }: { id: FactId }) {
  const { value, asOf, sourceName, sourceUrl } = getFact(id);
  return (
    <span>
      {value}{" "}
      <small className="text-muted">
        {sourceUrl ? (
          <a href={sourceUrl} className="inline-block min-h-11 underline" rel="noopener">
            Source: {sourceName}
          </a>
        ) : (
          <>TODO: verify</>
        )}
        {asOf ? `, as of ${asOf}` : ""}
      </small>
    </span>
  );
}
