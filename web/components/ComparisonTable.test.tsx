import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ComparisonTable } from "./ComparisonTable";

describe("ComparisonTable", () => {
  const html = renderToStaticMarkup(
    <ComparisonTable
      caption="Paper vs app"
      columns={["Paper", "App"]}
      rows={[{ label: "Backup", cells: ["No", "Yes"] }]}
    />,
  );

  it("is an accessible table", () => {
    expect(html).toContain("<caption");
    expect(html).toContain('scope="col"');
    expect(html).toContain('scope="row"');
  });

  it("renders every cell", () => {
    expect(html).toContain("Backup");
    expect(html.match(/<td/g)).toHaveLength(3); // empty corner + 2 cells
  });
});
