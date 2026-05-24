"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getAuditHistory, type AuditHistoryEntry } from "@/lib/audit-history";

export function AuditHistory() {
  const [history, setHistory] = useState<AuditHistoryEntry[]>([]);

  useEffect(() => {
    setHistory(getAuditHistory());
  }, []);

  if (history.length === 0) return null;

  return (
    <section className="mb-10">
      <p className="section-eyebrow mb-3">Your recent audits</p>
      <ul className="flex flex-wrap gap-2">
        {history.map((h) => (
          <li key={h.id}>
            <Link
              href={`/audit/${h.id}`}
              className="glass-panel inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm transition hover:border-border-strong"
            >
              <span className="text-muted">
                {h.teamSize}p · {h.toolCount} tools
              </span>
              <span className="font-semibold text-accent">−${h.totalMonthlySavings}/mo</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
