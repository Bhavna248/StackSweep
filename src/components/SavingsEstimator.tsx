"use client";

import { useMemo, useState } from "react";
import { ScrollReveal } from "./ScrollReveal";

function estimateSavings(
  monthlySpend: number,
  teamSize: number,
  codingToolCount: number
): { low: number; high: number; pct: string } {
  let rateLow = 0.08;
  let rateHigh = 0.15;

  if (codingToolCount >= 2) {
    rateLow += 0.12;
    rateHigh += 0.22;
  }
  if (monthlySpend > teamSize * 80) {
    rateLow += 0.05;
    rateHigh += 0.1;
  }
  if (teamSize >= 8) {
    rateLow += 0.03;
    rateHigh += 0.05;
  }

  rateHigh = Math.min(rateHigh, 0.45);
  rateLow = Math.min(rateLow, rateHigh - 0.05);

  const low = Math.round(monthlySpend * rateLow);
  const high = Math.round(monthlySpend * rateHigh);
  const pct = `${Math.round(rateLow * 100)}–${Math.round(rateHigh * 100)}%`;

  return { low, high, pct };
}

export function SavingsEstimator() {
  const [monthlySpend, setMonthlySpend] = useState(2500);
  const [teamSize, setTeamSize] = useState(10);
  const [codingTools, setCodingTools] = useState(2);

  const { low, high, pct } = useMemo(
    () => estimateSavings(monthlySpend, teamSize, codingTools),
    [monthlySpend, teamSize, codingTools]
  );

  return (
    <ScrollReveal>
      <section id="estimator" className="glass-panel-strong mb-20 scroll-mt-24 rounded-2xl p-6 sm:p-10">
        <p className="section-eyebrow">Quick estimate</p>
        <h2 className="font-display mt-2 text-2xl font-bold text-foreground sm:text-3xl">
          How much could you save?
        </h2>
        <p className="mt-2 text-sm text-muted">
          Rough model based on overlap and overspend — run a full audit for exact numbers.
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <div className="space-y-8">
            {[
              { label: "Total monthly AI spend", value: `$${monthlySpend.toLocaleString()}`, min: 200, max: 25000, step: 100, set: setMonthlySpend, val: monthlySpend },
              { label: "Team size", value: String(teamSize), min: 1, max: 100, step: 1, set: setTeamSize, val: teamSize },
              { label: "Coding assistants", value: String(codingTools), min: 0, max: 4, step: 1, set: setCodingTools, val: codingTools },
            ].map((s) => (
              <label key={s.label} className="block">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground">{s.label}</span>
                  <span className="font-mono font-semibold text-accent">{s.value}</span>
                </div>
                <input
                  type="range"
                  min={s.min}
                  max={s.max}
                  step={s.step}
                  value={s.val}
                  onChange={(e) => s.set(Number(e.target.value))}
                  className="mt-3 w-full accent-accent"
                />
              </label>
            ))}
          </div>

          <div className="gradient-border flex flex-col justify-center rounded-2xl p-8 text-center lg:text-left">
            <div className="relative rounded-xl p-6" style={{ background: "var(--accent-soft)" }}>
              <p className="text-sm uppercase tracking-wider text-accent">Estimated savings</p>
              <p className="font-display mt-3 text-4xl font-bold text-foreground sm:text-5xl">
                ${low.toLocaleString()} – ${high.toLocaleString()}
                <span className="text-xl font-normal text-muted">/mo</span>
              </p>
              <p className="mt-2 text-muted">
                ~{pct} of spend · up to{" "}
                <span className="font-semibold text-accent">${(high * 12).toLocaleString()}/yr</span>
              </p>
              <a href="#audit" className="btn-shimmer btn-primary mt-8 inline-flex rounded-xl px-6 py-3 text-sm">
                Get exact audit →
              </a>
            </div>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
