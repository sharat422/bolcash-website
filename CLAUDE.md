# CLAUDE.md

## Project

BolCash.in is the marketing and help website for BolCash, an Indian digital udhar khata / cash book mobile app (like Khatabook, OkCredit, CashBook). **The app is not launched yet.** Do not claim it is live, rated or used by anyone.

Audience: kirana, medical, dairy, hardware and wholesale shop owners and street vendors in India, mostly on low-cost Android phones and 4G.

50 pages: 10 core, 10 business-type, 8 free tools, 16 guides, 4 trust pages, 2 language hubs. Every page ends with one download CTA (Play Store button + QR code + WhatsApp share).

## Stack and layout

- `/web`: Next.js 15 (App Router), React, TypeScript strict, Tailwind CSS. pnpm.
- `/api`: Python 3.12, FastAPI, SQLModel, Alembic, Pydantic v2. uv.
- `/content`: MDX and JSON content. `/content/facts.json` is the only source of facts.
- `/docs`: project docs, including `/docs/todo-facts.md`.
- Pages are statically generated (SSG). Tools run fully in the browser.
- The API handles only forms, waitlist, download-link tracking and the data hub.
- Database: SQLite in dev, Postgres in production.

## Rules

1. **Mobile first.** Design at 360px width first. Target Lighthouse mobile 90+ and LCP under 2.5s on 4G.
2. **Never invent facts**, statistics, reviews, testimonials, user counts, ratings, partner logos or certifications. If content needs a fact not in `/content/facts.json`, write "TODO: verify" visibly in the page and add it to `/docs/todo-facts.md`.
3. **Every guide** shows a "Last updated" date and links to official sources (gst.gov.in, udyamregistration.gov.in, msme.gov.in, pib.gov.in, npci.org.in, mudra.org.in, pmsvanidhi.mohua.gov.in).
4. **Tax/legal guides** end with: "This is general information, not tax or legal advice. Confirm with a CA."
5. **No ad-tech or tracking without consent.** Store only the personal data a feature needs.
6. **Language:** plain, short sentences, Indian English. Write rupees as ₹1,50,000 (Indian digit grouping). Use "lakh" and "crore".
7. **Accessibility:** semantic HTML, alt text, 4.5:1 contrast, 44px tap targets. Content pages must work without JavaScript.
8. **Done means verified.** Before saying a task is done, run lint, type-check, tests and a production build, and fix all errors.
9. **Small, reusable components.** No new dependency without saying why.

## Commands

Add each command here as it is created. Do not list commands that do not exist yet.

### /web (pnpm, run in `web/`)

- Install: `pnpm install`
- Dev: `pnpm dev`
- Build (static export to `out/`): `pnpm build`
- Lint: `pnpm lint`
- Format check / fix: `pnpm format:check` / `pnpm format`
- Type-check: `pnpm typecheck`
- Unit tests (Vitest): `pnpm test`
- E2E (Playwright, builds and serves `out/`): `pnpm e2e` (first time: `pnpm exec playwright install chromium`)

### /api (uv, run in `api/`)

- Install: `uv sync`
- Dev: `uv run uvicorn app.main:app --reload`
- Lint / format check: `uv run ruff check .` / `uv run ruff format --check .`
- Type-check: `uv run mypy`
- Test: `uv run pytest`
- Migrations (Alembic): not set up yet (no database code so far)

### Both

- `docker compose up --build`: api + postgres (not tested locally, Docker not installed on dev machine)
- CI: `.github/workflows/ci.yml` runs all of the above for both apps.

## Design system

- Tokens live in `web/app/globals.css` (colours, type, spacing, radius). Use token utilities (`bg-primary`, `text-muted`, `rounded-md`), never raw hex or Tailwind palette colours. Dark mode follows the system setting.
- Font: Noto Sans + Noto Sans Devanagari via `next/font` (`web/app/layout.tsx`).
- Components in `web/components/`: Button, Card, Badge, Container, Header, Footer, LanguageSwitcher, Fact, DownloadCTA, PhoneMockup, FAQ, LastUpdated, SourceList, Breadcrumbs, Disclaimer, StepList, FeatureCard, BusinessTile, Callout, ComparisonTable (JsonLd is internal). Each has a `*.test.tsx` using `react-dom/server`. Nav links are in `web/lib/nav.ts`; site URL in `web/lib/site.ts`; feature flags (App Store button) in `web/lib/flags.ts`.
- Every page ends with one `<DownloadCTA slug title />`. It has `id="download"`, which the header button links to. Download links go to `/go/play?src=<slug>` (route not built yet).
- Every guide uses `LastUpdated` + `SourceList`; tax/legal guides end with `Disclaimer`.
- No Testimonials component on purpose: no invented reviews.
- Placeholder app screens (`web/public/screens/`) stay labelled "Preview" until real screens exist.
- Header menu uses `<details>` (no JS). Prefer plain `<a>` for links.
- `/styleguide/` (noindex) shows everything. Update it when you add a token or component.

## Content pages

- Business pages (`content/business/*.json`) and tool pages (`content/tools/*.json`) are one JSON file each, rendered by a static `[slug]` route. Loader: `web/lib/content.ts`. File name must equal `slug`.
- Trust pages (`content/pages/*.json`: about, privacy, terms, contact) are served at `/<slug>/` by `web/app/[slug]/page.tsx`. They show their `draftNote` until `reviewed: true`. Never invent company, contact or data-handling details: write "TODO: verify". The privacy page says the site has no analytics or ads: if that stops being true, change the page first.
- Guides (`content/guides/*.json`): fields `updated`, `sources` (official domains only, a test enforces this), `taxLegal` (adds the CA note; required if the guide uses a `gst_`, `msme_` or `dpdp_` fact), `facts` (shown with `<Fact>`), `reviewed` (until `true`, the page shows a visible "Draft: TODO: verify" note). Bump `updated` whenever you change a guide.
- Tool maths is in `web/lib/tools/calculators.ts` (pure functions, tested). The UI is `web/components/ToolForm.tsx`. Tools run in the browser only: nothing typed is sent anywhere.
- Numbers a tool needs (GST rates, MSME days) live in `facts.json` under `data`, next to the fact they come from. A test checks they match `value`. Do not hard-code them.
- Page copy (intro, steps) must not contain numbers, prices or percentages: a test enforces this. Put them in `facts.json` and show with `<Fact>`.
- Rupee amounts: always use `inr()` from `web/lib/format.ts`.

## Facts

Use `<Fact id="..." />` (`web/components/Fact.tsx`) to print a fact from `content/facts.json` with its source link. Never type a fact into a page by hand.
