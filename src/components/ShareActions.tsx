"use client";

import { useState } from "react";
import type { AuditResult } from "@/lib/types";

type Props = {
  audit: AuditResult;
  shareUrl: string;
};

export function ShareActions({ audit, shareUrl }: Props) {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadReport = () => {
    const blob = new Blob([JSON.stringify(audit, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `stacksweep-audit-${audit.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button type="button" onClick={copyLink} className="btn-secondary rounded-lg px-4 py-2 text-sm font-medium">
        {copied ? "Copied!" : "Copy share link"}
      </button>
      <button type="button" onClick={downloadReport} className="btn-secondary rounded-lg px-4 py-2 text-sm font-medium">
        Download JSON
      </button>
      <button
        type="button"
        onClick={() => window.print()}
        className="rounded-lg px-4 py-2 text-sm font-medium text-muted transition hover:text-foreground"
      >
        Print
      </button>
    </div>
  );
}
