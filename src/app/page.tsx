"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuditHistory } from "@/components/AuditHistory";
import { Differentiators } from "@/components/Differentiators";
import { FAQ } from "@/components/FAQ";
import { FeatureCard } from "@/components/FeatureCard";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorks } from "@/components/HowItWorks";
import { SavingsEstimator } from "@/components/SavingsEstimator";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionHeader } from "@/components/SectionHeader";
import { SpendForm } from "@/components/SpendForm";
import { StatsBar } from "@/components/StatsBar";
import { TechStack } from "@/components/TechStack";
import { ToolMarquee } from "@/components/ToolMarquee";
import { DEMO_AUDIT_INPUT } from "@/lib/demo-audit";
import { submitAudit } from "@/lib/run-audit";
import type { AuditInput } from "@/lib/types";

const features = [
  ["List-price math", "Every recommendation ties to published per-seat pricing."],
  ["Overlap detection", "Three coding assistants? We model consolidation."],
  ["Shareable proof", "Public URL with OG previews for HN and X."],
] as const;

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);
  const [err, setErr] = useState("");

  const run = async (input: AuditInput & { website?: string }) => {
    setLoading(true);
    setErr("");
    try {
      const audit = await submitAudit(input);
      router.push(`/audit/${audit.id}`);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const runDemo = async () => {
    setDemoLoading(true);
    setErr("");
    try {
      const audit = await submitAudit(DEMO_AUDIT_INPUT);
      router.push(`/audit/${audit.id}`);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setDemoLoading(false);
    }
  };

  const busy = loading || demoLoading;

  return (
    <div>
      <HeroSection onTryDemo={runDemo} demoLoading={demoLoading} />
      <ToolMarquee />
      <StatsBar />
      <SavingsEstimator />

      <Differentiators />
      <HowItWorks />

      <AuditHistory />

      <section id="audit" className="scroll-mt-24">
        <ScrollReveal>
          <div className="glass-panel-strong relative overflow-hidden rounded-2xl p-6 sm:p-10">
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full blur-3xl"
              style={{ background: "var(--accent-glow)" }}
            />
            <div className="relative mb-8 flex flex-wrap items-start justify-between gap-4 border-b border-border pb-6">
              <div>
                <p className="section-eyebrow">Try the product</p>
                <h2 className="font-display mt-2 text-2xl font-bold text-foreground sm:text-3xl">
                  Run your free audit now
                </h2>
                <p className="mt-2 text-muted">
                  Tell us what you pay — get a full savings report in seconds.
                </p>
              </div>
              <button
                type="button"
                onClick={runDemo}
                disabled={busy}
                className="btn-secondary shrink-0 rounded-xl px-4 py-2.5 text-sm font-semibold text-accent disabled:opacity-50"
              >
                {demoLoading ? "Loading demo…" : "Try sample audit"}
              </button>
            </div>
            <SpendForm onSubmit={run} loading={loading} />
            {err && <p className="mt-4 text-center text-red-400">{err}</p>}
          </div>
        </ScrollReveal>
      </section>

      <section className="mt-20">
        <ScrollReveal>
          <SectionHeader
            eyebrow="Capabilities"
            title="Built for engineers who ship"
            subtitle="The same features that make this a real product — not a tutorial clone."
          />
        </ScrollReveal>
        <div className="grid gap-6 sm:grid-cols-3">
          {features.map(([title, description], i) => (
            <ScrollReveal key={title} delay={i * 80}>
              <FeatureCard title={title} description={description} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      <TechStack />
      <FAQ />
    </div>
  );
}
