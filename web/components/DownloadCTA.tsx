import { renderSVG } from "uqr";
import { pageUrl, LAUNCH, SITE_URL } from "@/lib/site";
import { APP_STORE_URL, PLAY_URL } from "@/lib/stores";
import { Button } from "./Button";

/**
 * The call to action that ends every page except the home pages (they end with the waitlist).
 * `slug` is the page slug (e.g. "guides/gst-registration").
 * A store button shows only when that store has a real, configured URL (see lib/stores.ts).
 * Until then the box points to the waitlist, and there is no QR code.
 * The QR code is drawn at build time and encodes the same /go/play link as the button.
 */
export function DownloadCTA({
  slug,
  title,
  playStore = Boolean(PLAY_URL),
  appStore = Boolean(APP_STORE_URL),
}: {
  slug: string;
  title: string;
  playStore?: boolean;
  appStore?: boolean;
}) {
  const src = encodeURIComponent(slug || "home");
  const live = playStore || appStore;
  const qr = playStore
    ? renderSVG(`${SITE_URL}/go/play?src=${src}-qr`, {
        border: 4,
        whiteColor: "#ffffff",
        blackColor: "#000000",
      })
    : "";
  const share = `https://wa.me/?text=${encodeURIComponent(`${title} ${pageUrl(slug)}`)}`;

  return (
    <section id="download" className="mt-12 rounded-lg bg-surface-2 p-6">
      <h2 className="text-2xl font-bold">
        {live ? "Download BolCash" : `BolCash launches in ${LAUNCH}`}
      </h2>
      {!live && (
        <p className="mt-2 text-muted">
          The app is not available to download yet. Join the waitlist and we will message you.
        </p>
      )}
      <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="flex flex-col gap-3 sm:flex-1">
          {playStore && <Button href={`/go/play?src=${src}`}>Get it on Google Play</Button>}
          {appStore && <Button href={`/go/appstore?src=${src}`}>Download on the App Store</Button>}
          {!live && <Button href="/#waitlist">Join the waitlist</Button>}
          <Button href={share} variant="outline" external>
            Share on WhatsApp
          </Button>
        </div>
        {playStore && (
          <div className="flex items-center gap-3 sm:flex-col sm:text-center">
            <div
              role="img"
              aria-label="QR code to download BolCash on Android"
              className="h-32 w-32 shrink-0 rounded-md bg-white [&>svg]:h-full [&>svg]:w-full"
              dangerouslySetInnerHTML={{ __html: qr }}
            />
            <p className="text-sm text-muted">Scan with your phone camera</p>
          </div>
        )}
      </div>
    </section>
  );
}
