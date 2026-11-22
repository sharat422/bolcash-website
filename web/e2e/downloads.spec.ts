import { expect, test } from "@playwright/test";

const content = [
  "/features/",
  "/business/",
  "/business/kirana/",
  "/guides/",
  "/guides/gst-slabs-explained/",
  "/tools/",
  "/tools/gst-calculator/",
  "/download/",
  "/about/",
];

for (const path of content) {
  test(`${path} ends with the call to action and shows no store link before launch`, async ({
    page,
  }) => {
    await page.goto(path);
    const cta = page.locator("#download");
    await expect(cta).toHaveCount(1);
    await expect(cta.getByRole("link", { name: "Join the waitlist" })).toHaveAttribute(
      "href",
      "/#waitlist",
    );
    await expect(cta.getByRole("link", { name: "Share on WhatsApp" })).toBeVisible();
    await expect(page.locator('a[href^="/go/"]')).toHaveCount(0);
    await expect(cta.getByRole("img", { name: /QR code/ })).toHaveCount(0);
  });
}

test("home pages use the waitlist, not a download box", async ({ page }) => {
  for (const path of ["/", "/hi/"]) {
    await page.goto(path);
    await expect(page.locator("#download")).toHaveCount(0);
    await expect(page.locator('a[href^="/go/"]')).toHaveCount(0);
  }
});

for (const [path, store] of [
  ["/go/play/", "Google Play"],
  ["/go/appstore/", "the App Store"],
] as const) {
  test(`${path} says the app is not there yet when no store URL is configured`, async ({
    page,
  }) => {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      `BolCash is not on ${store} yet`,
    );
    await expect(page.locator('meta[http-equiv="refresh"]')).toHaveCount(0);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  });
}
