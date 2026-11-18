import { expect, test } from "@playwright/test";

for (const [path, h1] of [
  ["/", /udhar khata and cash book/i],
  ["/features/", "BolCash features"],
  ["/download/", "Download BolCash"],
  ["/tools/", "Free tools for shop owners"],
  ["/tools/gst-calculator/", "GST calculator"],
  ["/business/", "BolCash for your business"],
  ["/business/kirana/", "BolCash for kirana stores"],
  ["/business/eatery/", "BolCash for tea stalls and eateries"],
] as const) {
  test(`${path} has one h1, one download CTA and canonical`, async ({ page }) => {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(h1);
    await expect(page.locator("#download")).toHaveCount(1);
    await expect(page.getByRole("link", { name: "Get it on Google Play" })).toHaveAttribute(
      "href",
      /^\/go\/play\?src=/,
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      /^https:\/\/bolcash\.in\//,
    );
  });
}

test("styleguide still prints a sourced fact", async ({ page }) => {
  await page.goto("/styleguide/");
  await expect(page.getByRole("link", { name: /Source: PIB/ })).toBeVisible();
});

test("home links to all 10 business pages", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('main a[href^="/business/"]')).toHaveCount(10);
});
