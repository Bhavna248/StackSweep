import { ScrollReveal } from "./ScrollReveal";
import { SectionHeader } from "./SectionHeader";

const items = [
  {
    title: "Defensible math",
    desc: "Recommendations cite published per-seat list prices — finance teams can actually trust the output.",
    span: "lg:col-span-2",
    accent: true,
  },
  {
    title: "Overlap engine",
    desc: "Detects redundant coding assistants and models consolidation savings.",
    span: "",
    accent: false,
  },
  {
    title: "Viral share links",
    desc: "OG-optimized public URLs designed for HN, X, and Slack — growth built in.",
    span: "",
    accent: false,
  },
  {
    title: "AI-powered summary",
    desc: "Claude generates a personalized narrative on top of deterministic audit results.",
    span: "lg:col-span-2",
    accent: false,
  },
];

export function Differentiators() {
  return (
    <section id="features" className="mb-20 scroll-mt-24">
      <ScrollReveal>
        <SectionHeader
          eyebrow="Why it stands out"
          title="Not another AI wrapper — a real product"
          subtitle="StackSweep solves a specific, timely problem with clear technical depth."
        />
      </ScrollReveal>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <ScrollReveal key={item.title} delay={i * 80} className={item.span}>
            <div
              className={`h-full rounded-2xl border p-7 transition duration-300 hover:-translate-y-0.5 ${
                item.accent
                  ? "glass-panel-strong border-border-strong bg-gradient-to-br from-accent-soft to-transparent"
                  : "glass-panel hover:border-border-strong"
              }`}
            >
              <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
