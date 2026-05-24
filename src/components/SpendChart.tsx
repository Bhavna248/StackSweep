import type { AuditResult } from "@/lib/types";

type Props = { audit: AuditResult };

export function SpendChart({ audit }: Props) {
  const max = Math.max(...audit.recommendations.map((r) => r.currentSpend), 1);
  const savingsPct =
    audit.totalCurrentSpend > 0
      ? Math.round((audit.totalMonthlySavings / audit.totalCurrentSpend) * 100)
      : 0;

  return (
    <section className="glass-panel rounded-2xl p-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Spend comparison</h2>
          <p className="mt-1 text-sm text-muted-2">Current vs modeled spend per tool</p>
        </div>
        {savingsPct > 0 && (
          <span className="rounded-full bg-accent-soft px-3 py-1 text-sm font-semibold text-accent">
            {savingsPct}% total reduction
          </span>
        )}
      </div>

      <div className="mt-6 space-y-5">
        {audit.recommendations.map((r) => {
          const currentW = (r.currentSpend / max) * 100;
          const recW = (r.recommendedSpend / max) * 100;
          return (
            <div key={r.toolId}>
              <div className="mb-2 flex justify-between text-sm">
                <span className="font-medium text-foreground">{r.toolName}</span>
                <span className="text-muted-2">
                  ${r.currentSpend} → ${r.recommendedSpend}
                </span>
              </div>
              <div className="relative h-2.5 overflow-hidden rounded-full bg-[var(--border)]">
                <div
                  className="absolute inset-y-0 left-0 rounded-full opacity-40"
                  style={{ width: `${currentW}%`, background: "var(--muted)" }}
                />
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-accent"
                  style={{ width: `${recW}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex gap-6 text-xs text-muted-2">
        <span className="flex items-center gap-2">
          <span className="h-2 w-5 rounded-full opacity-40" style={{ background: "var(--muted)" }} />
          Current
        </span>
        <span className="flex items-center gap-2">
          <span className="h-2 w-5 rounded-full bg-accent" />
          Modeled
        </span>
      </div>
    </section>
  );
}
