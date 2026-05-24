import type {
  AuditInput,
  AuditResult,
  ToolEntry,
  ToolId,
  ToolRecommendation,
  UseCase,
} from "./types";
import { TOOL_LABELS } from "./types";
import { expectedMonthly, listPricePerSeat } from "./pricing";

const CODING_TOOLS: ToolId[] = ["cursor", "github-copilot", "windsurf"];
function savings(current: number, recommended: number): number {
  return Math.max(0, Math.round((current - recommended) * 100) / 100);
}

function auditTool(
  entry: ToolEntry,
  ctx: { teamSize: number; useCase: UseCase; codingToolCount: number }
): ToolRecommendation {
  const { toolId, plan, monthlySpend, seats } = entry;
  const name = TOOL_LABELS[toolId];
  const list = expectedMonthly(toolId, plan, seats);
  let recommended = monthlySpend;
  let action: ToolRecommendation["action"] = "keep";
  let reason = "Your plan and spend align with typical usage for your team size.";
  let recommendedPlan = plan;
  let alternativeTool: string | undefined;

  const effectiveSeats = Math.max(seats, 1);
  const keeper: ToolId = "cursor";

  // Overlapping coding IDEs — consolidate before credits (bigger savings than 8% retail)
  if (
    CODING_TOOLS.includes(toolId) &&
    ctx.codingToolCount >= 2 &&
    ctx.useCase === "coding" &&
    monthlySpend > 0
  ) {
    if (toolId !== keeper) {
      return {
        toolId,
        toolName: name,
        currentSpend: monthlySpend,
        recommendedSpend: 0,
        monthlySavings: monthlySpend,
        action: "consolidate",
        reason: `You pay for ${ctx.codingToolCount} coding assistants; keep ${TOOL_LABELS[keeper]} as primary and drop redundant ${name}.`,
        alternativeTool: TOOL_LABELS[keeper],
      };
    }
  }

  // Paying above list → Credex credits opportunity
  if (list > 0 && monthlySpend > list * 1.08) {
    const viaCredits = Math.round(list * 0.92 * 100) / 100;
    return {
      toolId,
      toolName: name,
      currentSpend: monthlySpend,
      recommendedSpend: viaCredits,
      monthlySavings: savings(monthlySpend, viaCredits),
      action: "credits",
      reason: `You pay $${monthlySpend}/mo vs $${list}/mo list for ${plan} × ${effectiveSeats} seat(s). Credex credits typically beat retail by ~8%.`,
      recommendedPlan: plan,
    };
  }

  switch (toolId) {
    case "cursor": {
      if (
        (plan === "Business" || plan === "Enterprise") &&
        effectiveSeats <= 3 &&
        ctx.useCase === "coding"
      ) {
        recommendedPlan = "Pro";
        recommended = listPricePerSeat("cursor", "Pro") * effectiveSeats;
        action = "downgrade";
        reason = `Business ($40/seat) adds org admin you don't need for ${effectiveSeats} coder(s). Pro ($20/seat) keeps the same IDE features.`;
      }
      break;
    }
    case "github-copilot": {
      if (plan === "Business" && effectiveSeats <= 2) {
        recommendedPlan = "Individual";
        recommended = 10 * effectiveSeats;
        action = "downgrade";
        reason = `Copilot Business ($19/seat) requires org billing; ${effectiveSeats} solo dev(s) fit Individual ($10/mo each).`;
      }
      break;
    }
    case "claude": {
      if (plan === "Team" && effectiveSeats <= 4 && ctx.useCase !== "mixed") {
        recommendedPlan = "Pro";
        recommended = 20 * effectiveSeats;
        action = "downgrade";
        reason = `Claude Team ($30/seat) is for shared workspaces; ${effectiveSeats} users on ${ctx.useCase} rarely need pooled admin.`;
      }
      if (plan === "Max" && ctx.useCase === "writing") {
        recommendedPlan = "Pro";
        recommended = 20;
        action = "downgrade";
        reason = "Max ($100) targets power users with heavy context; writing workflows usually fit Pro ($20).";
      }
      break;
    }
    case "chatgpt": {
      if (plan === "Team" && effectiveSeats <= 3) {
        recommendedPlan = "Plus";
        recommended = 20 * effectiveSeats;
        action = "downgrade";
        reason = `Team ($25/user) adds workspace controls; ${effectiveSeats} users can use Plus ($20) unless you need SSO.`;
      }
      break;
    }
    case "gemini": {
      if (plan === "Ultra" && ["coding", "writing"].includes(ctx.useCase)) {
        recommendedPlan = "Pro";
        recommended = 19.99;
        action = "downgrade";
        reason = "Ultra ($249.99) is for deep research/multimodal volume; your use case fits Pro ($19.99).";
      }
      break;
    }
    case "windsurf": {
      if (plan === "Teams" && effectiveSeats <= 2) {
        recommendedPlan = "Pro";
        recommended = 15 * effectiveSeats;
        action = "downgrade";
        reason = `Teams ($30/seat) for ${effectiveSeats} dev(s) duplicates Pro ($15) without team gains.`;
      }
      break;
    }
    default:
      break;
  }

  if (
    CODING_TOOLS.includes(toolId) &&
    toolId === keeper &&
    ctx.codingToolCount >= 2 &&
    ctx.useCase === "coding"
  ) {
    reason =
      "Keep Cursor as your primary coding assistant; drop other IDEs flagged below.";
  }

  // Claude + Anthropic API overlap
  if (toolId === "anthropic-api" && monthlySpend > 50) {
    reason =
      "Direct API spend alongside Claude subscription often duplicates capacity — route traffic through one channel.";
    if (monthlySpend > 100) {
      recommended = Math.round(monthlySpend * 0.7);
      action = "switch";
      recommendedPlan = "Consolidate to Claude Pro/Team or API-only";
      reason = `$${monthlySpend}/mo API with an active Claude seat suggests consolidation could cut ~30% duplicate spend.`;
    }
  }

  // OpenAI API + ChatGPT overlap
  if (toolId === "openai-api" && monthlySpend > 75) {
    recommended = Math.round(monthlySpend * 0.75);
    action = "switch";
    recommendedPlan = "API-only or ChatGPT Plus";
    reason = `API at $${monthlySpend}/mo plus ChatGPT seats often means chat UI + API for same tasks — pick one surface.`;
  }

  // Alternative by use case (not dogmatic — capability fit)
  if (
    toolId === "chatgpt" &&
    plan === "Plus" &&
    ctx.useCase === "coding" &&
    monthlySpend >= 20
  ) {
    alternativeTool = "Cursor Pro";
    reason =
      "Plus is general chat; for coding-heavy work, an IDE-native tool reduces context switching (optional switch, not required).";
  }

  const monthlySavingsAmt = savings(monthlySpend, recommended);

  return {
    toolId,
    toolName: name,
    currentSpend: monthlySpend,
    recommendedSpend: recommended,
    monthlySavings: monthlySavingsAmt,
    action: monthlySavingsAmt > 0 ? action : "keep",
    reason,
    recommendedPlan: monthlySavingsAmt > 0 ? recommendedPlan : undefined,
    alternativeTool,
  };
}

