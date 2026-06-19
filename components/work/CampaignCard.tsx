"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Plus, X } from "lucide-react";
import type { Project } from "@/lib/projects";
import type { GalleryEntry } from "@/lib/galleries.generated";
import { Carousel } from "./Carousel";

// highlight numeric tokens in green (skips 4-digit years)
function hl(text: string) {
  return text.split(/(\d[\d,]*(?:\.\d+)?(?:K|M|B)?\+?%?)/g).map((part, i) =>
    /^\d/.test(part) && !/^(?:19|20)\d{2}$/.test(part) ? (
      <span key={i} className="text-tac">
        {part}
      </span>
    ) : (
      part
    )
  );
}

const StatusTag = ({ status }: { status: Project["status"] }) => (
  <span className={`t-label ${status === "ONGOING" ? "!text-tac" : "!text-muted"}`}>
    {status === "ONGOING" ? "\u25CF ACTIVE" : "\u2713 COMPLETE"}
  </span>
);

type Props = {
  project: Project;
  gallery?: GalleryEntry;
  cover: string | null;
  expanded: boolean;
  onToggle: () => void;
};

export function CampaignCard({ project: p, gallery, cover, expanded, onToggle }: Props) {
  if (expanded) {
    return (
      <motion.article
        layout
        id={p.slug}
        className="hud-panel scroll-mt-24 sm:col-span-2 lg:col-span-3 border-line-bright"
      >
        {/* Header (click to close) */}
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between px-4 h-10 border-b border-line bg-panel-2/60 text-left"
          aria-expanded
        >
          <div className="flex items-center gap-3 min-w-0">
            <span className="font-mono text-[11px] text-tac shrink-0">{p.op}</span>
            <span className="t-label !text-fg/80 truncate">{p.client}</span>
            <span className="t-label !text-dim hidden sm:inline truncate">// {p.theatre}</span>
          </div>
          <span className="flex items-center gap-2 shrink-0">
            <StatusTag status={p.status} />
            <span className="t-label !text-muted hidden sm:flex items-center gap-1 hover:!text-tac">
              CLOSE <X className="w-3.5 h-3.5" />
            </span>
            <X className="w-4 h-4 text-muted sm:hidden" />
          </span>
        </button>

        <div className="p-4 md:p-5 grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
          {/* Left: the file */}
          <div className="order-2 lg:order-1 flex flex-col">
            <h3 className="font-head font-700 text-fg leading-none uppercase text-3xl md:text-4xl">
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

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2.5 mt-5">
              {p.stats.map((s) => (
                <div key={s.label} className="hud-panel p-2.5 md:p-3">
                  <div className="font-head font-700 text-xl md:text-2xl text-tac leading-none">
                    {s.value}
                  </div>
                  <div className="t-label mt-1.5 leading-tight">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-x-3 gap-y-1.5 mt-5 pt-3 border-t border-line">
              {p.tags.map((t) => (
                <span key={t} className="t-label !text-muted">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right: gallery */}
          <div className="order-1 lg:order-2">
            {gallery && gallery.images.length > 0 ? (
              <Carousel images={gallery.images} title={p.title} />
            ) : (
              <div className="hud-panel grid-bg aspect-[16/10] grid place-items-center">
                <span className="t-label">NO IMAGERY FILED</span>
              </div>
            )}
          </div>
        </div>
      </motion.article>
    );
  }

  // Collapsed card
  return (
    <motion.article
      layout
      id={p.slug}
      onClick={onToggle}
      className="hud-panel group scroll-mt-24 flex flex-col cursor-pointer"
    >
      <div className="flex items-center justify-between px-4 h-9 border-b border-line bg-panel-2/50">
        <div className="flex items-center gap-3 min-w-0">
          <span className="font-mono text-[11px] text-tac shrink-0">{p.op}</span>
          <span className="t-label !text-fg/80 truncate">{p.year}</span>
        </div>
        <StatusTag status={p.status} />
      </div>

      <div className="relative overflow-hidden bg-panel-2 aspect-[16/10]">
        {cover ? (
          <>
            <Image
              src={cover}
              alt={p.client}
              fill
              sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
              className="object-cover grayscale contrast-110 opacity-55 group-hover:grayscale-0 group-hover:opacity-90 group-hover:scale-[1.03] transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void/90 to-void/20" />
          </>
        ) : (
          <div className="absolute inset-0 grid-bg opacity-40" />
        )}
        <div className="absolute bottom-2.5 left-3 right-3">
          <h3 className="font-head font-700 text-fg leading-none uppercase text-xl md:text-2xl">
            {p.client}
          </h3>
          <p className="t-label !text-fg/70 mt-1">{p.theatre}</p>
        </div>
      </div>

      <div className="p-3.5 md:p-4 flex flex-col flex-1">
        <p className="font-mono text-[11px] md:text-xs text-fg/75 leading-relaxed flex-1">
          {hl(p.oneLine)}
        </p>
        <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-line">
          <div className="flex flex-wrap gap-x-2.5 gap-y-1">
            {p.stats.slice(0, 2).map((s) => (
              <span key={s.label} className="t-label !text-muted">
                <span className="text-tac">{s.value}</span> {s.label}
              </span>
            ))}
          </div>
          <span className="t-label !text-muted flex items-center gap-1 group-hover:!text-tac transition-colors shrink-0">
            OPEN FILE <Plus className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </motion.article>
  );
}
