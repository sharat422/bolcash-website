/** Link tile to a business-type page, e.g. "Kirana store". */
export function BusinessTile({
  name,
  href,
  blurb,
}: {
  name: string;
  href: string;
  blurb?: string;
}) {
  return (
    <a
      href={href}
      className="block min-h-11 rounded-lg border border-line bg-surface p-4 hover:border-primary"
    >
      <span className="font-semibold text-primary">{name}</span>
      {blurb && <span className="mt-1 block text-sm text-muted">{blurb}</span>}
    </a>
  );
}
