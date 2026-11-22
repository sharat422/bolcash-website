import { expect, test } from "@playwright/test";

test("footer links reach the trust pages", async ({ page }) => {
  await page.goto("/");
  for (const [name, h1] of [
    ["About BolCash", "About BolCash"],
    ["Contact and grievance", "Contact and grievance"],
    ["Privacy policy", "Privacy policy"],
    ["Terms of use", "Terms of use"],
  ] as const) {
    await page.goto("/");
    await page.locator("footer").getByRole("link", { name, exact: true }).click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(h1);
  }
});

test("contact page shows no invented details", async ({ page }) => {
  await page.goto("/contact/");
  await expect(page.getByText("Name: TODO: verify", { exact: true })).toBeVisible();
  await expect(page.getByText("Email: TODO: verify", { exact: true })).toBeVisible();
  await expect(page.getByText("TODO: verify all contact details")).toBeVisible();
});

test("privacy and terms show the pre-launch placeholder, not made-up legal text", async ({
  page,
}) => {
  for (const path of ["/privacy/", "/terms/"]) {
    await page.goto(path);
    await expect(page.getByText("coming soon — the app is in pre-launch.").first()).toBeVisible();
  }
});
