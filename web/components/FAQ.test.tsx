import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { FAQ } from "./FAQ";

describe("FAQ", () => {
  const items = [{ q: "Is it free?", a: "TODO: verify </script>" }];
  const html = renderToStaticMarkup(<FAQ items={items} />);

  it("renders questions in <details>", () => {
    expect(html).toContain("<details");
    expect(html).toContain("Is it free?");
  });

  it("outputs valid FAQPage JSON-LD that cannot break out of the script tag", () => {
    const json = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/)?.[1];
    expect(json).toBeDefined();
    const data = JSON.parse(json!);
    expect(data["@type"]).toBe("FAQPage");
    expect(data.mainEntity[0].name).toBe("Is it free?");
    expect(data.mainEntity[0].acceptedAnswer.text).toBe("TODO: verify </script>");
  });
});
