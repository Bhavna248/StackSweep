import Image from "next/image";

type Props = {
  onTryDemo?: () => void;
  demoLoading?: boolean;
};

export function HeroSection({ onTryDemo, demoLoading }: Props) {
  return (
    <section className="relative mb-6 overflow-hidden pt-2">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="text-center lg:text-left">
          <p className="badge mx-auto lg:mx-0">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Live product · Free audit
          </p>

          <h1 className="font-display mt-7 text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.5rem]">
          <span className="bg-gradient-to-b from-[#f0b06d] to-[#c96b1a] bg-clip-text text-transparent">
  Stop bleeding money
</span>
            <br />
            <span className="text-foreground">on your AI stack</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted lg:mx-0">
            The first{" "}
            <strong className="font-medium text-foreground">free spend audit</strong> for
            Cursor, Copilot, Claude &amp; API sprawl — with shareable proof your CFO will
            read.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3 lg:justify-start">
            <a href="#audit" className="btn-shimmer btn-primary inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-base">
              Start free audit
              <span aria-hidden>↓</span>
            </a>
            <a href="#estimator" className="btn-secondary inline-flex items-center rounded-xl px-7 py-3.5 text-base font-medium">
              Estimate savings
            </a>
            {onTryDemo && (
              <button
                type="button"
                onClick={onTryDemo}
                disabled={demoLoading}
                className="btn-secondary rounded-xl px-7 py-3.5 text-base font-medium text-[#d97706] disabled:opacity-50"
              >
                {demoLoading ? "Loading…" : "Try sample audit"}
              </button>
            )}
          </div>

          <p className="mt-7 text-xs tracking-wide text-muted-2">
            No login · No credit card · Results in under 60 seconds
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <div
            className="absolute -inset-6 rounded-3xl opacity-60 blur-3xl"
            style={{ background: "var(--accent-glow)" }}
          />
          <div className="gradient-border relative overflow-hidden shadow-2xl" style={{ boxShadow: "var(--shadow-glow)" }}>
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src="/images/hero-dashboard.png"
                alt="StackSweep dashboard — AI stack savings analytics"
                width={1200}
                height={675}
                className="h-auto w-full object-cover"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/80 to-transparent p-5 pt-16">
                <div className="glass-panel flex items-center justify-between rounded-xl px-4 py-3">
                  <div>
                    <p className="text-xs text-muted-2">Modeled savings</p>
                    <p className="font-display text-2xl font-bold text-[#d97706]
  `">$847/mo</p>
                  </div>
                  <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-[#d97706]
  `">
                    Sample output
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
