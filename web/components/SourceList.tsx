export type Source = { name: string; url: string };

/** Official sources from a guide's frontmatter. A guide with no sources fails the build. */
export function SourceList({ sources }: { sources: Source[] }) {
  if (sources.length === 0) throw new Error("SourceList: every guide needs at least one source");
  return (
    <section>
      <h2 className="text-xl font-bold">Official sources</h2>
      <ul className="mt-1">
        {sources.map((s) => (
          <li key={s.url}>
            <a
              href={s.url}
              rel="noopener"
              className="flex min-h-11 items-center text-primary underline"
            >
              {s.name}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
