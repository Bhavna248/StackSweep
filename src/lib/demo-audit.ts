import type { AuditInput } from "./types";

/** Sample 10-person eng team with typical AI sprawl */
export const DEMO_AUDIT_INPUT: AuditInput = {
  teamSize: 10,
  useCase: "coding",
  tools: [
    { toolId: "cursor", plan: "Business", monthlySpend: 400, seats: 10 },
    { toolId: "github-copilot", plan: "Business", monthlySpend: 190, seats: 10 },
    { toolId: "windsurf", plan: "Pro", monthlySpend: 150, seats: 5 },
    { toolId: "claude", plan: "Team", monthlySpend: 250, seats: 8 },
    { toolId: "openai-api", plan: "Pay-as-you-go", monthlySpend: 600, seats: 1 },
  ],
};
