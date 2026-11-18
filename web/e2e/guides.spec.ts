import { expect, test } from "@playwright/test";

test("tax guide shows date, facts, sources, draft note and the CA note", async ({ page }) => {
  await page.goto("/guides/gst-slabs-explained/");
  await expect(page.getByText("Last updated:")).toBeVisible();
  await expect(page.getByText("0%, 5%, 18% and 40%")).toBeVisible();
  await expect(page.getByRole("link", { name: /gst\.gov\.in/ }).first()).toBeVisible();
  await expect(page.getByText("TODO: verify this guide")).toBeVisible();
  await expect(page.getByText("Confirm with a CA.")).toBeVisible();
  await expect(page.locator("#download")).toHaveCount(1);
});

test("non-tax guide has no CA note", async ({ page }) => {
  await page.goto("/guides/emi-for-a-business-loan/");
  await expect(page.getByText("Last updated:")).toBeVisible();
  await expect(page.getByText("Confirm with a CA.")).toHaveCount(0);
});

test("hub lists all 16 guides", async ({ page }) => {
  await page.goto("/guides/");
  await expect(page.locator('main a[href^="/guides/"]')).toHaveCount(16);
});
