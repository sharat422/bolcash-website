import { Button } from "./Button";

/**
 * Body of /go/play and /go/appstore. Static export cannot send a 302, so a configured store gets a
 * meta-refresh page (works without JavaScript). With no URL it says the app is not there yet.
 */
export function StoreGo({ store, url }: { store: string; url?: string }) {
  if (url) {
    return (
      <>
        <meta httpEquiv="refresh" content={`0;url=${url}`} />
        <h1 className="text-3xl font-bold md:text-4xl">Taking you to {store}…</h1>
        <p className="mt-3 text-lg text-muted">If nothing happens, tap the button.</p>
        <div className="mt-6">
          <Button href={url}>Open {store}</Button>
        </div>
      </>
    );
  }
  return (
    <>
      <h1 className="text-3xl font-bold md:text-4xl">BolCash is not on {store} yet</h1>
      <p className="mt-3 text-lg text-muted">
        The app is in pre-launch. Join the waitlist and we will message you.
      </p>
      <div className="mt-6">
        <Button href="/#waitlist">Join the waitlist</Button>
      </div>
    </>
  );
}
