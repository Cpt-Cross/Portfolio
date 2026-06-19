"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { deployments, additionalOps } from "@/lib/data";
import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

// highlight numeric/metric tokens in signature green (skips 4-digit years)
function hl(text: string) {
  return text.split(/(\d[\d,]*(?:\.\d+)?(?:K|M|B)?\+?%?)/g).map((part, i) =>
    /^\d/.test(part) && !/^(?:19|20)\d{2}$/.test(part) ? (
      <span key={i} className="text-tac">
        {part}
      </span>
    ) : (
      part
    )
  );
}

const featured = deployments[0];
const rest = deployments.slice(1);

export function DeploymentLog() {
  const [imgErr, setImgErr] = useState<Record<string, boolean>>({});

  const Stripe = ({ d, op }: { d: (typeof deployments)[number]; op: string }) => (
    <div className="flex items-center justify-between px-4 h-9 border-b border-line bg-panel-2/50">
      <div className="flex items-center gap-3 min-w-0">
        <span className="font-mono text-[11px] text-tac shrink-0">{op}</span>
        <span className="t-label !text-fg/80 truncate">{d.op}</span>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <span className="t-label !text-muted hidden lg:inline">CLR: {d.clearance}</span>
        <span className={`t-label ${d.status === "ONGOING" ? "!text-tac" : "!text-muted"}`}>
          {d.status === "ONGOING" ? "● ACTIVE" : "✓ COMPLETE"}
        </span>
      </div>
    </div>
  );

  return (
    <section id="deployment" className="px-3 md:px-6 py-5 md:py-6">
      <SectionLabel
        index="01"
        code="DEPLOYMENT-LOG"
        title="Deployment log"
        annotation="SELECTED OPS · FILED FOR BREADTH, NOT VANITY."
      />

      {/* Featured op (AMD) - full width, trimmed image */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="hud-panel group flex flex-col mb-3 md:mb-4"
      >
        <Stripe d={featured} op="OP.01" />
        <div className="flex flex-col lg:flex-row">
          <div className="relative overflow-hidden bg-panel-2 lg:w-1/2 aspect-video lg:aspect-auto lg:min-h-[280px]">
            {featured.image && !imgErr[featured.op] ? (
              <>
                <Image
                  src={featured.image}
                  alt={featured.brand}
                  fill
                  sizes="(max-width:1024px) 100vw, 50vw"
                  className="object-cover grayscale contrast-110 opacity-55 group-hover:grayscale-0 group-hover:opacity-90 transition-all duration-700"
                  onError={() => setImgErr((p) => ({ ...p, [featured.op]: true }))}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/90 to-void/20" />
              </>
            ) : (
              <div className="absolute inset-0 grid-bg opacity-40" />
            )}
            <div className="absolute bottom-3 left-4 right-4">
              <h3 className="font-head font-700 text-fg leading-none uppercase text-3xl md:text-5xl">{featured.brand}</h3>
              <p className="t-label !text-fg/70 mt-1.5">{featured.theatre}</p>
            </div>
          </div>
          <div className="p-4 md:p-5 flex flex-col lg:w-1/2">
            <div className="t-label text-tac mb-3">// OBJECTIVES</div>
            <ul className="space-y-2 flex-1">
              {featured.objectives.slice(0, 4).map((o, idx) => (
                <li key={idx} className="obj-item font-mono text-xs md:text-sm text-fg/80 leading-relaxed">
                  {hl(o)}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-x-3 gap-y-1.5 mt-4 pt-3 border-t border-line">
              {featured.tags.map((t) => (
                <span key={t} className="t-label !text-muted">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </motion.article>

      {/* The other four - single row, smaller */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {rest.map((d, i) => (
          <motion.article
            key={d.op}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="hud-panel group flex flex-col"
          >
            <Stripe d={d} op={`OP.${String(i + 2).padStart(2, "0")}`} />
            <div className="relative overflow-hidden bg-panel-2 aspect-[16/10]">
              {d.image && !imgErr[d.op] ? (
                <>
                  <Image
                    src={d.image}
                    alt={d.brand}
                    fill
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                    className="object-cover grayscale contrast-110 opacity-55 group-hover:grayscale-0 group-hover:opacity-90 group-hover:scale-[1.03] transition-all duration-700"
                    onError={() => setImgErr((p) => ({ ...p, [d.op]: true }))}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void/90 to-void/20" />
                </>
              ) : (
                <div className="absolute inset-0 grid-bg opacity-40" />
              )}
              <div className="absolute bottom-2.5 left-3 right-3">
                <h3 className="font-head font-700 text-fg leading-none uppercase text-xl md:text-2xl">{d.brand}</h3>
                <p className="t-label !text-fg/70 mt-1">{d.theatre}</p>
              </div>
            </div>
            <div className="p-3.5 md:p-4 flex flex-col flex-1">
              <ul className="space-y-1.5 flex-1">
                {d.objectives.slice(0, 2).map((o, idx) => (
                  <li key={idx} className="obj-item font-mono text-[11px] md:text-xs text-fg/80 leading-relaxed">
                    {hl(o)}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-x-2.5 gap-y-1 mt-3 pt-2.5 border-t border-line">
                {d.tags.map((t) => (
                  <span key={t} className="t-label !text-muted">{t}</span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Additional ops - compact, no imagery */}
      <Reveal delay={0.1}>
        <div className="hud-panel mt-3 md:mt-4">
          <div className="flex items-center justify-between px-4 h-9 border-b border-line bg-panel-2/50">
            <span className="t-label text-tac">// ADDITIONAL OPS · ABRIDGED</span>
            <span className="t-label !text-muted hidden sm:inline">FILED FOR THE RECORD</span>
          </div>
          <ul className="divide-y divide-line">
            {additionalOps.map((a, i) => (
              <li
                key={a.op}
                className="grid grid-cols-12 gap-2 md:gap-5 px-4 py-3.5 group hover:bg-panel-2/30 transition-colors"
              >
                <div className="col-span-12 md:col-span-3 flex items-baseline gap-3 min-w-0">
                  <span className="font-mono text-[11px] text-tac shrink-0">OP.{String(deployments.length + i + 1).padStart(2, "0")}</span>
                  <span className="font-head font-600 text-base md:text-lg text-fg uppercase leading-tight group-hover:text-tac transition-colors">
                    {a.brand}
                  </span>
                </div>
                <p className="col-span-12 md:col-span-7 font-mono text-[11px] md:text-xs text-fg/75 leading-relaxed">
                  {hl(a.note)}
                </p>
                <div className="col-span-12 md:col-span-2 md:text-right">
                  <span className="t-label !text-muted">{a.clearance}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* Entry points to the full archive + gallery (open in a new tab) */}
      <Reveal delay={0.15}>
        <div className="mt-5 md:mt-6 flex flex-col sm:flex-row gap-3">
          <a
            href="/work"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2.5 bg-tac text-void px-5 py-3.5 font-mono text-xs md:text-sm uppercase tracking-wide font-700 hover:bg-fg transition-colors"
          >
            Open full campaign files
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          <a
            href="/gallery"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2.5 border border-line-bright px-5 py-3.5 font-mono text-xs md:text-sm uppercase tracking-wide text-fg hover:border-tac hover:text-tac transition-colors"
          >
            View photo gallery
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
