import Link from "next/link";
import { languages, legal, sections } from "@/lib/nav";
import { Container } from "./Container";

const link = "inline-flex min-h-11 items-center text-muted underline hover:text-ink";

function Links({
  title,
  items,
}: {
  title: string;
  items: readonly { label: string; href: string }[];
}) {
  return (
    <nav aria-label={title}>
      <h2 className="text-base font-semibold text-ink">{title}</h2>
      <ul className="mt-1">
        {items.map((i) => (
          <li key={i.href}>
            <a href={i.href} className={link}>
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="mt-12 border-t border-line bg-surface-2">
      <Container className="grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
        <Links title="Explore" items={sections} />
        <Links title="About and legal" items={legal} />
        <Links title="Languages" items={languages} />
        <div>
          <h2 className="text-base font-semibold text-ink">Grievance contact</h2>
          <p className="mt-2 text-muted">Grievance Officer name and email: TODO: verify</p>
          <Link
            href="/contact/"
            className="inline-flex min-h-11 items-center text-muted underline hover:text-ink"
          >
            Contact and grievance page
          </Link>
        </div>
      </Container>
      <Container className="pb-8 text-sm text-muted">© BolCash</Container>
    </footer>
  );
}
