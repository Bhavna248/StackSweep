import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AuditResults } from "@/components/AuditResults";
import { getAudit } from "@/lib/supabase";
import { publicAuditView } from "@/lib/audit-engine";
import { memoryGet } from "@/lib/audit-store";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const audit = (await getAudit(id)) ?? memoryGet(id);
  const savings = audit?.totalMonthlySavings ?? 0;
  const title = savings > 0
    ? `StackSweep: $${savings}/mo AI stack savings`
    : "StackSweep AI stack audit";
  const description = audit
    ? `${audit.input.tools.length} tools · ${audit.input.useCase} · $${audit.totalAnnualSavings}/yr potential`
    : "Free AI spend audit";

  const base = process.env.NEXT_PUBLIC_APP_URL ?? "https://stacksweep.vercel.app";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${base}/share/${id}`,
      siteName: "StackSweep",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function SharePage({ params }: Props) {
  const { id } = await params;
  const raw = (await getAudit(id)) ?? memoryGet(id);

  if (!raw) {
    return (
      <p className="text-center text-muted">This audit link is invalid or expired.</p>
    );
  }

  const audit = publicAuditView(raw);

  return (
    <div className="space-y-8">
      <div className="gradient-border overflow-hidden rounded-2xl">
        <div className="relative h-36 sm:h-44">
          <Image
            src="/images/hero-dashboard.png"
            alt=""
            fill
            className="object-cover object-center opacity-70"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, var(--background) 0%, transparent 60%)",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 p-6 text-center">
            <p className="text-sm font-medium text-accent">Shared StackSweep audit</p>
            <h1 className="font-display mt-1 text-2xl font-bold text-foreground sm:text-3xl">
              {audit.input.teamSize}-person team · {audit.input.useCase}
            </h1>
            <p className="mt-1 text-sm text-muted">
              {audit.input.tools.length} tools analyzed · No email or company shown
            </p>
          </div>
        </div>
      </div>
      <AuditResults audit={audit} />
      <div className="glass-panel-strong rounded-2xl p-8 text-center">
        <p className="text-lg font-medium text-foreground">Run your own audit — free, no login</p>
        <Link href="/" className="btn-primary btn-shimmer mt-5 inline-block rounded-xl px-8 py-3 font-semibold">
          Audit my stack
        </Link>
      </div>
    </div>
  );
}
