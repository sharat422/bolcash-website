import { expect, test } from "@playwright/test";

test("GST calculator works in the browser", async ({ page }) => {
  await page.goto("/tools/gst-calculator/");
  await page.getByLabel("Amount").fill("1000");
  await page.getByRole("button", { name: "18%" }).click();
  await expect(page.getByText("₹1,180")).toBeVisible();
  await page.getByLabel("What do you want to do?").selectOption("remove");
  await expect(page.getByText("₹847.46").first()).toBeVisible();
});

test("reminder message gives a WhatsApp link", async ({ page }) => {
  await page.goto("/tools/udhar-reminder-message/");
  await page.getByLabel("Customer name").fill("Ravi");
  await page.getByLabel("Amount pending").fill("1500");
  const link = page.getByRole("link", { name: "Send on WhatsApp" });
  await expect(link).toHaveAttribute("href", /^https:\/\/wa\.me\/\?text=/);
});

test("MSME page shows the rule from facts.json and the CA note", async ({ page }) => {
  await page.goto("/tools/msme-payment-due-date/");
  await expect(page.getByText("Pay micro and small suppliers within 15 days")).toBeVisible();
  await expect(page.getByText("Confirm with a CA.")).toBeVisible();
});
