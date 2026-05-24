import Image from "next/image";
import { SpendChart } from "@/components/SpendChart";
import type { AuditResult } from "@/lib/types";

const actionLabel: Record<string, string> = {
  keep: "Keep",
  downgrade: "Downgrade",
  switch: "Switch",
  consolidate: "Consolidate",
  credits: "Use credits",
};

type Props = { audit: AuditResult; summary?: string };

export function AuditResults({ audit, summary }: Props) {
  const optimal = audit.isOptimal || audit.totalMonthlySavings < 100;

  return (
    <div className="space-y-10">
      <section
        className="glass-panel-strong overflow-hidden rounded-2xl"
        style={{ background: "linear-gradient(135deg, var(--accent-soft) 0%, var(--card) 50%, var(--background) 100%)" }}
      >
        <div className="grid items-center gap-6 p-8 lg:grid-cols-[1fr_auto] lg:text-left">
          <div className="text-center lg:text-left">
            <p className="section-eyebrow">Potential savings</p>
            <p className="font-display mt-2 text-5xl font-bold text-foreground sm:text-6xl">
              ${audit.totalMonthlySavings.toLocaleString()}
              <span className="text-2xl font-normal text-muted">/mo</span>
            </p>
            <p className="mt-2 text-xl font-medium text-accent">
              ${audit.totalAnnualSavings.toLocaleString()} / year
            </p>
            <p className="mt-4 text-muted">
              Current stack: ${audit.totalCurrentSpend.toLocaleString()}/mo → modeled{" "}
              ${audit.totalRecommendedSpend.toLocaleString()}/mo
            </p>
          </div>
          <div className="mx-auto hidden w-44 shrink-0 overflow-hidden rounded-xl border border-border sm:block lg:w-52">
            <Image
              src="/images/hero-dashboard.png"
              alt=""
              width={208}
              height={117}
              className="h-auto w-full object-cover opacity-90"
            />
          </div>
        </div>
      </section>

      <SpendChart audit={audit} />

      {summary && (
        <section className="glass-panel rounded-2xl p-6">
          <h2 className="section-eyebrow">Personalized summary</h2>
          <p className="mt-3 leading-relaxed text-foreground/90">{summary}</p>
        </section>
      )}

      {optimal && (
        <div className="glass-panel rounded-2xl p-6 text-center">
          <p className="text-lg font-medium text-foreground">You&apos;re spending well.</p>
          <p className="mt-2 text-muted">
            We don&apos;t manufacture savings. Save your report and we&apos;ll notify you
            when new optimizations apply to your stack.
          </p>
        </div>
      )}

      {audit.highSavings && (
        <div className="rounded-2xl border-2 border-border-strong p-6" style={{ background: "var(--accent-soft)" }}>
          <h2 className="text-xl font-bold text-foreground">
            $500+/mo on the table — Credex can help capture it
          </h2>
          <p className="mt-2 text-muted">
            Retail list prices don&apos;t include contract credits, commit discounts, or
            vendor bundles. Book a Credex consultation to capture savings our public model
            can&apos;t.
          </p>
          <a href="https://credex.com/consult" className="btn-primary btn-shimmer mt-4 inline-block rounded-lg px-5 py-2.5 text-sm">
            Book Credex consultation
          </a>
        </div>
      )}

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Per-tool breakdown</h2>
        {audit.recommendations.map((r) => (
          <article key={r.toolId} className="glass-panel rounded-2xl p-5 transition hover:border-border-strong">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <h3 className="text-lg font-semibold text-foreground">{r.toolName}</h3>
              <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
                {actionLabel[r.action] ?? r.action}
              </span>
            </div>
            <p className="mt-2 text-muted">
              ${r.currentSpend}/mo → ${r.recommendedSpend}/mo
              {r.monthlySavings > 0 && (
                <span className="ml-2 font-medium text-accent">(−${r.monthlySavings}/mo)</span>
              )}
            </p>
            <p className="mt-3 text-foreground/90">{r.reason}</p>
            {r.recommendedPlan && r.monthlySavings > 0 && (
              <p className="mt-2 text-sm text-muted-2">
                Suggested: {r.recommendedPlan}
                {r.alternativeTool ? ` · Alternative: ${r.alternativeTool}` : ""}
              </p>
            )}
          </article>
        ))}
      </section>
    </div>
  );
}
