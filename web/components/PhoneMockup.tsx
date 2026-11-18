import Image from "next/image";

/**
 * App screenshot in a phone frame. Files live in /public/screens.
 * Placeholders stay labelled "Preview" until real screens exist: then pass preview={false}.
 */
export function PhoneMockup({
  src = "/screens/placeholder-ledger.svg",
  alt,
  preview = true,
}: {
  src?: string;
  alt: string;
  preview?: boolean;
}) {
  return (
    <figure className="relative mx-auto w-48 rounded-lg border-4 border-ink bg-surface p-1">
      <Image src={src} alt={alt} width={360} height={720} className="h-auto w-full rounded-md" />
      {preview && (
        <figcaption className="absolute right-2 top-2 rounded-full bg-accent px-2 py-0.5 text-sm font-semibold text-on-accent">
          Preview
        </figcaption>
      )}
    </figure>
  );
}
