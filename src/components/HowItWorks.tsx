import { ScrollReveal } from "./ScrollReveal";
import { SectionHeader } from "./SectionHeader";

const steps = [
  {
    step: "01",
    title: "Map your stack",
    desc: "Select AI tools, plans, seats, and monthly spend. No login — data stays in your session.",
  },
  {
    step: "02",
    title: "Run the engine",
    desc: "Custom pricing logic compares list prices, detects overlap, and models consolidation scenarios.",
  },
  {
    step: "03",
    title: "Share proof",
    desc: "Get a defensible savings report with a public share link — built for teams, founders, and finance.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mb-20 scroll-mt-24">
      <ScrollReveal>
        <SectionHeader
          eyebrow="Process"
          title="Three steps. One minute. Real numbers."
          subtitle="Not a generic calculator — a purpose-built audit pipeline for modern AI stacks."
        />
      </ScrollReveal>
      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((s, i) => (
          <ScrollReveal key={s.step} delay={i * 100}>
            <div className="group glass-panel relative h-full overflow-hidden rounded-2xl p-7 transition hover:border-border-strong">
              <span className="font-display text-5xl font-bold text-accent/25 transition group-hover:text-accent/40">
                {s.step}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
