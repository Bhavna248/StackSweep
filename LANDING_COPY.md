# StackSweep — Landing Page Copy

## Hero headline (≤10 words)

**Find waste in your AI stack.**

## Subheadline (≤25 words)

Free 60-second audit of Cursor, Copilot, Claude, and API spend—with shareable savings your CFO will understand.

## Primary CTA

**Run free audit**

## Secondary CTA (results page)

**Save report** / **Book Credex consultation** (high-savings only)

## Social proof block (mocked)

> **Mocked for MVP** — replace with real logos/quotes after beta.

- “We killed two redundant coding subs in one afternoon.” — **J.K., VP Eng, 85-person fintech** *(mock)*
- “Finally a savings number I can paste into our board deck.” — **M.R., Head of Platform, Series B** *(mock)*
- **2,400+** audits run *(counter — wire to analytics when live)*

## FAQ (5)

**Q: Is this really free?**  
A: Yes. No login to run the audit. We ask for email *after* you see your savings so we can send the report link.

**Q: How do you calculate savings?**  
A: Rule-based engine using **official list prices** (see `PRICING_DATA.md`). We model plan fit, seat count, tool overlap, and retail-vs-credits—not LLM guesses.

**Q: Will you try to sell me tools I don’t need?**  
A: No. We recommend downgrades and consolidation first. Credex only appears when modeled savings exceed **$500/month**—where credits and contracts matter.

**Q: What’s shared on the public link?**  
A: Tools, plans, spend totals, and savings. **No email, company name, or role** on `/share/[id]`.

**Q: Is my data stored?**  
A: Audit payloads are stored to power share links and optional email delivery. See README for Supabase retention. Honeypot + rate limits reduce abuse.

## Above-the-fold supporting bullets

- List-price math with cited sources  
- Duplicate coding-assistant detection  
- Shareable report for HN / X / Slack
