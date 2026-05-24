import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { templatedSummary } from "@/lib/summary-fallback";
import type { AuditResult } from "@/lib/types";

const schema = z.object({ audit: z.custom<AuditResult>() });

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid audit" }, { status: 400 });
  }

  const audit = parsed.data.audit;
  const key = process.env.ANTHROPIC_API_KEY;

  if (!key) {
    return NextResponse.json({
      summary: templatedSummary(audit),
      source: "template",
    });
  }

  try {
    const client = new Anthropic({ apiKey: key });
    const prompt = `Write ~100 words for a finance-minded engineering lead. Tone: direct, no hype. Stack: ${audit.input.tools.length} tools, team ${audit.input.teamSize}, use case ${audit.input.useCase}. Monthly spend $${audit.totalCurrentSpend}, modeled savings $${audit.totalMonthlySavings}/mo. Top moves: ${audit.recommendations
      .filter((r) => r.monthlySavings > 0)
      .slice(0, 4)
      .map((r) => `${r.toolName} ${r.action} $${r.monthlySavings}`)
      .join("; ")}. Do not invent dollar amounts not listed.`;

    const msg = await client.messages.create({
      model: "claude-3-5-haiku-20241022",
      max_tokens: 200,
      messages: [{ role: "user", content: prompt }],
    });

    const text =
      msg.content[0]?.type === "text" ? msg.content[0].text : templatedSummary(audit);

    return NextResponse.json({ summary: text.trim(), source: "anthropic" });
  } catch {
    return NextResponse.json({
      summary: templatedSummary(audit),
      source: "template",
    });
  }
}
