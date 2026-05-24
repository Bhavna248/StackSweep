"use client";

import { useState } from "react";
import { ScrollReveal } from "./ScrollReveal";
import { SectionHeader } from "./SectionHeader";

const faqs = [
  {
    q: "Is StackSweep really free?",
    a: "Yes. No login, no credit card. You get a full savings breakdown and a shareable report link instantly.",
  },
  {
    q: "Where do the numbers come from?",
    a: "We use published vendor list prices and seat-based math. Recommendations cite specific plans and per-seat costs — not guesses.",
  },
  {
    q: "What tools are supported?",
    a: "Cursor, GitHub Copilot, Claude, ChatGPT, OpenAI API, Anthropic API, Gemini, and Windsurf — with more added over time.",
  },
  {
    q: "How is overlap detected?",
    a: "If you pay for multiple coding assistants, we model consolidating to a single primary tool and quantify the redundant spend.",
  },
  {
    q: "Can I share results with my team?",
    a: "Every audit gets a public share URL with Open Graph previews — perfect for Slack, email, or social posts.",
  },
  {
    q: "Is my data stored?",
    a: "Form inputs are saved locally in your browser for convenience. Audits can be persisted server-side for share links.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="mb-20 scroll-mt-24">
      <ScrollReveal>
        <SectionHeader
          eyebrow="FAQ"
          title="Common questions"
          subtitle="Everything you need to know before running your first audit."
        />
      </ScrollReveal>
      <div className="space-y-3">
        {faqs.map((item, i) => (
          <ScrollReveal key={item.q} delay={i * 50}>
            <div className="glass-panel overflow-hidden rounded-2xl transition hover:border-border-strong">
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                aria-expanded={open === i}
              >
                <span className="font-medium text-foreground">{item.q}</span>
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-lg text-accent transition-transform duration-300 ${
                    open === i ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              {open === i && (
                <p className="border-t border-border px-6 py-4 text-sm leading-relaxed text-muted">
                  {item.a}
                </p>
              )}
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
