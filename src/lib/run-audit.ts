import type { AuditInput, AuditResult } from "./types";
import { addAuditToHistory } from "./audit-history";

export async function submitAudit(
  input: AuditInput & { website?: string }
): Promise<AuditResult> {
  const res = await fetch("/api/audit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      tools: input.tools,
      teamSize: input.teamSize,
      useCase: input.useCase,
      website: input.website,
    }),
  });
  if (!res.ok) {
    const j = await res.json();
    throw new Error(j.error ?? "Audit failed");
  }
  const audit = (await res.json()) as AuditResult;
  sessionStorage.setItem(`audit-${audit.id}`, JSON.stringify(audit));
  addAuditToHistory(audit);
  return audit;
}
