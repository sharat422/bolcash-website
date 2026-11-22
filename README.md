# BolCash.com

Marketing and help website for BolCash (app not launched yet). Rules and commands: see [CLAUDE.md](CLAUDE.md).

- `web/`: Next.js static site (pnpm)
- `api/`: FastAPI (uv)
- `content/`: MDX/JSON content. `facts.json` is the only source of facts.
- `docs/`: project docs. Unverified facts: `docs/todo-facts.md`

## Run locally

```sh
cd web && pnpm install && pnpm dev      # http://localhost:3000
cd api && uv sync && uv run uvicorn app.main:app --reload   # http://localhost:8000/health
docker compose up --build               # api + postgres
```

## Waitlist API

The home page form posts JSON to `POST /waitlist` on the API. Each signup is one row in `waitlist_signup`
(name, business type, city, phone, consent, source page, created_at in IST). A phone number can join once:
a second try returns 409 "This number is already on the waitlist".

| Variable | Where | What |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | web, set **at build time** | Base URL of the API, e.g. `https://api.bolcash.com`. Dev value (`http://localhost:8000`) is in `web/.env.development`. If empty, the form posts to the same origin. |
| `DATABASE_URL` | api | `postgresql://user:pass@host:5432/db` in production. If unset, a SQLite file `api/waitlist.db` is used. `docker compose` sets it. |
| `CORS_ORIGINS` | api | Comma-separated websites allowed to call the API. Default `http://localhost:3000`. Production: `https://bolcash.com`. |

Run both locally: `cd api && uv sync && uv run uvicorn app.main:app --reload`, then `cd web && pnpm dev`.
See the rows: `sqlite3 api/waitlist.db "select * from waitlist_signup"`.

## Store links (download buttons)

No download button is shown until a real store URL is set **when you build the website**.

| Variable | What |
| --- | --- |
| `PLAY_STORE_URL` | `https://play.google.com/store/apps/details?id=<package>`. Turns on the Google Play button, the QR code and the `/go/play` redirect. |
| `APP_STORE_URL` | `https://apps.apple.com/<country>/app/<name>/id<digits>`. Also needs `appStore: true` in `web/lib/flags.ts`, which stays `false` until the app is approved in the App Store (not for TestFlight). |

A placeholder, a search page, a TestFlight link or an `http://` link is ignored. Until then, pages end with a "Join the waitlist" box, and `/go/play` and `/go/appstore` say the app is not there yet.
Example: `PLAY_STORE_URL="https://play.google.com/store/apps/details?id=com.example.app" pnpm build`, then `pnpm check:links`.
