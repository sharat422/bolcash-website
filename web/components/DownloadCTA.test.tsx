import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { DownloadCTA } from "./DownloadCTA";

describe("DownloadCTA", () => {
  const html = renderToStaticMarkup(<DownloadCTA slug="tools/emi" title="EMI calculator" />);

  it("links Play Store with the page slug", () => {
    expect(html).toContain('href="/go/play?src=tools%2Femi"');
  });

  it("hides the App Store button until the flag is on", () => {
    expect(html).not.toContain("App Store");
    const on = renderToStaticMarkup(<DownloadCTA slug="x" title="X" showAppStore />);
    expect(on).toContain("/go/appstore?src=x");
  });

  it("draws the QR code at build time", () => {
    expect(html).toContain("<svg");
    expect(html).toContain("QR code");
  });

  it("shares the page URL on WhatsApp", () => {
    expect(html).toContain(
      `https://wa.me/?text=${encodeURIComponent("EMI calculator https://bolcash.in/tools/emi/")}`,
    );
  });

  it("has the #download anchor the header button points to", () => {
    expect(html).toContain('id="download"');
  });
});
