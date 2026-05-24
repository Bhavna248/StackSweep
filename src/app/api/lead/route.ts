import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { saveLead, getAudit } from "@/lib/supabase";
import { checkRateLimit, clientIp } from "@/lib/rate-limit";

const schema = z.object({
  auditId: z.string(),
  email: z.string().email(),
  companyName: z.string().optional(),
  role: z.string().optional(),
  teamSize: z.number().int().optional(),
  website: z.string().optional(),
});

export async function POST(req: Request) {
  const ip = clientIp(req);
  const rl = checkRateLimit(`lead:${ip}`);
  if (!rl.ok) {
    return NextResponse.json({ error: "Rate limited" }, { status: 429 });
  }

  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const audit = await getAudit(parsed.data.auditId);
  await saveLead({
    audit_id: parsed.data.auditId,
    email: parsed.data.email,
    company_name: parsed.data.companyName,
    role: parsed.data.role,
    team_size: parsed.data.teamSize,
  });

  const resendKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  if (resendKey && audit) {
    const resend = new Resend(resendKey);
    const high = audit.highSavings;
    await resend.emails.send({
      from,
      to: parsed.data.email,
      subject: `Your StackSweep audit — $${audit.totalMonthlySavings}/mo in potential savings`,
      html: `
        <p>Thanks for saving your StackSweep audit.</p>
        <p><strong>Modeled savings:</strong> $${audit.totalMonthlySavings}/month ($${audit.totalAnnualSavings}/year)</p>
        <p><a href="${appUrl}/share/${audit.id}">View shareable report</a></p>
        ${high ? "<p><strong>Credex</strong> will reach out — your stack shows $500+/mo optimization potential.</p>" : "<p>We'll notify you when new optimizations apply to your vendors.</p>"}
      `,
    });
  }

  return NextResponse.json({ ok: true });
}
