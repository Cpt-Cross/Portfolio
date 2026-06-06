"use client";

import { motion } from "framer-motion";
import { combatRecord } from "@/lib/data";
import { SectionLabel } from "./SectionLabel";

export function CombatRecord() {
  return (
    <section className="px-3 md:px-6 py-5 md:py-6">
      <SectionLabel
        index="04"
        code="COMBAT-RECORD"
        title="Combat record"
        annotation="PERSONAL · PROOF THE OPERATOR LIVES IN-THEATRE."
      />

      {/* Single line on desktop: 4 across */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {combatRecord.entries.map((e, i) => (
          <motion.div
            key={e.category}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="hud-panel p-4 md:p-5 flex flex-col gap-2.5 group"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-tac text-xs">{String(i + 1).padStart(2, "0")}</span>
              <span className="t-label border px-2 py-1 !text-muted border-line-bright">{e.tier}</span>
            </div>
            <div className="flex items-start justify-between gap-3 mt-0.5">
              <div className="min-w-0 flex-1">
                <div className="font-head font-600 text-base md:text-lg text-fg uppercase leading-tight group-hover:text-tac transition-colors">
                  {e.category}
                </div>
                <div className="font-mono text-[11px] md:text-xs text-muted mt-1.5 leading-relaxed">{e.games}</div>
              </div>
              <div className="flex flex-col items-end shrink-0">
                <span className="font-head font-700 text-2xl md:text-3xl text-tac leading-none">{e.hours}</span>
                <span className="t-label !text-tac/70 mt-1">HRS</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
