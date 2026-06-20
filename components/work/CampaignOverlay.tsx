"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import type { Project } from "@/lib/projects";
import type { GalleryEntry } from "@/lib/galleries.generated";
import { Carousel } from "./Carousel";
import { hl, StatusTag } from "./cardParts";

// Instagram-style modal for a single campaign. The grid behind it never moves,
// so opening a file does not reflow anything (no jank). Image-dominant on the
// left, brief + stats on the right. Tactical entrance + one-shot scan sweep.
export function CampaignOverlay({
  project: p,
  gallery,
  initialIndex = 0,
  onClose,
}: {
  project: Project;
  gallery?: GalleryEntry;
  initialIndex?: number;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  // Lock body scroll while open, compensating for the scrollbar so content
  // behind does not shift when it disappears (a source of the open-jump).
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    const prevPad = document.body.style.paddingRight;
    const sbw = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (sbw > 0) document.body.style.paddingRight = `${sbw}px`;
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPad;
    };
  }, []);

  // Esc to close.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Move focus into the dialog, restore it on close.
  useEffect(() => {
    const prevFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => prevFocused?.focus?.();
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-4 md:p-8 bg-void/90"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.16, ease: "linear" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${p.client}: ${p.title}`}
    >
      <motion.div
        className="relative w-[96vw] max-w-[1080px] max-h-[90vh] bg-void hud-panel border-line-bright overflow-hidden flex flex-col"
        style={{ willChange: "transform, opacity" }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="cc-panel-scan" aria-hidden />

        {/* Header */}
        <div className="flex items-center justify-between px-4 h-11 border-b border-line bg-panel-2/60 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <span className="font-mono text-[11px] text-tac shrink-0">{p.op}</span>
            <span className="t-label !text-fg/80 truncate">{p.client}</span>
            <span className="t-label !text-dim hidden sm:inline truncate">// {p.theatre}</span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <StatusTag status={p.status} />
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Close"
              className="flex items-center gap-1 t-label !text-muted hover:!text-tac transition-colors outline-none focus-visible:!text-tac"
            >
              <span className="hidden sm:inline">CLOSE</span> <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Body: image-dominant left, details right (stacks on mobile) */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] overflow-y-auto lg:overflow-hidden">
          {/* Image */}
          <div className="bg-void p-3 lg:p-4 lg:min-h-0 lg:overflow-hidden flex items-center justify-center">
            {gallery && gallery.images.length > 0 ? (
              <div className="w-full">
                <Carousel images={gallery.images} title={p.title} initialIndex={initialIndex} />
              </div>
            ) : (
              <div className="hud-panel grid-bg aspect-[16/10] w-full grid place-items-center">
                <span className="t-label">NO IMAGERY FILED</span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="p-4 lg:p-5 lg:min-h-0 lg:overflow-y-auto border-t lg:border-t-0 lg:border-l border-line">
            <h3 className="font-head font-700 text-fg leading-none uppercase text-2xl md:text-3xl">
              {p.title}
            </h3>
            <p className="t-label !text-muted mt-2">
              {p.role} · {p.year}
            </p>

            <div className="t-label text-tac mt-5 mb-2.5">// BRIEF</div>
            <ul className="space-y-2">
              {p.summary.map((s, i) => (
                <li key={i} className="obj-item font-mono text-xs md:text-sm text-fg/80 leading-relaxed">
                  {hl(s)}
                </li>
              ))}
            </ul>

            {p.stats.length > 0 && (
              <div
                className={`grid gap-2 mt-5 ${
                  p.stats.length >= 3
                    ? "grid-cols-3"
                    : p.stats.length === 2
                    ? "grid-cols-2"
                    : "grid-cols-1"
                }`}
              >
                {p.stats.map((s) => (
                  <div key={s.label} className="hud-panel p-2.5 min-w-0 overflow-hidden">
                    <div className="font-head font-700 text-xl text-tac leading-none">{s.value}</div>
                    <div className="t-label mt-1.5 leading-tight break-words">{s.label}</div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-x-3 gap-y-1.5 mt-5 pt-3 border-t border-line">
              {p.tags.map((t) => (
                <span key={t} className="t-label !text-muted">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
