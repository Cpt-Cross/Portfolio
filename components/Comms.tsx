"use client";

import { useState } from "react";
import { ArrowUpRight, Copy, Check } from "lucide-react";
import { profile } from "@/lib/data";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

type Channel = {
  code: string;
  label: string;
  value: string;
  href?: string;
  copy?: string; // if set, card copies this string instead of linking
};

const channels: Channel[] = [
  { code: "NET-01", label: "LinkedIn", value: "/in/captaincross", href: profile.links.linkedin },
  { code: "NET-02", label: "Twitch", value: "/captaincrosstv", href: profile.links.twitch },
  { code: "NET-03", label: "YouTube", value: "/@CaptainCross", href: profile.links.youtube },
  { code: "NET-04", label: "Instagram", value: "/cpt.cross", href: profile.links.instagram },
  { code: "NET-05", label: "Discord", value: profile.links.discord, copy: profile.links.discord },
];

export function Comms() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (val: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(val).then(() => {
        setCopied(val);
        setTimeout(() => setCopied(null), 1600);
      });
    }
  };

  return (
    <section id="comms" className="px-3 md:px-6 py-10 md:py-12 grid-bg">
      <SectionLabel
        index="05"
        code="ESTABLISH-CONTACT"
        title="Establish contact"
        annotation="CHANNELS OPEN. STATUS: AVAILABLE FOR DEPLOYMENT."
      />

      <div className="max-w-5xl">
        <Reveal>
          <div className="mb-10 md:mb-14">
            <p className="font-head font-600 text-2xl md:text-4xl lg:text-5xl text-fg leading-tight uppercase">
              Open to remote roles across
            </p>
            <p className="mt-2 md:mt-3 font-head font-600 text-2xl md:text-4xl lg:text-5xl text-tac leading-tight uppercase tracking-tight">
              NA · EU · SEA · Japan · India
            </p>
          </div>
        </Reveal>

        {/* Primary channel - email */}
        <Reveal delay={0.1}>
          <a
            href={`mailto:${profile.email}`}
            className="hud-panel group flex items-center justify-between p-5 md:p-7 mb-3 md:mb-4 hover:bg-panel-2/50 transition-colors"
          >
            <div className="min-w-0">
              <div className="t-label text-tac mb-2">// PRIMARY CHANNEL</div>
              <div className="font-mono text-lg md:text-3xl text-fg group-hover:text-tac transition-colors break-all">
                {profile.email}
              </div>
            </div>
            <ArrowUpRight className="w-6 h-6 md:w-9 md:h-9 text-muted group-hover:text-tac group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-3" />
          </a>
        </Reveal>

        {/* Network channels */}
        <Reveal delay={0.2}>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
            {channels.map((c) => {
              const isCopy = !!c.copy;
              const justCopied = copied === c.copy;
              const inner = (
                <>
                  <div className="min-w-0">
                    <div className="t-label mb-2">{c.code} · {c.label}</div>
                    <div className="font-mono text-sm md:text-base text-fg/90 group-hover:text-tac transition-colors truncate">
                      {c.value}
                    </div>
                  </div>
                  {isCopy ? (
                    justCopied ? (
                      <Check className="w-4 h-4 text-tac shrink-0" />
                    ) : (
                      <Copy className="w-4 h-4 text-dim group-hover:text-tac transition-all shrink-0" />
                    )
                  ) : (
                    <ArrowUpRight className="w-4 h-4 text-dim group-hover:text-tac transition-all shrink-0" />
                  )}
                </>
              );

              const className =
                "hud-panel group p-4 md:p-5 flex items-center justify-between gap-2 hover:bg-panel-2/50 transition-colors text-left w-full";

              return isCopy ? (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => handleCopy(c.copy as string)}
                  className={className}
                  title="Copy Discord username"
                >
                  {inner}
                </button>
              ) : (
                <a key={c.code} href={c.href} target="_blank" rel="noopener noreferrer" className={className}>
                  {inner}
                </a>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-10 md:mt-14 pt-5 border-t border-line flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <span className="t-label">{profile.taskforce} · {profile.callsign} · MMXXVI</span>
            <span className="t-label">{profile.location} · {profile.coords} · {profile.workMode}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
