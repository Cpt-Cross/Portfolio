"use client";

import { serviceRecord, serviceSnapshot } from "@/lib/data";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

export function ServiceRecord() {
  return (
    <section id="service" className="px-3 md:px-6 py-5 md:py-6">
      <SectionLabel
        index="02"
        code="SERVICE-RECORD"
        title="Service record"
        annotation="POSTING HISTORY · 2019 TO ACTIVE."
      />

      <div className="max-w-6xl lg:grid lg:grid-cols-[minmax(0,1fr)_310px] lg:gap-10 lg:items-start">
        {/* Posting timeline */}
        <div>
          {serviceRecord.map((s, i) => (
            <Reveal key={s.unit} delay={i * 0.04}>
              <article className="group grid grid-cols-12 gap-3 md:gap-6 py-5 md:py-7 border-t border-line hover:border-line-bright transition-colors">
                {/* Left meta */}
                <div className="col-span-12 md:col-span-3">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-mono text-tac text-[11px]">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-mono text-[11px] md:text-xs text-muted tracking-wide">{s.period}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="t-label">{s.theatre}</span>
                    {s.active && (
                      <span className="t-label !text-tac inline-flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-tac blink" />
                        ACTIVE
                      </span>
                    )}
                  </div>
                </div>

                {/* Right body */}
                <div className="col-span-12 md:col-span-9">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1.5 mb-1">
                    <h3 className="font-head font-700 text-2xl md:text-3xl text-fg uppercase group-hover:text-tac transition-colors">
                      {s.unit}
                    </h3>
                    <span className="t-label !text-tac border border-tac/40 px-1.5 py-0.5">{s.tag}</span>
                  </div>
                  <p className="font-mono text-xs md:text-sm text-muted mb-3">{s.posting}</p>
                  <ul className="space-y-1.5">
                    {s.summary.map((p, idx) => (
                      <li key={idx} className="obj-item font-mono text-xs md:text-sm text-fg/75 leading-relaxed">
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Summary rail - desktop only (space-filler on mobile) */}
        <aside className="hidden lg:block lg:mt-0 lg:sticky lg:top-16">
          <Reveal>
            <div className="hud-panel bg-panel-2/40 p-5">
              <div className="t-label text-tac mb-4">// OPERATOR SNAPSHOT</div>

              {/* Availability */}
              <div className="flex items-start gap-2.5 pb-4 mb-4 border-b border-line">
                <span className="w-1.5 h-1.5 rounded-full bg-tac blink shrink-0 mt-1.5" />
                <div>
                  <div className="t-label !text-dim mb-1">AVAILABILITY</div>
                  <div className="font-mono text-sm text-fg/90 leading-snug">Open to work</div>
                  <div className="font-mono text-[11px] text-muted leading-snug mt-0.5">{serviceSnapshot.availability}</div>
                </div>
              </div>

              {/* Experience + Based */}
              <div className="grid grid-cols-2 gap-3 pb-4 mb-4 border-b border-line">
                <div>
                  <div className="t-label !text-dim mb-1.5">EXPERIENCE</div>
                  <div className="font-head font-700 text-2xl text-tac leading-none">{serviceSnapshot.experience}</div>
                  <div className="font-mono text-[11px] text-muted mt-1.5 leading-snug">{serviceSnapshot.experienceNote}</div>
                </div>
                <div>
                  <div className="t-label !text-dim mb-1.5">BASED</div>
                  <div className="font-mono text-sm text-fg/90 leading-snug">{serviceSnapshot.based}</div>
                  <div className="font-mono text-[11px] text-muted mt-1.5 leading-snug">{serviceSnapshot.coverage}</div>
                </div>
              </div>

              {/* Key clients */}
              <div className="pb-4 mb-4 border-b border-line">
                <div className="t-label !text-dim mb-2">KEY CLIENTS</div>
                <div className="flex flex-wrap gap-1.5">
                  {serviceSnapshot.clients.map((c) => (
                    <span key={c} className="font-mono text-[10px] text-fg/80 border border-line-bright px-1.5 py-0.5">{c}</span>
                  ))}
                </div>
              </div>

              {/* Specialties */}
              <div className="pb-4 mb-4 border-b border-line">
                <div className="t-label !text-dim mb-2">SPECIALTIES</div>
                <ul className="space-y-1">
                  {serviceSnapshot.specialties.map((s) => (
                    <li key={s} className="obj-item font-mono text-[11px] text-fg/75 leading-relaxed">{s}</li>
                  ))}
                </ul>
              </div>

              {/* Languages */}
              <div>
                <div className="t-label !text-dim mb-1.5">LANGUAGES</div>
                <div className="font-mono text-[11px] text-fg/80 leading-relaxed">{serviceSnapshot.languages}</div>
              </div>
            </div>
          </Reveal>
        </aside>
      </div>
    </section>
  );
}
