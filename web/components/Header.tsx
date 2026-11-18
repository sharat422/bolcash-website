import Link from "next/link";
import { sections } from "@/lib/nav";
import { Button } from "./Button";
import { Container } from "./Container";
import { LanguageSwitcher } from "./LanguageSwitcher";

const link =
  "inline-flex min-h-11 items-center rounded-md px-3 text-base text-ink hover:bg-surface-2";

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-canvas">
      <Container className="flex items-center gap-2 py-2">
        <Link
          href="/"
          className="mr-auto inline-flex min-h-11 items-center text-xl font-bold text-ink"
        >
          Bol<span className="text-primary">Cash</span>
        </Link>
        <nav aria-label="Main" className="hidden items-center md:flex">
          {sections.map((s) => (
            <a key={s.href} href={s.href} className={link}>
              {s.label}
            </a>
          ))}
        </nav>
        <LanguageSwitcher className="hidden md:flex" />
        <Button href="#download">Download app</Button>
        {/* Menu uses <details>, so it works without JavaScript. */}
        <details className="relative md:hidden">
          <summary
            aria-label="Menu"
            className="flex min-h-11 min-w-11 cursor-pointer list-none items-center justify-center rounded-md border border-line text-ink"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 5h14M3 10h14M3 15h14" />
            </svg>
          </summary>
          <div className="absolute right-0 mt-2 w-64 rounded-lg border border-line bg-surface p-2 shadow-lg">
            <nav aria-label="Main (menu)" className="flex flex-col">
              {sections.map((s) => (
                <a key={s.href} href={s.href} className={link}>
                  {s.label}
                </a>
              ))}
            </nav>
            <LanguageSwitcher className="mt-1 border-t border-line pt-1" />
          </div>
        </details>
      </Container>
    </header>
  );
}
