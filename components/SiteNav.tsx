"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "HOME" },
  { href: "/work", label: "WORK" },
  { href: "/gallery", label: "GALLERY" },
  { href: "/connect", label: "CONNECT" },
];

export function SiteNav() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 h-11 bg-void/90 backdrop-blur-sm border-b border-line">
      <nav className="h-full px-3 md:px-6 flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-2 shrink-0" aria-label="Captain Cross home">
          <span className="font-head font-700 text-tac text-sm leading-none border border-line-bright px-1.5 py-1 group-hover:border-tac transition-colors">
            CC
          </span>
          <span className="t-label !text-fg/70 hidden sm:inline group-hover:!text-tac transition-colors">
            CAPTAIN CROSS
          </span>
        </Link>

        <div className="flex items-center gap-1">
          {LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`px-2 md:px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide transition-colors ${
                  active ? "text-tac" : "text-muted hover:text-fg"
                }`}
              >
                {active && <span className="text-tac/60">/</span>}
                {l.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
