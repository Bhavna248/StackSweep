import type { ToolId } from "./types";

/** Official list prices per seat/month (USD). See PRICING_DATA.md for sources. */
export const LIST_PRICE: Record<
  ToolId,
  Partial<Record<string, number>>
> = {
  cursor: {
    Hobby: 0,
    Pro: 20,
    Business: 40,
    Enterprise: 0,
  },
  "github-copilot": {
    Individual: 10,
    Business: 19,
    Enterprise: 0,
  },
  claude: {
    Free: 0,
    Pro: 20,
    Max: 100,
    Team: 30,
    Enterprise: 0,
    "API direct": 0,
  },
  chatgpt: {
    Free: 0,
    Plus: 20,
    Team: 25,
    Enterprise: 0,
    "API direct": 0,
  },
  "anthropic-api": {
    "Pay-as-you-go": 0,
  },
  "openai-api": {
    "Pay-as-you-go": 0,
  },
  gemini: {
    Free: 0,
    Pro: 19.99,
    Ultra: 249.99,
    API: 0,
  },
  windsurf: {
    Free: 0,
    Pro: 15,
    Teams: 30,
    Enterprise: 0,
  },
};

export function listPricePerSeat(toolId: ToolId, plan: string): number {
  const p = LIST_PRICE[toolId]?.[plan];
  return p ?? 0;
}

export function expectedMonthly(toolId: ToolId, plan: string, seats: number): number {
  const perSeat = listPricePerSeat(toolId, plan);
  if (perSeat === 0 && plan !== "Free" && plan !== "Hobby") return 0;
  return perSeat * Math.max(seats, 1);
}
