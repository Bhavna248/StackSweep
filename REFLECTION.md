# Reflection

## 1. Hardest bug and how I debugged it

The nastiest bug was **inconsistent savings totals** when multiple coding tools were selected. Hypothesis 1: double-counting consolidation savings. Hypothesis 2: downgrade running after consolidate zeroed spend. I logged per-tool `recommendedSpend` in vitest and saw Windsurf go to $0 but Cursor still at Business list price — total savings undercounted. I tried reordering rules (downgrade → consolidate → credits) and added an explicit `keeper` id for Cursor in consolidation. That fixed the aggregate, and I locked it with test `consolidates duplicate coding assistants`. A secondary bug was **disk full on OneDrive** corrupting `package.json`; I verified with empty file reads, deleted bloat, and rewrote minimal `package.json` before restoring full deps.

## 2. Decision reversed mid-week

I initially planned **v0** as the eighth tool. Mid-week I switched to **Windsurf** because interview feedback and overlap logic both pointed at IDE assistants — v0 doesn’t compete for the same “daily driver” budget as Cursor/Copilot, so consolidation recommendations felt dishonest. Reversal was driven by a 12-minute call where the interviewee said, “We don’t pay for v0 seats, we pay for three IDEs.” That pushed the product toward redundant coding subs, which is also more screenshot-friendly for HN.

## 3. Week 2 build

Week 2 I’d ship **invoice-backed benchmark mode** (“$X/dev vs companies your size”) using anonymized Credex data, **PDF export** of the audit, and **Upstash rate limiting** so share links work across serverless instances. I’d add OAuth-free “save stack” returning users to the same tools on reload from DB, and A/B the headline around duplicate assistants vs generic “AI spend.” Sales-side: 48-hour human follow-up on every >$500 audit with a Loom walking through their public share URL.

## 4. How I used AI tools

I used **Cursor** for boilerplate (API route scaffolds, Tailwind layout) and **Claude** for wording in GTM/landing copy — then manually edited for specificity. I did **not** trust AI to generate audit math or pricing numbers; every figure traces to `PRICING_DATA.md`. One failure: Claude suggested “switch everyone to Claude Code” in an early summary prompt, which contradicted rule output — I caught it by diffing summary against `recommendations[]` and tightened the prompt to forbid new dollar amounts and vendor religion. Tests and pricing were human-authored.

## 5. Self-ratings (1–10)

| Dimension | Score | Reason |
|-----------|-------|--------|
| Discipline | 7 | DEVLOG and tests kept pace, but deploy/Lighthouse still pending at handoff. |
| Code quality | 8 | Typed rule engine, Zod APIs, fallback paths; rate limiter is in-memory only. |
| Design sense | 7 | Dark finance aesthetic and savings hero; needs real screenshots and OG image. |
| Problem-solving | 8 | Debugged rule ordering and disk corruption without abandoning scope. |
| Entrepreneurial thinking | 8 | GTM/economics tied to consult funnel, not vanity DAU. |
