import { expect, test, type Page, type Route } from "@playwright/test";

const cors = {
  "access-control-allow-origin": "*",
  "access-control-allow-headers": "content-type",
  "access-control-allow-methods": "POST, OPTIONS",
};

/** Fakes POST /waitlist (the API is built separately). Returns the requests it saw. */
async function mockApi(page: Page, status: number, body: object) {
  const seen: unknown[] = [];
  await page.route("**/waitlist", async (route: Route) => {
    const req = route.request();
    if (req.method() === "OPTIONS") return route.fulfill({ status: 204, headers: cors });
    seen.push(req.postDataJSON());
    return route.fulfill({
      status,
      contentType: "application/json",
      headers: cors,
      body: JSON.stringify(body),
    });
  });
  return seen;
}

async function fillForm(page: Page, phone = "98765 43210") {
  await page.getByLabel("Name").fill("Ravi Kumar");
  await page.getByLabel("Business type").selectOption("Distributor");
  await page.getByLabel("City").fill("Pune");
  await page.getByLabel("Phone number").fill(phone);
  await page.getByLabel("I agree to be contacted about the Bolcash launch.").check();
}

test("home page has the launch content and no download CTA, ratings or placeholder", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Bolcash — the khata that closes the day.",
  );
  await expect(page.getByText("Launching December 2026").first()).toBeVisible();
  for (const t of ["Beat/route ledger", "Beat collections", "Daily close"]) {
    await expect(page.getByRole("heading", { name: t })).toBeVisible();
  }
  await expect(
    page.getByText("No bank login. No money movement. Your data and export are always free."),
  ).toBeVisible();
  const text = (await page.locator("main").innerText()).toLowerCase();
  for (const banned of ["coming soon", "testimonial", "rating", "₹"])
    expect(text, banned).not.toContain(banned);
  await expect(page.getByRole("link", { name: "Get it on Google Play" })).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Join the waitlist" })).toHaveAttribute(
    "href",
    "#waitlist",
  );
});

test("waitlist: success shows the message and sends the right JSON", async ({ page }) => {
  const seen = await mockApi(page, 201, { ok: true });
  await page.goto("/");
  await fillForm(page);
  await page.getByRole("button", { name: "Join the waitlist" }).click();
  await expect(
    page.getByText(
      "You are on the waitlist. We will message you when Bolcash launches in December 2026.",
    ),
  ).toBeVisible();
  expect(seen).toEqual([
    {
      name: "Ravi Kumar",
      business_type: "distributor",
      city: "Pune",
      phone: "9876543210",
      consent: true,
      source: "home",
    },
  ]);
});

test("waitlist: a server error is shown and the entered data is kept", async ({ page }) => {
  await mockApi(page, 500, { detail: "Server is busy. Please try again." });
  await page.goto("/");
  await fillForm(page);
  await page.getByRole("button", { name: "Join the waitlist" }).click();
  await expect(page.locator("form").getByRole("alert")).toHaveText(
    "Server is busy. Please try again.",
  );
  await expect(page.getByLabel("Name")).toHaveValue("Ravi Kumar");
  await expect(page.getByLabel("Phone number")).toHaveValue("98765 43210");
  await expect(page.getByLabel("I agree to be contacted about the Bolcash launch.")).toBeChecked();
});

test("waitlist: an unreachable server shows an error and keeps the data", async ({ page }) => {
  await page.route("**/waitlist", (route) => route.abort());
  await page.goto("/");
  await fillForm(page);
  await page.getByRole("button", { name: "Join the waitlist" }).click();
  await expect(page.locator("form").getByRole("alert")).toContainText("Could not reach the server");
  await expect(page.getByLabel("City")).toHaveValue("Pune");
});

test("waitlist: bad input is caught before anything is sent", async ({ page }) => {
  const seen = await mockApi(page, 201, {});
  await page.goto("/");
  await fillForm(page, "12345");
  await page.getByRole("button", { name: "Join the waitlist" }).click();
  await expect(page.locator("form").getByRole("alert")).toHaveText(
    "Enter a 10-digit Indian mobile number.",
  );
  await page.getByLabel("Phone number").fill("9876543210");
  await page.getByLabel("I agree to be contacted about the Bolcash launch.").uncheck();
  await page.getByRole("button", { name: "Join the waitlist" }).click();
  await expect(page.locator("form").getByRole("alert")).toContainText("tick the box");
  expect(seen).toHaveLength(0);
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("the page text renders and the form cannot send anything", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Daily close" })).toBeVisible();
    await expect(page.getByText("Launching December 2026").first()).toBeVisible();
    // Playwright's text search skips <noscript>, so check the HTML and that it is displayed.
    expect(await page.content()).toContain("Please turn on JavaScript to join the waitlist.");
    expect(
      await page
        .locator("noscript")
        .first()
        .evaluate((el) => getComputedStyle(el).display),
    ).not.toBe("none");
    await expect(page.getByLabel("Name")).toBeDisabled();
  });
});
