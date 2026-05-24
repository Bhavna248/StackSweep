import { describe, it, expect } from "vitest";
import { runAudit } from "@/lib/audit-engine";
import type { AuditInput } from "@/lib/types";

const base = (tools: AuditInput["tools"], overrides?: Partial<AuditInput>): AuditInput => ({
  tools,
  teamSize: 5,
  useCase: "coding",
  ...overrides,
});

describe("audit-engine", () => {
  it("downgrades Cursor Business for small coding team", () => {
    const r = runAudit(
      base([
        {
          toolId: "cursor",
          plan: "Business",
          monthlySpend: 120,
          seats: 3,
        },
      ]),
      "t1"
    );
    const c = r.recommendations[0];
    expect(c.action).toBe("downgrade");
    expect(c.monthlySavings).toBeGreaterThan(0);
    expect(c.recommendedSpend).toBe(60);
  });

  it("downgrades Copilot Business to Individual for 1 seat", () => {
    const r = runAudit(
      base([
        {
          toolId: "github-copilot",
          plan: "Business",
          monthlySpend: 19,
          seats: 1,
        },
      ]),
      "t2"
    );
    expect(r.recommendations[0].monthlySavings).toBe(9);
    expect(r.recommendations[0].recommendedPlan).toBe("Individual");
  });

  it("flags retail overspend for Credex credits", () => {
    const r = runAudit(
      base([
        {
          toolId: "claude",
          plan: "Pro",
          monthlySpend: 28,
          seats: 1,
        },
      ]),
      "t3"
    );
    expect(r.recommendations[0].action).toBe("credits");
    expect(r.recommendations[0].monthlySavings).toBeGreaterThan(0);
  });

  it("consolidates duplicate coding assistants", () => {
    const r = runAudit(
      base([
        { toolId: "cursor", plan: "Pro", monthlySpend: 40, seats: 2 },
        { toolId: "windsurf", plan: "Pro", monthlySpend: 30, seats: 2 },
      ]),
      "t4"
    );
    const windsurf = r.recommendations.find((x) => x.toolId === "windsurf");
    expect(windsurf?.action).toBe("consolidate");
    expect(r.totalMonthlySavings).toBeGreaterThan(0);
  });

  it("marks low savings stack as optimal band", () => {
    const r = runAudit(
      base(
        [{ toolId: "chatgpt", plan: "Plus", monthlySpend: 20, seats: 1 }],
        { useCase: "writing", teamSize: 1 }
      ),
      "t5"
    );
    expect(r.lowSavings).toBe(true);
    expect(r.totalMonthlySavings).toBeLessThan(100);
  });

  it("surfaces high savings tier at $500+", () => {
    const r = runAudit(
      base([
        { toolId: "cursor", plan: "Business", monthlySpend: 80, seats: 2 },
        { toolId: "windsurf", plan: "Pro", monthlySpend: 300, seats: 10 },
        { toolId: "gemini", plan: "Ultra", monthlySpend: 250, seats: 1 },
      ]),
      "t6"
    );
    expect(r.totalMonthlySavings).toBeGreaterThanOrEqual(500);
    expect(r.highSavings).toBe(true);
  });
});
