import { describe, expect, it } from "vitest";
import { APP_STORE_URL, PLAY_URL, storeUrl } from "./stores";

describe("storeUrl", () => {
  it("accepts real store pages", () => {
    const play = "https://play.google.com/store/apps/details?id=com.bolcash.app";
    const apple = "https://apps.apple.com/in/app/bolcash/id1234567890";
    expect(storeUrl(play, "play")).toBe(play);
    expect(storeUrl(apple, "apple")).toBe(apple);
    expect(storeUrl("https://apps.apple.com/app/id1234567890", "apple")).toBeDefined();
  });

  it("rejects placeholders, search pages, other sites, TestFlight and http", () => {
    for (const bad of [
      undefined,
      "",
      "TODO",
      "https://",
      "http://play.google.com/store/apps/details?id=com.x",
      "https://play.google.com/store/search?q=bolcash",
      "https://play.google.com/store/apps/details",
      "https://example.com/store/apps/details?id=com.x",
    ]) {
      expect(storeUrl(bad, "play"), String(bad)).toBeUndefined();
    }
    for (const bad of [
      "https://testflight.apple.com/join/AbCdEf",
      "https://apps.apple.com/search?term=bolcash",
      "https://apps.apple.com/in/app/bolcash",
      "https://itunes.apple.com/in/app/bolcash/id123",
    ]) {
      expect(storeUrl(bad, "apple"), bad).toBeUndefined();
    }
  });

  it("nothing is configured by default, and the App Store stays off", () => {
    expect(PLAY_URL).toBeUndefined();
    expect(APP_STORE_URL).toBeUndefined();
  });
});
