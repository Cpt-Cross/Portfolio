"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { callsignSegments } from "@/lib/data";
import { LiveClock } from "./LiveClock";

export function CallsignBar() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="sticky top-0 z-40 border-b border-line bg-void/85 backdrop-blur-md">
      <div className="px-3 md:px-6 h-10 md:h-11 flex items-center justify-between">
        {/* Segments */}
        <div className="flex items-center gap-2 md:gap-4 overflow-x-auto no-scrollbar">
          {callsignSegments.map((seg, i) => (
            <div
              key={i}
              className="relative shrink-0"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onClick={() => setActive(active === i ? null : i)}
            >
              <button className="flex items-center gap-2 group">
                {i === 2 && (
                  <span className="w-1.5 h-1.5 rounded-full bg-tac blink shrink-0" />
                )}
                <span className={`font-mono text-[11px] md:text-xs tracking-wide whitespace-nowrap transition-colors cursor-help ${i === 1 ? "text-fg" : i === 2 ? "text-tac" : "text-muted"} group-hover:text-fg`}>
                  {seg.label}
                </span>
              </button>
              {i < callsignSegments.length - 1 && (
                <span className="absolute -right-1.5 md:-right-2.5 top-1/2 -translate-y-1/2 text-dim text-[10px]">·</span>
              )}

              {/* Intel popout */}
              <AnimatePresence>
                {active === i && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-0 top-full mt-2 w-56 md:w-64 z-50"
                  >
                    <div className="hud-panel bg-panel-2 p-3">
                      <div className="t-label text-tac mb-1.5">// INTEL</div>
                      <p className="font-mono text-[11px] text-fg/85 leading-relaxed">{seg.intel}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Right - live local time + availability */}
        <div className="hidden md:flex items-center gap-2.5 shrink-0">
          <span className="t-label !text-muted">DELHI</span>
          <span className="font-mono text-xs text-fg/80"><LiveClock /></span>
          <span className="text-dim text-[11px]">·</span>
          <span className="t-label">CLEARED FOR DEPLOYMENT</span>
          <span className="w-1.5 h-1.5 rounded-full bg-tac blink" />
        </div>
      </div>
    </div>
  );
}
