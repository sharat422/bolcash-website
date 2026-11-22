import { expect, test } from "@playwright/test";

for (const [path, h1] of [
  ["/features/", "BolCash features"],
  ["/download/", "Download BolCash"],
  ["/about/", "About BolCash"],
  ["/privacy/", "Privacy policy"],
  ["/terms/", "Terms of use"],
  ["/contact/", "Contact and grievance"],
  ["/guides/", "Guides for shop owners"],
  ["/guides/udyam-registration/", "Udyam registration: what it is and why it matters"],
  ["/tools/", "Free tools for shop owners"],
  ["/tools/gst-calculator/", "GST calculator"],
  ["/business/", "BolCash for your business"],
  ["/business/kirana/", "BolCash for kirana stores"],
  ["/business/eatery/", "BolCash for tea stalls and eateries"],
] as const) {
  test(`${path} has one h1, one call to action and canonical`, async ({ page }) => {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(h1);
    await expect(page.locator("#download")).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      /^https:\/\/bolcash\.com\//,
    );
  });
}

test("styleguide still prints a sourced fact", async ({ page }) => {
  await page.goto("/styleguide/");
  await expect(page.getByRole("link", { name: /Source: PIB/ })).toBeVisible();
});

test("Hindi home page", async ({ page }) => {
  await page.goto("/hi/");
  await expect(page.locator("main [lang=hi]")).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("उधार खाता");
});

test("features page lists the real features and no unverified ones", async ({ page }) => {
  await page.goto("/features/");
  for (const t of [
    "Beat or route ledger",
    "Beat collections",
    "Reconcile the daily close",
    "Receipt scanning",
  ]) {
    await expect(page.getByRole("heading", { name: t })).toBeVisible();
  }
  const body = (await page.locator("main").innerText()).toLowerCase();
  for (const banned of ["gst filing", "lending", "automatic", "upi"])
    expect(body).not.toContain(banned);
});
