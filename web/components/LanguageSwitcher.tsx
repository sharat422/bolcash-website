import { languages } from "@/lib/nav";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  return (
    <ul aria-label="Language" className={`flex items-center ${className}`}>
      {languages.map((l) => (
        <li key={l.code}>
          <a
            href={l.href}
            hrefLang={l.code}
            lang={l.code}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md px-2 text-sm text-ink hover:bg-surface-2"
          >
            {l.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
