"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\<>[]{}#*+=";

/**
 * Decrypt-on-reveal text. Renders the real text on the server (no hydration
 * mismatch, fully accessible/SEO-safe), then scrambles → resolves the first
 * time it scrolls into view. No-ops under prefers-reduced-motion.
 */
export function ScrambleText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(text);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(text);
      return;
    }

    const total = text.length;
    const speed = 2; // frames before a character locks
    let frame = 0;

    const id = setInterval(() => {
      frame++;
      const revealed = Math.floor(frame / speed);
      const out = text
        .split("")
        .map((ch, i) => {
          if (ch === " ") return " ";
          if (i < revealed) return text[i];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");
      setDisplay(out);
      if (revealed >= total) {
        clearInterval(id);
        setDisplay(text);
      }
    }, 26);

    return () => clearInterval(id);
  }, [inView, text]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {display}
    </span>
  );
}
