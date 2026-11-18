import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { StepList } from "./StepList";

describe("StepList", () => {
  it("renders an ordered list, body optional", () => {
    const html = renderToStaticMarkup(
      <StepList
        steps={[{ title: "Open the app", body: "Tap Start." }, { title: "Add a customer" }]}
      />,
    );
    expect(html).toContain("<ol");
    expect(html.match(/<li/g)).toHaveLength(2);
    expect(html).toContain("Tap Start.");
  });
});
