import type { Metadata } from "next";
import Image from "next/image";
import { DM_Sans, JetBrains_Mono, Syne } from "next/font/google";
import { MeshBackground } from "@/components/MeshBackground";
import { SiteHeader } from "@/components/SiteHeader";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeScript } from "./theme-script";
import "./globals.css";

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const display = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "StackSweep — AI Stack Spend Audit",
  description:
    "Instant audit of Cursor, Copilot, Claude, ChatGPT, and API spend. See overspend, downgrades, and annual savings in 60 seconds.",
  openGraph: {
    title: "StackSweep — AI Stack Spend Audit",
    description: "Find $500+/mo in AI tool overspend. Free, no login.",
    type: "website",
    images: [
      {
        url: "/images/hero-dashboard.png",
        width: 1200,
        height: 675,
        alt: "StackSweep AI spend audit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "StackSweep",
    description: "Free AI stack spend audit with shareable savings report",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${display.variable} ${mono.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body className="relative min-h-screen font-sans antialiased">
        <ThemeProvider>
          <MeshBackground />
          <div className="relative z-10 flex min-h-screen flex-col">
            <SiteHeader />
            <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:py-14">
              {children}
            </main>
            <footer className="relative z-10 border-t border-border py-12">
              <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 text-center sm:flex-row sm:justify-between sm:text-left">
                <div className="flex items-center gap-2">
                  <Image src="/images/logo-mark.svg" alt="" width={28} height={28} />
                  <div>
                    <span className="font-display text-sm font-bold text-foreground">
                      Stack<span className="text-accent">Sweep</span>
                    </span>
                    <p className="text-xs text-muted-2">AI stack spend audit</p>
                  </div>
                </div>
                <p className="max-w-md text-sm text-muted">
                  Pricing logic sourced from vendor list prices · Not financial advice
                </p>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
