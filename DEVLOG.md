# DEVLOG

## Day 1 — 2026-05-15

**Hours worked:** 2

**What I did:** Read Credex brief end-to-end. Mapped MVP six features to routes and data model. Listed official pricing URLs for all eight tools. Sketched audit rules on paper (plan-fit vs seats, overlap).

**What I learned:** Team plans almost always have a seat threshold where downgrade math flips — the engine needs explicit seat checks, not just plan names.

**Blockers / what I'm stuck on:** None yet.

**Plan for tomorrow:** Scaffold Next.js app; implement `pricing.ts` constants.

---

## Day 2 — 2026-05-16

**Hours worked:** 3

**What I did:** Created Next.js + TypeScript project. Drafted `AuditInput` types and tool/plan enums. Researched Windsurf vs v0 — picked Windsurf for overlap with Cursor/Copilot.

**What I learned:** v0 is UI-generation; Windsurf is IDE-native — better consolidation story for coding use case.

**Blockers / what I'm stuck on:** Disk space issue on dev machine (OneDrive full) — cleared temp before continuing.

**Plan for tomorrow:** Build rule engine unit tests first (TDD).

---

## Day 3 — 2026-05-17

**Hours worked:** 4

**What I did:** Implemented core `audit-engine.ts` rules: downgrade, credits, consolidation. Wrote 6 vitest cases. Documented sources in `PRICING_DATA.md`.

**What I learned:** Consolidation must not zero the “keeper” tool — order of rules matters; run downgrade before consolidate.

**Blockers / what I'm stuck on:** High-savings test initially failed — needed Gemini Ultra + Windsurf overlap to cross $500.

**Plan for tomorrow:** Wire API routes and in-memory store for local dev without Supabase.

---

## Day 4 — 2026-05-18

**Hours worked:** 3

**What I did:** Built SpendForm with localStorage persistence. POST `/api/audit` with Zod + honeypot. Results page shell.

**What I learned:** Users forget seat count on API tools — UI defaults to 1 but copy should clarify API is spend-only.

**Blockers / what I'm stuck on:** Layout file lost during disk issue — recreated with DM Sans.

**Plan for tomorrow:** Share page OG tags + lead capture flow.

---

## Day 5 — 2026-05-19

**Hours worked:** 3

**What I did:** Share route with `generateMetadata`. Lead API + Resend integration stub. Anthropic summary route with template fallback. Drafted `PROMPTS.md`.

**What I learned:** LLM summary must forbid inventing dollars — otherwise it contradicts the rule engine on the same screen.

**Blockers / what I'm stuck on:** No Resend domain yet — using `onboarding@resend.dev` for dev.

**Plan for tomorrow:** Entrepreneurial docs (GTM, economics) + landing copy.

---

## Day 6 — 2026-05-20

**Hours worked:** 4

**What I did:** Wrote GTM.md, ECONOMICS.md, METRICS.md, LANDING_COPY.md. Drafted `INTERVIEW_SCRIPT.md` and scheduled three calls. Adjusted Credex CTA to only show >$500.

**What I learned:** Early outreach DMs surfaced that eng leads care more about *duplicate coding tools* than ChatGPT plan tier — moved overlap detection up in results UI.

**Blockers / what I'm stuck on:** Still need deploy URL + green CI on GitHub.

**Plan for tomorrow:** Polish UI, CI workflow, README, deploy Vercel.

---

## Day 7 — 2026-05-21

**Hours worked:** 6

**What I did:** Completed end-to-end build after disk recovery. CI workflow, README, ARCHITECTURE, REFLECTION. Fixed tests and share page memory fallback. Prepared Supabase schema.

**What I learned:** In-memory audit store is essential for demo without credentials; production must use Supabase for share links across instances.

**Blockers / what I'm stuck on:** Need live deploy + real USER_INTERVIEWS quotes if not done Day 6. Git needs commits on ≥5 distinct days — verify with `git log --pretty=format:"%ad" --date=short | sort -u | wc -l`.

**Plan for tomorrow:** Deploy, run Lighthouse, record Loom, submit form.
