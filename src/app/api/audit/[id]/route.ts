import { NextResponse } from "next/server";
import { getAudit } from "@/lib/supabase";
import { publicAuditView } from "@/lib/audit-engine";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const audit = await getAudit(id);
  if (!audit) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(publicAuditView(audit));
}
