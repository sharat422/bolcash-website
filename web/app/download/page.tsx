import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Callout } from "@/components/Callout";
import { DownloadCTA } from "@/components/DownloadCTA";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  slug: "download",
  title: "Download the app",
  description: "Download BolCash, a digital udhar khata and cash book app, on Google Play.",
});

export default function Download() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Download", href: "/download/" },
        ]}
      />
      <h1 className="mt-2 text-3xl font-bold md:text-4xl">Download BolCash</h1>
      <p className="mt-3 text-lg text-muted">
        Open this page on your phone and tap the Google Play button. Or scan the QR code from
        another phone. You can also share this page on WhatsApp with other shop owners.
      </p>

      <div className="mt-6">
        <Callout tone="warning" title="App not launched yet">
          BolCash is not on Google Play yet. Launch date: TODO: verify
        </Callout>
      </div>

      <DownloadCTA slug="download" title="Download BolCash" />
    </>
  );
}
