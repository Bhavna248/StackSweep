import { ScrollReveal } from "./ScrollReveal";

const stats = [
  { value: "<60s", label: "End-to-end audit", sub: "Form to shareable report" },
  { value: "8+", label: "AI tools modeled", sub: "Cursor, Claude, APIs & more" },
  { value: "100%", label: "List-price backed", sub: "Every claim is defensible" },
];

export function StatsBar() {
  return (
    <ScrollReveal className="mb-16">
      <div className="grid gap-px overflow-hidden rounded-2xl border border-border-strong glass-panel-strong sm:grid-cols-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-card-solid/90 px-6 py-8 text-center transition hover:bg-accent-soft/30"
          >
            <p className="font-display text-3xl font-bold text-accent sm:text-4xl">{s.value}</p>
            <p className="mt-1 font-semibold text-foreground">{s.label}</p>
            <p className="mt-0.5 text-xs text-muted-2">{s.sub}</p>
          </div>
        ))}
      </div>
    </ScrollReveal>
  );
}
