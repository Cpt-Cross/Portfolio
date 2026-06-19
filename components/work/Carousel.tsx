"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import type { GalleryImage } from "@/lib/galleries.generated";
import { Lightbox } from "./Lightbox";

export function Carousel({ images, title }: { images: GalleryImage[]; title: string }) {
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const count = images.length;

  const go = (dir: number) => setIndex((i) => (i + dir + count) % count);

  // Preload the neighbours so navigation feels instant.
  useEffect(() => {
    if (count < 2) return;
    [(index + 1) % count, (index - 1 + count) % count].forEach((i) => {
      const im = new window.Image();
      im.src = images[i].full;
    });
  }, [index, count, images]);

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
  const single = count < 2;

  return (
    <div>
      <div className="hud-panel relative bg-void">
        {/* Stage */}
        <div
          className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden cursor-zoom-in"
          onClick={() => setZoom(true)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          role="button"
          aria-label="Open full-size image"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-0"
            >
              <Image
                src={img.full}
                alt={`${title} ${index + 1}`}
                fill
                sizes="(max-width:1024px) 100vw, 60vw"
                className="object-contain"
              />
            </motion.div>
          </AnimatePresence>

          {/* faint scan sweep on change (off under reduced-motion via globals) */}
          <span key={`sweep-${index}`} className="cc-avatar-scan opacity-40" aria-hidden />

          {/* counter + zoom hint */}
          <div className="absolute top-2.5 left-3 font-mono text-[11px] text-tac bg-void/60 px-1.5 py-0.5">
            {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </div>
          <div className="absolute top-2.5 right-3 text-fg/60">
            <Maximize2 className="w-4 h-4" />
          </div>

          {/* desktop arrows */}
          {!single && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
                aria-label="Previous image"
                className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 items-center justify-center w-10 h-10 border border-line-bright bg-void/70 text-fg hover:border-tac hover:text-tac transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
                aria-label="Next image"
                className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 items-center justify-center w-10 h-10 border border-line-bright bg-void/70 text-fg hover:border-tac hover:text-tac transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* mobile dots */}
          {!single && (
            <div className="md:hidden absolute bottom-2.5 left-0 right-0 flex items-center justify-center gap-1.5">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={`h-1 transition-all ${i === index ? "w-5 bg-tac" : "w-2 bg-fg/40"}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* desktop filmstrip */}
      {!single && (
        <div className="hidden md:flex gap-2 mt-2 overflow-x-auto no-scrollbar">
          {images.map((im, i) => (
            <button
              key={im.thumb}
              onClick={() => setIndex(i)}
              aria-label={`View image ${i + 1}`}
              className={`relative shrink-0 w-20 h-14 overflow-hidden border transition-colors ${
                i === index ? "border-tac" : "border-line hover:border-line-bright"
              }`}
            >
              <Image
                src={im.thumb}
                alt={`${title} thumbnail ${i + 1}`}
                fill
                sizes="80px"
                className={`object-cover transition-opacity ${i === index ? "opacity-100" : "opacity-55 hover:opacity-85"}`}
              />
            </button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {zoom && (
          <Lightbox
            images={images}
            index={index}
            title={title}
            onIndex={setIndex}
            onClose={() => setZoom(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
