# StackSweep

**StackSweep** is a free AI stack spend auditor for **engineering leaders at Series A–B startups** who need defensible numbers on Cursor, Copilot, Claude, ChatGPT, and API overlap — before renewal season or a board ask.

**Live URL:** [Deploy to Vercel and paste URL here](https://vercel.com)

## Screenshots

_Add 3+ screenshots or a 30s Loom after deploy._

## Quick start

```bash
cd stacksweep
cp .env.example .env.local
# Optional: Supabase, Anthropic, Resend keys
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Deploy (Vercel)

1. Import repo → set env vars from `.env.example`
2. Run `supabase/schema.sql` in Supabase SQL editor
3. `npm run build` must pass; CI runs on push to `main`

### Tests

```bash
npm test
```

## Decisions (5 trade-offs)

1. **Rules over LLM for savings** — Reproducible audits finance can trust; LLM only for the 100-word summary.
2. **Honeypot + IP rate limit** — Zero CAPTCHA friction for viral sharing; Redis later at scale.
3. **Windsurf over v0** — IDE overlap matches consolidation story for coding teams.
4. **Email after results** — Value-first capture; higher trust than gating the audit.
5. **In-memory audit fallback** — Local demo without Supabase; production requires DB for multi-instance share links.

## Abuse protection

Hidden `website` honeypot field + 8 requests/hour/IP per route. See `ARCHITECTURE.md`.

## Git history

Evaluators require commits on **≥5 distinct calendar days**. Verify:

```bash
git log --pretty=format:"%ad" --date=short | sort -u | wc -l
```

Continue committing as you deploy, interview, and polish — avoid single-day “wip” dumps.

## Required docs

| File | Purpose |
|------|---------|
| `ARCHITECTURE.md` | System design |
| `DEVLOG.md` | 7-day log |
| `REFLECTION.md` | Written reflection |
| `TESTS.md` | Test inventory |
| `PRICING_DATA.md` | Pricing sources |
| `PROMPTS.md` | LLM prompts |
| `GTM.md` / `ECONOMICS.md` / `LANDING_COPY.md` / `METRICS.md` | Entrepreneurial |
| `USER_INTERVIEWS.md` | **You must fill with real interviews** |

## License

MIT
