import { expect, test } from "@playwright/test";

for (const width of [360, 768, 1280]) {
  test.describe(`${width}px`, () => {
    test.use({ viewport: { width, height: 800 } });

    for (const path of ["/", "/features/", "/download/", "/styleguide/"]) {
      test(`${path} has no sideways scroll and 44px tap targets`, async ({ page }) => {
        await page.goto(path);
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        );
        expect(overflow).toBeLessThanOrEqual(0);

        const small = await page.$$eval(
          "header a:visible, header summary, footer a",
          (els) =>
            els.map((e) => e.getBoundingClientRect()).filter((r) => r.width > 0 && r.height < 44)
              .length,
        );
        expect(small).toBe(0);
        await expect(page.getByRole("link", { name: "Download app" })).toBeVisible();
      });
    }
  });
}

test("styleguide is noindex", async ({ page }) => {
  await page.goto("/styleguide/");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
});
