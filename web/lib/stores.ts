import { flags } from "./flags";

/**
 * Accepts only a real store page, so a placeholder, a search page or a TestFlight link can never go live.
 * Play: https://play.google.com/store/apps/details?id=<package>
 * App Store: https://apps.apple.com/<country>/app/<name>/id<digits>
 */
export function storeUrl(raw: string | undefined, store: "play" | "apple"): string | undefined {
  if (!raw) return undefined;
  let u: URL;
  try {
    u = new URL(raw);
  } catch {
    return undefined;
  }
  if (u.protocol !== "https:") return undefined;
  if (store === "play") {
    const ok =
      u.hostname === "play.google.com" &&
      u.pathname === "/store/apps/details" &&
      Boolean(u.searchParams.get("id"));
    return ok ? u.toString() : undefined;
  }
  const ok = u.hostname === "apps.apple.com" && /\/app\/(.+\/)?id\d+/.test(u.pathname);
  return ok ? u.toString() : undefined;
}

// Set at build time (environment variables). Not set = that store's button is not shown.
export const PLAY_URL = storeUrl(process.env.PLAY_STORE_URL, "play");
// Also needs flags.appStore, which stays false until the app is approved in the App Store.
export const APP_STORE_URL = flags.appStore
  ? storeUrl(process.env.APP_STORE_URL, "apple")
  : undefined;
