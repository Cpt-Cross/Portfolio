"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import { allGalleryImages, getGallery, type WallImage } from "@/lib/work";
import { projects } from "@/lib/projects";
import { CampaignOverlay } from "@/components/work/CampaignOverlay";

// How long an order stays put across normal navigations before it reshuffles.
// A reload (F5 / Ctrl+F5) always reshuffles; soft navigations within this window
// keep the same order so it does not feel chaotic. Tune freely.
const RESHUFFLE_AFTER_MS = 30 * 60 * 1000; // 30 minutes
const SEED_KEY = "cc_gallery_seed";

const projectMap = new Map(projects.map((p) => [p.slug, p]));

// Small deterministic PRNG so a given seed always yields the same order.
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(arr: T[], rng: () => number): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function GalleryWall() {
  // Start in build order so the server HTML and first client render match,
  // then reorder once mounted.
  const [order, setOrder] = useState<WallImage[]>(() => allGalleryImages());
  const [open, setOpen] = useState<{ slug: string; index: number } | null>(null);

  useEffect(() => {
    const base = allGalleryImages();
    let seed = 0;
    let reshuffle = true;

    try {
      const nav = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
      const isReload = nav.length > 0 ? nav[0].type === "reload" : false;
      const raw = localStorage.getItem(SEED_KEY);
      const stored = raw ? (JSON.parse(raw) as { seed: number; t: number }) : null;
      const fresh =
        stored && typeof stored.seed === "number" && Date.now() - stored.t < RESHUFFLE_AFTER_MS;

      if (!isReload && fresh) {
        seed = stored!.seed;
        reshuffle = false;
      }
    } catch {
      // storage / timing unavailable — just make a fresh order this load
    }

    if (reshuffle) {
      seed = (Date.now() ^ Math.floor(Math.random() * 0xffffffff)) >>> 0;
      try {
        localStorage.setItem(SEED_KEY, JSON.stringify({ seed, t: Date.now() }));
      } catch {
        // ignore
      }
    }

    setOrder(shuffle(base, mulberry32(seed)));
  }, []);

  // URL reflection + deep link (#slug opens that campaign at its first image).
  const setHash = (slug: string | null) => {
    const b = window.location.pathname + window.location.search;
    window.history.replaceState(null, "", slug ? `${b}#${slug}` : b);
  };
  const openOverlay = (slug: string, index: number) => {
    setOpen({ slug, index });
    setHash(slug);
  };
  const closeOverlay = () => {
    setOpen(null);
    setHash(null);
  };

  useEffect(() => {
    const fromHash = () => {
      const slug = decodeURIComponent(window.location.hash.replace("#", ""));
      setOpen(projectMap.has(slug) ? { slug, index: 0 } : null);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const openProject = open ? projectMap.get(open.slug) ?? null : null;

  return (
    <>
      <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-2 md:gap-3">
        {order.map((img) => (
          <a
            key={`${img.slug}-${img.index}`}
            href={`/work#${img.slug}`}
            onClick={(e) => {
              // plain click opens the in-page overlay; middle/cmd-click still
              // follows the real link to /work for a new tab + crawlers.
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
              e.preventDefault();
              openOverlay(img.slug, img.index);
            }}
            aria-label={`Open ${img.title}`}
            className="group relative block mb-2 md:mb-3 break-inside-avoid overflow-hidden border border-transparent hover:border-tac/50 transition-colors cursor-pointer"
          >
            <Image
              src={img.thumb}
              alt={img.title}
              width={img.w}
              height={img.h}
              sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 20vw"
              className="w-full h-auto object-cover grayscale-[0.35] contrast-105 group-hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block">
              <span className="t-label !text-fg/90">{img.title}</span>
            </div>
          </a>
        ))}
      </div>

      <AnimatePresence>
        {openProject && open && (
          <CampaignOverlay
            key={openProject.slug}
            project={openProject}
            gallery={getGallery(openProject.slug)}
            initialIndex={open.index}
            onClose={closeOverlay}
          />
        )}
      </AnimatePresence>
    </>
  );
}
