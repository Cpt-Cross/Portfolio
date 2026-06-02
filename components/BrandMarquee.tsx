"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useAnimationFrame, wrap } from "framer-motion";
import { affiliations } from "@/lib/data";

export function BrandMarquee({ compact = false }: { compact?: boolean }) {
  const baseX = useMotionValue(0);
  const innerRef = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!innerRef.current) return;
    const update = () => innerRef.current && setW(innerRef.current.scrollWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(innerRef.current);
    return () => ro.disconnect();
  }, []);

  useAnimationFrame((_, delta) => {
    if (paused || w === 0) return;
    baseX.set(wrap(-w, 0, baseX.get() - 40 * (delta / 1000)));
  });

  return (
    <div
      className={`overflow-hidden bg-panel/30 border-line ${compact ? "border-y py-4 md:py-6" : "border-y py-5 md:py-7"}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div className="flex shrink-0 whitespace-nowrap" style={{ x: baseX }}>
        {[0, 1, 2, 3].map((c) => (
          <div key={c} ref={c === 0 ? innerRef : undefined} aria-hidden={c !== 0} className="flex shrink-0 items-center">
            {affiliations.map((b, i) => (
              <span key={i} className="flex items-center">
                <span
                  className={`font-head font-600 text-fg/55 hover:text-tac transition-colors uppercase tracking-tight ${
                    compact ? "text-2xl md:text-4xl px-6 md:px-9" : "text-3xl md:text-5xl px-6 md:px-9"
                  }`}
                >
                  {b}
                </span>
                <span className="text-tac/40 text-2xl">/</span>
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
