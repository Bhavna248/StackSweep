# StackSweep — Unit Economics (Credex deployment)

## Value of a converted lead (estimate)

**Assumption:** Credex earns **12% placement fee** on AI vendor credits/commit deals, on **$50k–$200k** annual credit purchases for mid-market eng teams.

| Scenario | Annual credit purchase | Credex fee (12%) | **Lead value** |
|----------|------------------------|------------------|----------------|
| Low | $50,000 | $6,000 | **$6,000** |
| Base | $120,000 | $14,400 | **$14,400** |
| High | $200,000 | $24,000 | **$24,000** |

**Base case lead value (L):** **$14,400** one-year gross revenue per closed credit customer (not LTV multi-year, to stay conservative).

Consult-only leads (no credit purchase) are worth less — model **$500** as meeting cost recovery if 20% of consults close within 90 days at base L.

## CAC by channel (from GTM, $0 paid)

| Channel | CAC formula | Est. CAC |
|---------|-------------|----------|
| HN / organic viral | 10 hrs founder time / 150 emails | **$0** marginal |
| X cold DM | 3 hrs / 15 audits | **$0** |
| Newsletter guest | 2 hrs / 40 audits | **$0** |
| Credex email to customers | 0.5 hrs / 25 audits | **~$0** |

**Blended CAC (audit → email):** ~**$0–$2** (hosting + Resend only).  
**Blended CAC (email → consult):** founder time ≈ **$40/consult** if 10 consults take 8 hrs.

## Conversion funnel (profitability)

```
Audits completed          1,000 / mo
→ Email captured (30%)      300
→ High-savings (20% audits) 200
→ Consult booked (15% of high) 30
→ Credit purchase (40% of consults) 12
```

**Monthly gross from tool (base L):**  
12 × $14,400 / 12 = **$14,400/mo** gross placement revenue  
(at steady-state after funnel matures — not month 1)

**Costs:** hosting ~$50, Resend ~$20, Supabase ~$25, founder time excluded → **~$95/mo**

**Break-even consult→credit rate:**  
Need **1 credit close / month** at $14.4k fee to cover trivial infra.  
At **$500/consult** opportunity cost, need **≥2%** of audits → credit close:  
1,000 audits × 0.2% high-savings consult × 40% close = **0.8 closes** — thin.  
At **30% email capture × 15% consult × 40% close** on high-savings cohort:  
200 high × 15% × 40% = **12 closes/mo** → **highly profitable**.

| Stage | Rate needed for profit |
|-------|------------------------|
| Audit → email | **≥ 15%** (we model 30%) |
| High-savings → consult | **≥ 8%** (we model 15%) |
| Consult → credit | **≥ 25%** (we model 40%) |

## Path to **$1M ARR in 18 months**

**Target ARR:** $1,000,000 → **$83,333/mo** gross placement revenue  
**At base L = $14,400/customer/mo equivalent:** need **~5.8 credit closes / month** sustained.

**What must be true:**

1. **Audits:** ~**4,800/month** by month 18 (if 0.12% audit→credit close) OR **~1,200/month** (if 0.5% close rate with better sales assist).
2. **Organic + Credex distribution** drives **60%+** of audits without paid ads.
3. **High-savings detection** (`>$500/mo`) hits **≥18%** of audits to feed consults.
4. **Sales cycle** consult → credit **≤90 days** for 40% of consults.
5. **Benchmark moat** live by month 6 (invoice data) to lift consult booking 15% → 22%.

**Month 18 snapshot (illustrative):**

| Input | Value |
|-------|-------|
| Audits/mo | 2,000 |
| Credit closes/mo | 6 |
| Gross/mo | 6 × $14,400 = **$86,400** |
| ARR run-rate | **~$1.04M** |

## Sensitivity

- If **L = $6k** (smaller commits), need **~14 closes/mo** → harder; requires **~5k audits/mo** or higher close rates.
- If **email capture = 15%** not 30%, double traffic or improve post-audit CTA.

**Bottom line:** Tool is profitable if Credex actually closes credits from high-savings consults; the funnel fails if it becomes “free calculator” with &lt;10% email capture and no consult follow-up within 48 hours.
