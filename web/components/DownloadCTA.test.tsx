import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { DownloadCTA } from "./DownloadCTA";

describe("DownloadCTA with a Google Play URL configured", () => {
  const html = renderToStaticMarkup(
    <DownloadCTA slug="tools/emi" title="EMI calculator" playStore />,
  );

  it("links Play Store with the page slug", () => {
    expect(html).toContain('href="/go/play?src=tools%2Femi"');
  });

  it("draws the QR code at build time, for the same /go/play link", () => {
    expect(html).toContain("<svg");
    expect(html).toContain("QR code");
  });

  it("shares the page URL on WhatsApp", () => {
    expect(html).toContain(
      `https://wa.me/?text=${encodeURIComponent("EMI calculator https://bolcash.com/tools/emi/")}`,
    );
  });

  it("has the #download anchor and no waitlist fallback", () => {
    expect(html).toContain('id="download"');
    expect(html).not.toContain("/#waitlist");
  });

  it("hides the App Store button until it is configured", () => {
    expect(html).not.toContain("App Store");
    expect(html).not.toContain("/go/appstore");
    const on = renderToStaticMarkup(<DownloadCTA slug="x" title="X" playStore appStore />);
    expect(on).toContain("/go/appstore?src=x");
  });
});

describe("DownloadCTA with no store URL configured (the default)", () => {
  const html = renderToStaticMarkup(<DownloadCTA slug="tools/emi" title="EMI calculator" />);

  it("shows no store button, no QR code and no /go/ link", () => {
    expect(html).not.toContain("/go/");
    expect(html).not.toContain("Google Play");
    expect(html).not.toContain("App Store");
    expect(html).not.toContain("<svg");
  });

  it("points to the waitlist and still has the share button and #download anchor", () => {
    expect(html).toContain('href="/#waitlist"');
    expect(html).toContain("Join the waitlist");
    expect(html).toContain("BolCash launches in December 2026");
    expect(html).toContain("https://wa.me/?text=");
    expect(html).toContain('id="download"');
  });

  it("an App Store URL alone shows only the App Store button", () => {
    const only = renderToStaticMarkup(<DownloadCTA slug="x" title="X" appStore />);
    expect(only).toContain("/go/appstore?src=x");
    expect(only).not.toContain("/go/play");
    expect(only).not.toContain("<svg");
    expect(only).not.toContain("/#waitlist");
  });
});
