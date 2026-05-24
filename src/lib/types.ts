export type UseCase =
  | "coding"
  | "writing"
  | "data"
  | "research"
  | "mixed";

export type ToolId =
  | "cursor"
  | "github-copilot"
  | "claude"
  | "chatgpt"
  | "anthropic-api"
  | "openai-api"
  | "gemini"
  | "windsurf";

export interface ToolEntry {
  toolId: ToolId;
  plan: string;
  monthlySpend: number;
  seats: number;
}

export interface AuditInput {
  tools: ToolEntry[];
  teamSize: number;
  useCase: UseCase;
}

export type RecommendationAction =
  | "keep"
  | "downgrade"
  | "switch"
  | "consolidate"
  | "credits";

export interface ToolRecommendation {
  toolId: ToolId;
  toolName: string;
  currentSpend: number;
  recommendedSpend: number;
  monthlySavings: number;
  action: RecommendationAction;
  reason: string;
  recommendedPlan?: string;
  alternativeTool?: string;
}

export interface AuditResult {
  id: string;
  input: AuditInput;
  recommendations: ToolRecommendation[];
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  totalCurrentSpend: number;
  totalRecommendedSpend: number;
  isOptimal: boolean;
  highSavings: boolean;
  lowSavings: boolean;
  summary?: string;
  createdAt: string;
}

export interface LeadPayload {
  auditId: string;
  email: string;
  companyName?: string;
  role?: string;
  teamSize?: number;
  website?: string;
}

export const TOOL_LABELS: Record<ToolId, string> = {
  cursor: "Cursor",
  "github-copilot": "GitHub Copilot",
  claude: "Claude",
  chatgpt: "ChatGPT",
  "anthropic-api": "Anthropic API",
  "openai-api": "OpenAI API",
  gemini: "Gemini",
  windsurf: "Windsurf",
};

export const TOOL_PLANS: Record<ToolId, string[]> = {
  cursor: ["Hobby", "Pro", "Business", "Enterprise"],
  "github-copilot": ["Individual", "Business", "Enterprise"],
  claude: ["Free", "Pro", "Max", "Team", "Enterprise", "API direct"],
  chatgpt: ["Free", "Plus", "Team", "Enterprise", "API direct"],
  "anthropic-api": ["Pay-as-you-go"],
  "openai-api": ["Pay-as-you-go"],
  gemini: ["Free", "Pro", "Ultra", "API"],
  windsurf: ["Free", "Pro", "Teams", "Enterprise"],
};
