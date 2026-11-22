import { expect, test } from "@playwright/test";

test("robots.txt allows everything and points to the sitemap", async ({ request }) => {
  const res = await request.get("/robots.txt");
  expect(res.ok()).toBe(true);
  const text = await res.text();
  expect(text).toContain("Allow: /");
  expect(text).toContain("Sitemap: https://bolcash.com/sitemap.xml");
  expect(text).not.toMatch(/^Disallow:\s*\/\s*$/m);
});

test("every URL in sitemap.xml is a real page, and noindex pages are left out", async ({
  request,
}) => {
  const res = await request.get("/sitemap.xml");
  expect(res.ok()).toBe(true);
  const xml = await res.text();
  const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]!).pathname);
  expect(paths.length).toBeGreaterThan(40);
  expect(paths).toContain("/");
  expect(paths).toContain("/guides/recording-partial-payments/");
  expect(paths.some((p) => p.startsWith("/styleguide") || p.startsWith("/go/"))).toBe(false);
  for (const p of paths) {
    const page = await request.get(p);
    expect(page.status(), p).toBe(200);
  }
});

test("favicon is linked and served", async ({ page, request }) => {
  await page.goto("/");
  await expect(page.locator('link[rel="icon"]')).toHaveAttribute("href", "/favicon.svg");
  const res = await request.get("/favicon.svg");
  expect(res.ok()).toBe(true);
  expect(res.headers()["content-type"]).toContain("svg");
  expect(await res.text()).toContain("<svg");
});

test("home page title, language and Open Graph match the hero", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "en-IN");
  await expect(page).toHaveTitle("Bolcash — digital udhar khata for Indian distributors");
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    "content",
    "Bolcash — the khata that closes the day.",
  );
  const description = await page.locator('meta[name="description"]').getAttribute("content");
  expect(description).toMatch(/^For small FMCG distributors in India/);
  await expect(page.locator('meta[property="og:description"]')).toHaveAttribute(
    "content",
    description!,
  );
});

test("other pages get their own Open Graph title and URL", async ({ page }) => {
  await page.goto("/guides/gst-slabs-explained/");
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    "content",
    "GST rates (slabs) explained",
  );
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
    "content",
    "https://bolcash.com/guides/gst-slabs-explained/",
  );
});
