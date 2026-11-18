import { expect, test } from "@playwright/test";

for (const [path, h1] of [
  ["/", /udhar khata and cash book/i],
  ["/features/", "BolCash features"],
  ["/download/", "Download BolCash"],
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
