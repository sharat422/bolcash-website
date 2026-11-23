import { describe, expect, it } from "vitest";
import { getSiteRoutes } from "./routes";

describe("getSiteRoutes", () => {
  const routes = getSiteRoutes();
  const paths = routes.map((r) => r.path);

  it("lists the core pages, the hubs and the Hindi and Kannada home pages", () => {
    for (const p of [
      "/",
      "/features/",
      "/download/",
      "/business/",
      "/tools/",
      "/guides/",
      "/hi/",
      "/kn/",
      "/privacy/",
      "/terms/",
      "/about/",
      "/contact/",
      "/guides/recording-partial-payments/",
      "/business/kirana/",
      "/tools/gst-calculator/",
      "/guides/gst-slabs-explained/",
    ]) {
      expect(paths, p).toContain(p);
    }
  });

  it("never lists noindex pages", () => {
    expect(paths.filter((p) => p.startsWith("/styleguide") || p.startsWith("/go/"))).toEqual([]);
  });

  it("has no duplicates, and every path starts and ends with a slash", () => {
    expect(new Set(paths).size).toBe(paths.length);
    for (const p of paths) expect(p, p).toMatch(/^\/(.*\/)?$/);
  });

  it("only gives a lastModified that is a real date", () => {
    for (const r of routes) {
      if (r.lastModified) expect(r.lastModified, r.path).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });
});
