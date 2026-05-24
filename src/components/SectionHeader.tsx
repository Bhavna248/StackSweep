type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
};

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: Props) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`mb-10 max-w-2xl ${alignClass}`}>
      <p className="section-eyebrow">{eyebrow}</p>
      <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-lg leading-relaxed text-muted">{subtitle}</p>
      )}
    </div>
  );
}
