"use client";

import { useEffect, useState } from "react";
import type { AuditInput, ToolEntry, ToolId, UseCase } from "@/lib/types";
import { TOOL_LABELS, TOOL_PLANS } from "@/lib/types";
import { loadForm, saveForm } from "@/lib/form-storage";

const ALL_TOOLS: ToolId[] = [
  "cursor",
  "github-copilot",
  "claude",
  "chatgpt",
  "anthropic-api",
  "openai-api",
  "gemini",
  "windsurf",
];

const emptyEntry = (toolId: ToolId): ToolEntry => ({
  toolId,
  plan: TOOL_PLANS[toolId][0],
  monthlySpend: 0,
  seats: 1,
});

type Props = { onSubmit: (input: AuditInput) => void; loading?: boolean };

export function SpendForm({ onSubmit, loading }: Props) {
  const [teamSize, setTeamSize] = useState(5);
  const [useCase, setUseCase] = useState<UseCase>("coding");
  const [selected, setSelected] = useState<Set<ToolId>>(new Set(["cursor", "claude"]));
  const [entries, setEntries] = useState<Record<ToolId, ToolEntry>>(() => {
    const m = {} as Record<ToolId, ToolEntry>;
    ALL_TOOLS.forEach((t) => (m[t] = emptyEntry(t)));
    return m;
  });
  const [website, setWebsite] = useState("");

  useEffect(() => {
    const saved = loadForm();
    if (!saved) return;
    if (saved.teamSize) setTeamSize(saved.teamSize);
    if (saved.useCase) setUseCase(saved.useCase);
    if (saved.tools?.length) {
      const sel = new Set<ToolId>();
      const ent = { ...entries };
      saved.tools.forEach((t) => {
        sel.add(t.toolId);
        ent[t.toolId] = t;
      });
      setSelected(sel);
      setEntries(ent);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps -- hydrate once
  }, []);

  useEffect(() => {
    const tools = [...selected].map((id) => entries[id]);
    saveForm({ tools, teamSize, useCase });
  }, [selected, entries, teamSize, useCase]);

  const toggle = (id: ToolId) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const update = (id: ToolId, patch: Partial<ToolEntry>) => {
    setEntries((e) => ({ ...e, [id]: { ...e[id], ...patch } }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tools = [...selected]
      .map((id) => entries[id])
      .filter((t) => t.monthlySpend > 0 || t.plan !== "Free");
    if (tools.length === 0) return;
    onSubmit({ tools, teamSize, useCase, website } as AuditInput & { website?: string });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-foreground">Team size</span>
          <input
            type="number"
            min={1}
            value={teamSize}
            onChange={(e) => setTeamSize(Number(e.target.value))}
            className="input-field mt-1"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-foreground">Primary use case</span>
          <select
            value={useCase}
            onChange={(e) => setUseCase(e.target.value as UseCase)}
            className="input-field mt-1"
          >
            <option value="coding">Coding</option>
            <option value="writing">Writing</option>
            <option value="data">Data</option>
            <option value="research">Research</option>
            <option value="mixed">Mixed</option>
          </select>
        </label>
      </div>

      <div className="space-y-4">
        <p className="text-sm text-muted">Select tools you pay for (monthly spend &gt; $0)</p>
        {ALL_TOOLS.map((id) => (
          <div
            key={id}
            className={`rounded-xl border p-4 transition-all duration-300 hover:-translate-y-1 ${
              selected.has(id)
                ? "border-orange-500/40 bg-[#14100b] shadow-[0_0_30px_rgba(255,122,0,0.12)] ring-1 ring-orange-500/20"
                : "border-white/10 bg-white/[0.03] hover:bg-white/[0.05] hover:border-orange-500/20"
            }`}
          >
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={selected.has(id)}
                onChange={() => toggle(id)}
                className="h-4 w-4 accent-[var(--accent)]"
              />
              <span className="font-semibold text-foreground">{TOOL_LABELS[id]}</span>
            </label>
            {selected.has(id) && (
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <label>
                  <span className="text-xs text-muted-2">Plan</span>
                  <select
                    value={entries[id].plan}
                    onChange={(e) => update(id, { plan: e.target.value })}
                    className="input-field mt-1 text-sm"
                  >
                    {TOOL_PLANS[id].map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </label>
                <label>
                  <span className="text-xs text-muted-2">Monthly spend ($)</span>
                  <input
                    type="number"
                    min={0}
                    step={0.01}
                    value={entries[id].monthlySpend || ""}
                    onChange={(e) =>
                      update(id, { monthlySpend: Number(e.target.value) || 0 })
                    }
                    className="input-field mt-1 text-sm"
                  />
                </label>
                <label>
                  <span className="text-xs text-muted-2">Seats</span>
                  <input
                    type="number"
                    min={1}
                    value={entries[id].seats}
                    onChange={(e) => update(id, { seats: Number(e.target.value) || 1 })}
                    className="input-field mt-1 text-sm"
                  />
                </label>
              </div>
            )}
          </div>
        ))}
      </div>

      <input
        type="text"
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="absolute -left-[9999px]"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
      />

      <button
        type="submit"
        disabled={loading || selected.size === 0}
        className="btn-shimmer btn-primary w-full rounded-xl px-6 py-4 text-lg"
      >
        {loading ? "Auditing…" : "Run free audit →"}
      </button>
    </form>
  );
}
