"use client";

import { motion } from "framer-motion";
import { combatRecord } from "@/lib/data";
import { SectionLabel } from "./SectionLabel";

export function CombatRecord() {
  return (
    <section className="px-3 md:px-6 py-10 md:py-12">
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
            key={e.game}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="hud-panel p-4 md:p-5 flex flex-col gap-3 min-h-[120px] group"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-tac text-xs">{String(i + 1).padStart(2, "0")}</span>
              <span
                className={`t-label border px-2 py-1 ${
                  e.tier === "MIL-SIM" ? "!text-tac border-tac/40" : "!text-muted border-line-bright"
                }`}
              >
                {e.tier}
              </span>
            </div>
            <div className="mt-auto">
              <div className="font-head font-600 text-lg md:text-xl text-fg uppercase leading-tight group-hover:text-tac transition-colors">
                {e.game}
              </div>
              <div className="font-mono text-[11px] md:text-xs text-muted mt-1 leading-relaxed">{e.detail}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
