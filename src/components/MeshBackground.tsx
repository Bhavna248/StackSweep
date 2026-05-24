export function MeshBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="mesh-orb mesh-orb-1 absolute -left-32 top-0 h-[520px] w-[520px] rounded-full blur-[130px]" />
      <div className="mesh-orb mesh-orb-2 absolute -right-24 top-1/4 h-[440px] w-[440px] rounded-full blur-[110px]" />
      <div className="mesh-orb mesh-orb-3 absolute -bottom-32 left-1/4 h-[400px] w-[400px] rounded-full blur-[100px]" />
      <div
        className="absolute inset-0 opacity-100"
        style={{
          backgroundImage: `linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)`,
          backgroundSize: "72px 72px",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
    </div>
  );
}
