import { renderSVG } from "uqr";
import { flags } from "@/lib/flags";
import { pageUrl, SITE_URL } from "@/lib/site";
import { Button } from "./Button";

/**
 * The one download call to action that ends every page.
 * `slug` is the page slug (e.g. "guides/gst-registration"); "" for the home page.
 * The QR code is drawn at build time, so it needs no JavaScript.
 */
export function DownloadCTA({
  slug,
  title,
  showAppStore = flags.appStore,
}: {
  slug: string;
  title: string;
  showAppStore?: boolean;
}) {
  const src = encodeURIComponent(slug || "home");
  const qr = renderSVG(`${SITE_URL}/go/play?src=${src}-qr`, {
    border: 4,
    whiteColor: "#ffffff",
    blackColor: "#000000",
  });
  const share = `https://wa.me/?text=${encodeURIComponent(`${title} ${pageUrl(slug)}`)}`;

  return (
    <section id="download" className="mt-12 rounded-lg bg-surface-2 p-6">
      <h2 className="text-2xl font-bold">Download BolCash</h2>
      <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="flex flex-col gap-3 sm:flex-1">
          <Button href={`/go/play?src=${src}`}>Get it on Google Play</Button>
          {showAppStore && (
            <Button href={`/go/appstore?src=${src}`}>Download on the App Store</Button>
          )}
          <Button href={share} variant="outline" external>
            Share on WhatsApp
          </Button>
        </div>
        <div className="flex items-center gap-3 sm:flex-col sm:text-center">
          <div
            role="img"
            aria-label="QR code to download BolCash on Android"
            className="h-32 w-32 shrink-0 rounded-md bg-white [&>svg]:h-full [&>svg]:w-full"
            dangerouslySetInnerHTML={{ __html: qr }}
          />
          <p className="text-sm text-muted">Scan with your phone camera</p>
        </div>
      </div>
    </section>
  );
}
