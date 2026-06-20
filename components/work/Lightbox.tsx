"use client";

import { useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryImage } from "@/lib/galleries.generated";

type Props = {
  images: GalleryImage[];
  index: number;
  title: string;
  onIndex: (i: number) => void;
  onClose: () => void;
};

export function Lightbox({ images, index, title, onIndex, onClose }: Props) {
  const count = images.length;
  const go = useCallback(
    (dir: number) => onIndex((index + dir + count) % count),
    [index, count, onIndex]
  );

  // Keyboard: arrows navigate, Escape closes.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  // Lock background scroll while open.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Swipe on touch.
  let startX = 0;
  const onTouchStart = (e: React.TouchEvent) => {
    startX = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 45) go(dx < 0 ? 1 : -1);
  };

  const img = images[index];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[200] bg-void/95 scanlines flex flex-col"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} gallery, image ${index + 1} of ${count}`}
    >
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-4 md:px-6 h-12 shrink-0 border-b border-line/60"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-baseline gap-3 min-w-0">
          <span className="font-mono text-[11px] text-tac shrink-0">
            {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
          <span className="t-label !text-fg/70 truncate">{title}</span>
        </div>
        <button
          onClick={onClose}
          aria-label="Close"
          className="text-muted hover:text-tac transition-colors p-1"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Stage */}
      <div
        className="relative flex-1 min-h-0"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-0 p-3 md:p-6"
          >
            <div className="relative w-full h-full">
              <Image
                src={img.full}
                alt={`${title} ${index + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {count > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              aria-label="Previous image"
              className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 items-center justify-center w-11 h-11 border border-line-bright bg-void/70 text-fg hover:border-tac hover:text-tac transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next image"
              className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 items-center justify-center w-11 h-11 border border-line-bright bg-void/70 text-fg hover:border-tac hover:text-tac transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Bottom dots (mobile-friendly) */}
      {count > 1 && (
        <div
          className="flex items-center justify-center gap-1.5 h-10 shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => onIndex(i)}
              aria-label={`Go to image ${i + 1}`}
              className={`h-1 transition-all ${i === index ? "w-6 bg-tac" : "w-2.5 bg-line-bright"}`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
