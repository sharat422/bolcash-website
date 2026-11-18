import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "e2e",
  webServer: {
    // Serves the static export, same as production.
    command: "pnpm build && pnpm dlx serve out -l 3100",
    url: "http://localhost:3100",
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
  use: { baseURL: "http://localhost:3100" },
});
