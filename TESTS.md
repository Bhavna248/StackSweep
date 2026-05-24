# Tests

## Automated tests

| File | Covers | Run |
|------|--------|-----|
| `tests/audit-engine.test.ts` | Cursor Business downgrade; Copilot Individual; retail credits; coding consolidation; low-savings band; $500+ high-savings | `npm test` |

### Cases (6)

1. **Cursor Business → Pro** for 3-seat coding team — $60/mo savings  
2. **Copilot Business → Individual** for 1 seat — $9/mo  
3. **Claude Pro retail overspend** — credits action  
4. **Cursor + Windsurf consolidation** — windsurf zeroed  
5. **Lean ChatGPT Plus writing stack** — low savings flag  
6. **Large stack** — `highSavings` true at ≥$500/mo  

## Commands

```bash
npm install
npm test
npm run lint
```

## CI

`.github/workflows/ci.yml` runs lint + test on push to `main`.