export function runAudit(input: AuditInput, id: string): AuditResult {
  const codingToolCount = input.tools.filter(
    (t) => CODING_TOOLS.includes(t.toolId) && t.monthlySpend > 0
  ).length;

  const ctx = {
    teamSize: input.teamSize,
    useCase: input.useCase,
    codingToolCount,
  };

  const recommendations = input.tools.map((t) => auditTool(t, ctx));

  const totalCurrentSpend = input.tools.reduce((s, t) => s + t.monthlySpend, 0);
  const totalRecommendedSpend = recommendations.reduce(
    (s, r) => s + r.recommendedSpend,
    0
  );
  const totalMonthlySavings = Math.max(
    0,
    Math.round((totalCurrentSpend - totalRecommendedSpend) * 100) / 100
  );
  const totalAnnualSavings = totalMonthlySavings * 12;

  const highSavings = totalMonthlySavings >= 500;
  const lowSavings = totalMonthlySavings < 100;

  return {
    id,
    input,
    recommendations,
    totalMonthlySavings,
    totalAnnualSavings,
    totalCurrentSpend,
    totalRecommendedSpend,
    isOptimal: totalMonthlySavings < 50,
    highSavings,
    lowSavings,
    createdAt: new Date().toISOString(),
  };
}

export function publicAuditView(result: AuditResult): Omit<AuditResult, "input"> & {
  input: {
    tools: Array<{
      toolId: ToolId;
      plan: string;
      monthlySpend: number;
      seats: number;
    }>;
    teamSize: number;
    useCase: UseCase;
  };
} {
  return {
    ...result,
    input: {
      tools: result.input.tools.map((t) => ({
        toolId: t.toolId,
        plan: t.plan,
        monthlySpend: t.monthlySpend,
        seats: t.seats,
      })),
      teamSize: result.input.teamSize,
      useCase: result.input.useCase,
    },
  };
}
