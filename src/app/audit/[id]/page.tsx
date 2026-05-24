"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AuditResults } from "@/components/AuditResults";
import { LeadCapture } from "@/components/LeadCapture";
import { ShareActions } from "@/components/ShareActions";
import type { AuditResult } from "@/lib/types";

export default function AuditPage() {
  const { id } = useParams<{ id: string }>();
  const [audit, setAudit] = useState<AuditResult | null>(null);
  const [summary, setSummary] = useState<string>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const cached = sessionStorage.getItem(`audit-${id}`);
      if (cached) {
        const a = JSON.parse(cached) as AuditResult;
        setAudit(a);
        setLoading(false);
        fetchSummary(a);
        return;
      }
      const res = await fetch(`/api/audit/${id}`);
      if (res.ok) {
        const a = await res.json();
        setAudit(a);
        fetchSummary(a);
      }
      setLoading(false);
    };
    load();
  }, [id]);

  const fetchSummary = async (a: AuditResult) => {
    const res = await fetch("/api/summary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ audit: a }),
    });
    if (res.ok) {
      const { summary: s } = await res.json();
      setSummary(s);
    }
  };

  const appUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_APP_URL ?? "";

  if (loading) {
    return <p className="text-center text-muted">Loading audit…</p>;
  }

  if (!audit) {
    return <p className="text-center text-red-400">Audit not found.</p>;
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
            Your audit
          </h1>
          <p className="mt-1 text-sm text-muted-2">
            {audit.input.teamSize}-person team · {audit.input.useCase} ·{" "}
            {audit.input.tools.length} tools
          </p>
        </div>
        <ShareActions audit={audit} shareUrl={`${appUrl}/share/${id}`} />
      </div>
      <a
        href={`/share/${id}`}
        className="inline-block text-sm text-accent underline hover:text-accent-hover"
      >
        View public share page →
      </a>
      <AuditResults audit={audit} summary={summary} />
      <div className="no-print">
        <LeadCapture
          auditId={id}
          highSavings={audit.highSavings}
          lowSavings={audit.lowSavings}
          shareUrl={`${appUrl}/share/${id}`}
        />
      </div>
    </div>
  );
}
