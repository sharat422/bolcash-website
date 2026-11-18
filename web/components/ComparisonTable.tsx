export type ComparisonRow = { label: string; cells: string[] };

/** Scrolls inside its own box on small screens, never the whole page. */
export function ComparisonTable({
  caption,
  columns,
  rows,
}: {
  caption: string;
  columns: string[];
  rows: ComparisonRow[];
}) {
  return (
    <div role="region" aria-label={caption} tabIndex={0} className="overflow-x-auto">
      <table className="w-full border-collapse text-left text-base">
        <caption className="pb-2 text-left font-semibold">{caption}</caption>
        <thead>
          <tr className="border-b-2 border-line">
            <td />
            {columns.map((c) => (
              <th key={c} scope="col" className="p-3 font-semibold">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="border-b border-line">
              <th scope="row" className="p-3 font-semibold">
                {r.label}
              </th>
              {r.cells.map((c, i) => (
                <td key={i} className="p-3">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
