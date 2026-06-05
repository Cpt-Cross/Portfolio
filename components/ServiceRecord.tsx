"use client";

import { serviceRecord } from "@/lib/data";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

const current = serviceRecord.find((s) => s.active);

const summary = [
  { k: "ACTIVE SINCE", v: "2019" },
  { k: "POSTINGS LOGGED", v: String(serviceRecord.length).padStart(2, "0") },
  { k: "CURRENT", v: current ? current.unit : "—" },
  { k: "THEATRES", v: "Remote · Bengaluru · New Delhi" },
];

export function ServiceRecord() {
  return (
    <section id="service" className="px-3 md:px-6 py-10 md:py-12">
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

        {/* Summary rail - fills the right, stacks under on mobile */}
        <aside className="mt-8 lg:mt-0 lg:sticky lg:top-16">
          <Reveal>
            <div className="hud-panel bg-panel-2/40 p-5">
              <div className="t-label text-tac mb-4">// SERVICE SUMMARY</div>
              <dl className="space-y-3.5">
                {summary.map((row) => (
                  <div key={row.k} className="flex flex-col gap-0.5 border-b border-line pb-3 last:border-0 last:pb-0">
                    <dt className="t-label !text-dim">{row.k}</dt>
                    <dd className="font-mono text-sm text-fg/90 leading-snug">{row.v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-4 pt-4 border-t border-line flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-tac blink shrink-0" />
                <span className="font-mono text-[11px] text-fg/80 leading-relaxed">Open to full-time, remote-first roles.</span>
              </div>
            </div>
          </Reveal>
        </aside>
      </div>
    </section>
  );
}
