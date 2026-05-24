import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { z } from "zod";
import { runAudit } from "@/lib/audit-engine";
import { saveAudit } from "@/lib/supabase";
import { checkRateLimit, clientIp } from "@/lib/rate-limit";

const schema = z.object({
  tools: z.array(
    z.object({
      toolId: z.enum([
        "cursor",
        "github-copilot",
        "claude",
        "chatgpt",
        "anthropic-api",
        "openai-api",
        "gemini",
        "windsurf",
      ]),
      plan: z.string(),
      monthlySpend: z.number().min(0),
      seats: z.number().int().min(1),
    })
  ).min(1),
  teamSize: z.number().int().min(1),
  useCase: z.enum(["coding", "writing", "data", "research", "mixed"]),
  website: z.string().optional(),
});

export async function POST(req: Request) {
  const ip = clientIp(req);
  const rl = checkRateLimit(`audit:${ip}`);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Too many audits. Try again later." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter ?? 3600) } }
    );
  }

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  if (parsed.data.website) {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }

  const id = nanoid(12);
  const result = runAudit(parsed.data, id);
  await saveAudit(result);

  return NextResponse.json(result);
}
