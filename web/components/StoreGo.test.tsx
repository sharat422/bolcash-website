import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { StoreGo } from "./StoreGo";

describe("StoreGo", () => {
  it("with a URL: redirects with meta refresh and has a fallback link", () => {
    const url = "https://play.google.com/store/apps/details?id=com.bolcash.app";
    const html = renderToStaticMarkup(<StoreGo store="Google Play" url={url} />);
    expect(html).toContain('http-equiv="refresh"');
    expect(html).toContain(`content="0;url=${url.replace("&", "&amp;")}"`);
    expect(html).toContain(`href="${url}"`);
  });

  it("without a URL: says not available yet, no redirect, links to the waitlist", () => {
    const html = renderToStaticMarkup(<StoreGo store="Google Play" />);
    expect(html).not.toContain("refresh");
    expect(html).toContain("BolCash is not on Google Play yet");
    expect(html).toContain('href="/#waitlist"');
  });
});
