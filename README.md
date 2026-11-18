# BolCash.in

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
