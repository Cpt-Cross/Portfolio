"use client";

import { ExternalLink, Gamepad2, Drama, Video, Users, Radar } from "lucide-react";
import { profile, roleDetails, liveActivations, commendation } from "@/lib/data";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

const ICONS = { Gamepad2, Drama, Video, Users, Radar } as const;

export function Doctrine() {
  const ThroughlineIcon = ICONS[liveActivations.icon as keyof typeof ICONS] ?? Radar;

  return (
    <section className="px-3 md:px-6 py-10 md:py-12">
      <SectionLabel
        index="03"
        code="OPERATIONAL-DOCTRINE"
        title="What sets the desk apart"
        annotation="FOUR ROLES. ALL AT SCALE. ALL STILL ACTIVE."
      />

      {/* 4 identity roles - icon + role + descriptor */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-3 md:mb-4">
        {roleDetails.map((r, i) => {
          const Icon = ICONS[r.icon as keyof typeof ICONS] ?? Gamepad2;
          return (
            <Reveal key={r.role} delay={i * 0.07}>
              <div className="hud-panel p-4 md:p-6 h-full flex flex-col gap-4 min-h-[170px] md:min-h-[200px] group">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-tac text-xs">R-{String(i + 1).padStart(2, "0")}</span>
                  <Icon className="w-5 h-5 text-muted group-hover:text-tac transition-colors" strokeWidth={1.5} />
                </div>
                <div className="mt-auto">
                  <div className="font-head font-700 text-xl md:text-2xl text-fg uppercase leading-none tracking-tight">
                    {r.role}
                  </div>
                  <p className="mt-2.5 font-mono text-[11px] md:text-xs text-muted leading-relaxed">
                    {r.detail}
                  </p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* The professional throughline - live activations / event ops (wide) */}
      <Reveal delay={0.1}>
        <div className="hud-panel bg-panel-2/40 p-5 md:p-7 mb-10 md:mb-14 flex flex-col md:flex-row md:items-center gap-4 md:gap-6 border-l-2 border-l-tac">
          <div className="flex items-center gap-4 md:shrink-0">
            <ThroughlineIcon className="w-7 h-7 md:w-9 md:h-9 text-tac" strokeWidth={1.5} />
            <div>
              <div className="t-label text-tac mb-1">// PRIMARY FUNCTION</div>
              <div className="font-head font-700 text-lg md:text-2xl text-fg uppercase leading-none tracking-tight">
                {liveActivations.label}
              </div>
            </div>
          </div>
          <p className="font-mono text-xs md:text-sm text-fg/80 leading-relaxed md:border-l md:border-line md:pl-6">
            {liveActivations.detail}
          </p>
        </div>
      </Reveal>

      {/* Doctrine statement */}
      <Reveal delay={0.1}>
        <div className="hud-panel bg-panel-2/40 p-6 md:p-10 max-w-4xl mx-auto text-center">
          <div className="t-label text-tac mb-4">// FIELD DOCTRINE</div>
          <blockquote className="font-head font-600 text-xl md:text-3xl lg:text-4xl text-fg leading-tight">
            The rare seat on the brand side that has been the{" "}
            <span className="text-tac">gamer</span>, the{" "}
            <span className="text-tac">cosplayer</span>, the{" "}
            <span className="text-tac">creator</span>, and the{" "}
            <span className="text-tac">community lead</span>.
          </blockquote>
          <p className="mt-6 font-mono text-xs md:text-sm text-muted leading-relaxed max-w-2xl mx-auto">
            {profile.doctrine}
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <a href={profile.links.twitch} target="_blank" rel="noopener noreferrer" className="t-link inline-flex items-center gap-2 font-mono text-xs md:text-sm text-fg/80 hover:text-tac transition-colors">
              TWITCH / CAPTAINCROSSTV <ExternalLink className="w-3 h-3" />
            </a>
            <a href={profile.links.youtube} target="_blank" rel="noopener noreferrer" className="t-link inline-flex items-center gap-2 font-mono text-xs md:text-sm text-fg/80 hover:text-tac transition-colors">
              YOUTUBE / @CAPTAINCROSS <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </Reveal>

      {/* Commendation - sits after the differentiator */}
      <Reveal delay={0.1}>
        <div className="mt-10 md:mt-12 pt-8 md:pt-10 border-t border-line text-center">
          <div className="t-label text-tac mb-4">// COMMENDATION</div>
          <div className="font-head font-700 text-2xl md:text-4xl lg:text-5xl uppercase leading-tight">
            <span className="text-fg">{commendation.namePrimary} </span>
            <span className="text-tac">{commendation.nameAccent}</span>
          </div>
          <p className="mt-3 font-mono text-[11px] md:text-xs text-muted tracking-wide leading-relaxed">
            {commendation.sub}
          </p>
        </div>
      </Reveal>
    </section>
  );
}
