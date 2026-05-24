import type { AuditResult } from "./types";

const KEY = "stacksweep-history-v1";
const MAX = 5;

export type AuditHistoryEntry = {
  id: string;
  totalMonthlySavings: number;
  totalCurrentSpend: number;
  teamSize: number;
  toolCount: number;
  createdAt: string;
};

export function addAuditToHistory(audit: AuditResult): void {
  if (typeof window === "undefined") return;
  try {
    const entry: AuditHistoryEntry = {
      id: audit.id,
      totalMonthlySavings: audit.totalMonthlySavings,
      totalCurrentSpend: audit.totalCurrentSpend,
      teamSize: audit.input.teamSize,
      toolCount: audit.input.tools.length,
      createdAt: audit.createdAt,
    };
    const prev = getAuditHistory().filter((h) => h.id !== audit.id);
    const next = [entry, ...prev].slice(0, MAX);
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* quota */
  }
}

export function getAuditHistory(): AuditHistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as AuditHistoryEntry[]) : [];
  } catch {
    return [];
  }
}
