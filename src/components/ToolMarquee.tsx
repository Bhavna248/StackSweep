const tools = [
  "Cursor",
  "GitHub Copilot",
  "Claude",
  "ChatGPT",
  "OpenAI API",
  "Anthropic API",
  "Gemini",
  "Windsurf",
  "StackSweep",
];

export function ToolMarquee() {
  const row = [...tools, ...tools];

  return (
    <section className="relative -mx-4 mb-14 overflow-hidden border-y border-border py-5 sm:-mx-6">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28"
        style={{ background: "linear-gradient(to right, var(--background), transparent)" }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28"
        style={{ background: "linear-gradient(to left, var(--background), transparent)" }}
      />
      <div className="marquee-track flex w-max gap-3">
        {row.map((tool, i) => (
          <span
            key={`${tool}-${i}`}
            className="shrink-0 rounded-full border border-border glass-panel px-5 py-2.5 text-sm font-medium text-foreground"
          >
            {tool}
          </span>
        ))}
      </div>
    </section>
  );
}
