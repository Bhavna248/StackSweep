import Image from "next/image";

const icons: Record<string, string> = {
  "List-price math": "/images/icon-math.svg",
  "Overlap detection": "/images/icon-overlap.svg",
  "Shareable proof": "/images/icon-share.svg",
};

type Props = { title: string; description: string };

export function FeatureCard({ title, description }: Props) {
  return (
    <div className="group glass-panel h-full rounded-2xl p-6 transition duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-[var(--shadow-glow)]">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft ring-1 ring-[var(--border-strong)]">
        <Image src={icons[title]} alt="" width={28} height={28} className="opacity-90" />
      </div>
      <h3 className="font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
    </div>
  );
}
