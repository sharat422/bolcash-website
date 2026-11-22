import type { Metadata } from "next";
import { StoreGo } from "@/components/StoreGo";
import { APP_STORE_URL } from "@/lib/stores";

export const metadata: Metadata = {
  title: "App Store",
  robots: { index: false, follow: false },
};

// Redirects to APP_STORE_URL only when flags.appStore is on and the URL is a real App Store page.
export default function GoAppStore() {
  return <StoreGo store="the App Store" url={APP_STORE_URL} />;
}
