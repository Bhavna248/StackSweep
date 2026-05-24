# LLM Prompts — StackSweep

## Production prompt (`/api/summary`)

```
Write ~100 words for a finance-minded engineering lead. Tone: direct, no hype.
Stack: {toolCount} tools, team {teamSize}, use case {useCase}.
Monthly spend ${totalCurrentSpend}, modeled savings ${totalMonthlySavings}/mo.
Top moves: {toolName} {action} ${savings}; ...
Do not invent dollar amounts not listed.
```

**Model:** `claude-3-5-haiku-20241022`  
**Max tokens:** 200

### Why written this way

- **Grounded numbers only** — prevents hallucinated savings that would embarrass a finance reviewer.
- **Audience = eng lead + CFO** — avoids “revolutionary AI” marketing tone.
- **Haiku** — fast, cheap, sufficient for 100 words; Sonnet unnecessary for summarization.

### What didn’t work

- **Asking the model to recommend tools** — duplicated rule engine and contradicted downgrade logic.
- **Long chain-of-thought prompt** — slower, no quality gain for a blurb.
- **No fallback** — API 429s during testing; added `templatedSummary()` in `summary-fallback.ts`.

## Fallback template

See `src/lib/summary-fallback.ts` — deterministic copy when `ANTHROPIC_API_KEY` is missing or API errors.
