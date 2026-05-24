import { ScrollReveal } from "./ScrollReveal";
import { SectionHeader } from "./SectionHeader";

const stack = [
  { name: "Next.js 15", category: "Framework", highlight: true },
  { name: "TypeScript", category: "Language", highlight: true },
  { name: "Tailwind CSS v4", category: "Styling", highlight: false },
  { name: "Zod", category: "Validation", highlight: false },
  { name: "Supabase", category: "Database", highlight: false },
  { name: "Anthropic API", category: "AI Summary", highlight: true },
  { name: "Vitest", category: "Testing", highlight: false },
  { name: "Resend", category: "Email", highlight: false },
];

const highlights = [
  "Rule-based pricing engine with 8+ vendor models",
  "REST API routes with Zod validation",
  "Session + DB persistence with shareable OG metadata",
  "Lead capture with honeypot spam protection",
];

export function TechStack() {
  return (
    <section id="tech" className="mb-20 scroll-mt-24">
      <ScrollReveal>
        <SectionHeader
          eyebrow="Engineering"
          title="Production-grade stack, not a weekend mockup"
          subtitle="Every layer chosen for type safety, speed, and deployability."
        />
      </ScrollReveal>

      <div className="grid gap-6 lg:grid-cols-5">
        <ScrollReveal className="lg:col-span-3" delay={0}>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stack.map((item) => (
              <div
                key={item.name}
                className={`rounded-xl border p-4 transition duration-300 hover:-translate-y-0.5 ${
                  item.highlight
                    ? "border-border-strong bg-accent-soft"
                    : "glass-panel hover:border-border-strong"
                }`}
              >
                <p className="text-xs font-medium uppercase tracking-wider text-accent/80">
                  {item.category}
                </p>
                <p className="mt-2 font-semibold text-foreground">{item.name}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal className="lg:col-span-2" delay={150}>
          <div className="glass-panel-strong flex h-full flex-col justify-between rounded-2xl border-border-strong p-6">
            <div>
              <p className="font-mono text-xs text-accent"> architecture highlights</p>
              <ul className="mt-4 space-y-3">
                {highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-sm text-muted">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-6 border-t border-border pt-4 font-mono text-xs text-muted-2">
              Fully typed · ESLint · Deploy-ready on Vercel
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
