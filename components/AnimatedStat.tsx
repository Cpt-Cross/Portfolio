"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

function parse(v: string) {
  // leading non-numeric prefix (e.g. "~"), the number, trailing suffix (e.g. "B+", "%")
  const m = v.match(/^([^\d.]*)([\d.]+)(.*)$/);
  if (!m) return { prefix: "", num: null as number | null, suffix: v, decimals: 0 };
  const numStr = m[2];
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  return { prefix: m[1], num: parseFloat(numStr), suffix: m[3], decimals };
}

/**
 * Counts a numeric stat up from zero the first time it enters view.
 * Initial (server) render shows the zero-state so hydration matches.
 */
export function AnimatedStat({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const { prefix, num, suffix, decimals } = parse(value);
  const [display, setDisplay] = useState(num === null ? value : `${prefix}0${suffix}`);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current || num === null) return;
    started.current = true;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(value);
      return;
    }

    const controls = animate(0, num, {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(`${prefix}${v.toFixed(decimals)}${suffix}`),
      onComplete: () => setDisplay(value),
    });
    return () => controls.stop();
  }, [inView, num]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
