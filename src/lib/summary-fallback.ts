import type { AuditResult } from "./types";
import { TOOL_LABELS } from "./types";

export function templatedSummary(result: AuditResult): string {
  const top = [...result.recommendations]
    .filter((r) => r.monthlySavings > 0)
    .sort((a, b) => b.monthlySavings - a.monthlySavings)
    .slice(0, 3);

  if (result.isOptimal || result.totalMonthlySavings < 50) {
    return `Your ${result.input.tools.length}-tool AI stack is already lean for a ${result.input.teamSize}-person team focused on ${result.input.useCase}. We found under $50/mo in clear cuts — mostly plan-fit tweaks. We'll notify you when pricing or overlap rules change for your vendors.`;
  }

  const moves = top
    .map(
      (r) =>
        `${TOOL_LABELS[r.toolId]} ($${r.monthlySavings}/mo): ${r.action}`
    )
    .join("; ");

  return `For a ${result.input.teamSize}-person team (${result.input.useCase}), you're spending $${result.totalCurrentSpend}/mo across ${result.input.tools.length} tools. Biggest moves: ${moves}. Modeled savings: $${result.totalMonthlySavings}/mo ($${result.totalAnnualSavings}/yr). ${result.highSavings ? "You're in Credex territory — a consultation can capture credits and contract pricing we don't model here." : "Start with downgrades and consolidation before switching vendors."}`;
}
