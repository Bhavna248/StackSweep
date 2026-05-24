# StackSweep — Metrics

## North Star metric

**Qualified audits completed per week** — an audit where the user selected ≥1 paid tool and viewed the full results screen.

**Why:** This tool is episodic B2B lead gen, not daily engagement. A completed audit means the value hypothesis fired; everything downstream (email, consult, credit) is a conversion layer on that moment of clarity.

## Three input metrics

1. **Landing → audit start rate** (% who click “Run free audit” and submit the form)  
   - Diagnoses positioning and form friction.

2. **Post-audit email capture rate** (% of completed audits that submit email *after* results)  
   - Validates “value before gate”; primary leading indicator for pipeline.

3. **High-savings consult booking rate** (% of audits with `>$500/mo` savings that book or accept Credex outreach)  
   - Ties product to revenue; proves the wedge isn’t a toy calculator.

## Instrument first (week 1)

| Event | Properties |
|-------|------------|
| `audit_started` | `tool_count`, `use_case` |
| `audit_completed` | `monthly_spend`, `monthly_savings`, `high_savings` |
| `email_captured` | `high_savings`, `optional_fields_filled` |
| `share_link_copied` | `audit_id` |
| `consult_cta_clicked` | `savings_band` |

Use **Plausible or PostHog** (lightweight, no cookie banner on MVP). Server-side log audit IDs for funnel integrity.

## Pivot trigger

**Pivot if after 14 days and ≥1,000 landing UVs:**

- **Audit completion rate &lt; 12%** → wedge too broad; narrow landing to “duplicate coding assistant” only.  
- **Email capture &lt; 15%** of completions → gate timing or trust issue; A/B email copy and Credex mention.  
- **High-savings consult rate &lt; 5%** with ≥50 high-savings audits → sales motion broken, not product.

**Do not pivot on DAU.** Expect repeat audits quarterly at renewals — track **return audits within 90 days** instead.
