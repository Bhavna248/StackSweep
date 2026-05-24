import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type { AuditResult } from "./types";
import { memoryGet, memorySave } from "./audit-store";

let admin: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  if (!admin) admin = createClient(url, key);
  return admin;
}

export async function saveAudit(result: AuditResult): Promise<boolean> {
  memorySave(result);
  const sb = getSupabaseAdmin();
  if (!sb) return true;
  const { error } = await sb.from("audits").upsert({
    id: result.id,
    payload: result,
    total_monthly_savings: result.totalMonthlySavings,
    created_at: result.createdAt,
  });
  return !error;
}

export async function getAudit(id: string): Promise<AuditResult | null> {
  const mem = memoryGet(id);
  const sb = getSupabaseAdmin();
  if (!sb) return mem ?? null;
  const { data, error } = await sb
    .from("audits")
    .select("payload")
    .eq("id", id)
    .single();
  if (error || !data) return mem ?? null;
  return data.payload as AuditResult;
}

export async function saveLead(row: {
  audit_id: string;
  email: string;
  company_name?: string;
  role?: string;
  team_size?: number;
}): Promise<boolean> {
  const sb = getSupabaseAdmin();
  if (!sb) return false;
  const { error } = await sb.from("leads").insert(row);
  return !error;
}
