import type { Metadata } from "next";
import { StoreGo } from "@/components/StoreGo";
import { PLAY_URL } from "@/lib/stores";

export const metadata: Metadata = {
  title: "Google Play",
  robots: { index: false, follow: false },
};

// Redirects to PLAY_STORE_URL (set at build time). With none, it says the app is not there yet.
export default function GoPlay() {
  return <StoreGo store="Google Play" url={PLAY_URL} />;
}
