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
                <span className={`font-mono text-[11px] md:text-xs tracking-wide whitespace-nowrap transition-colors cursor-pointer ${active === i ? "text-fg" : i === 1 ? "text-fg" : i === 2 ? "text-tac" : "text-muted"} group-hover:text-fg`}>
                  {seg.label}
                </span>
              </button>
              {i < callsignSegments.length - 1 && (
                <span className="absolute -right-1.5 md:-right-2.5 top-1/2 -translate-y-1/2 text-dim text-[10px]">·</span>
              )}
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

      {/* Intel expand strip - full width, BELOW the bar and OUTSIDE the scroller so it never clips */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            key="intel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-line/60 bg-panel-2/70 backdrop-blur-md"
          >
            <div className="px-3 md:px-6 py-2.5 flex items-start gap-2.5">
              <span className="t-label text-tac shrink-0 mt-0.5">// INTEL</span>
              <p className="font-mono text-[11px] md:text-xs text-fg/85 leading-relaxed">
                {callsignSegments[active].intel}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
