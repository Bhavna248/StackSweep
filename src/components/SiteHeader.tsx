import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

const nav = [
  { href: "#estimator", label: "Estimator" },
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#faq", label: "FAQ" },
];

export function SiteHeader() {
  return (
    <header
      className="sticky top-0 z-50 border-b border-border backdrop-blur-2xl"
      style={{ background: "var(--header-bg)" }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3.5">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <Image src="/images/logo-mark.svg" alt="" width={34} height={34} />
          <span className="font-display text-lg font-bold tracking-tight text-foreground">
            Stack<span className="text-accent">Sweep</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm text-muted transition hover:bg-accent-soft hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <a href="#audit" className="btn-shimmer btn-primary hidden rounded-lg px-4 py-2 text-sm sm:inline-flex">
            Run audit →
          </a>
        </div>
      </div>
    </header>
  );
}
