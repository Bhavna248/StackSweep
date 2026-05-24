"use client";

import { useState } from "react";

type Props = {
  auditId: string;
  highSavings: boolean;
  lowSavings: boolean;
  shareUrl: string;
};

export function LeadCapture({ auditId, highSavings, lowSavings, shareUrl }: Props) {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [website, setWebsite] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        auditId,
        email,
        companyName: company || undefined,
        role: role || undefined,
        teamSize: teamSize ? Number(teamSize) : undefined,
        website,
      }),
    });
    if (!res.ok) {
      setError("Could not save. Try again.");
      return;
    }
    setDone(true);
  };

  if (done) {
    return (
      <div className="glass-panel-strong rounded-2xl p-6">
        <p className="font-semibold text-accent">Report saved — check your inbox.</p>
        <p className="mt-2 text-sm text-muted">
          Share:{" "}
          <a href={shareUrl} className="text-accent underline hover:text-accent-hover">
            {shareUrl}
          </a>
        </p>
      </div>
    );
  }

  return (
    <section className="glass-panel rounded-2xl p-6">
      <h2 className="text-lg font-semibold text-foreground">
        {highSavings
          ? "Save report & hear from Credex"
          : lowSavings
            ? "Notify me when new optimizations apply"
            : "Email me this audit"}
      </h2>
      <p className="mt-1 text-sm text-muted">No spam. Value first — you already saw your savings.</p>
      <form onSubmit={submit} className="mt-4 space-y-3">
        <input
          type="email"
          required
          placeholder="work@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
        <div className="grid gap-3 sm:grid-cols-3">
          <input
            placeholder="Company (optional)"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="input-field"
          />
          <input
            placeholder="Role (optional)"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="input-field"
          />
          <input
            type="number"
            placeholder="Team size"
            value={teamSize}
            onChange={(e) => setTeamSize(e.target.value)}
            className="input-field"
          />
        </div>
        <input
          type="text"
          name="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button type="submit" className="btn-primary rounded-lg px-5 py-2.5 text-sm">
          Save report
        </button>
      </form>
    </section>
  );
}
