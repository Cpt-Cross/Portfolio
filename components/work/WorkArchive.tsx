"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { projects, abridgedOps, WORK_CATEGORIES } from "@/lib/projects";
import { coverFor, getGallery } from "@/lib/work";
import { CampaignCard } from "./CampaignCard";

type Sort = "brand" | "newest" | "oldest" | "footfall";
const SORTS: { id: Sort; label: string }[] = [
  { id: "newest", label: "Newest" },
  { id: "oldest", label: "Oldest" },
  { id: "brand", label: "Brand A-Z" },
  { id: "footfall", label: "Footfall" },
];

const slugSet = new Set(projects.map((p) => p.slug));

export function WorkArchive() {
  const [sort, setSort] = useState<Sort>("newest");
  const [category, setCategory] = useState<string | null>(null);
  const [open, setOpen] = useState<string | null>(null);
  const pendingScroll = useRef<string | null>(null);

  const list = useMemo(() => {
    const arr = projects.filter((p) => !category || p.categories.includes(category));
    const out = [...arr];
    if (sort === "brand") out.sort((a, b) => a.client.localeCompare(b.client) || a.title.localeCompare(b.title));
    else if (sort === "newest") out.sort((a, b) => b.date.localeCompare(a.date));
    else if (sort === "oldest") out.sort((a, b) => a.date.localeCompare(b.date));
    else if (sort === "footfall") out.sort((a, b) => (b.footfall || 0) - (a.footfall || 0));
    return out;
  }, [sort, category]);

  const scrollTo = (slug: string) => {
    requestAnimationFrame(() => {
      setTimeout(() => {
        document.getElementById(slug)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 70);
    });
  };

  const toggle = (slug: string) => {
    setOpen((cur) => {
      const next = cur === slug ? null : slug;
      if (next) scrollTo(next);
      return next;
    });
  };

  // Deep link: /work#<slug> opens that campaign on load (and on hash change).
  useEffect(() => {
    const fromHash = () => {
      const slug = decodeURIComponent(window.location.hash.replace("#", ""));
      if (slugSet.has(slug)) {
        setCategory(null); // make sure it is visible
        setOpen(slug);
        pendingScroll.current = slug;
      }
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  // Run a pending deep-link scroll once the card is in the DOM.
  useEffect(() => {
    if (pendingScroll.current && open === pendingScroll.current) {
      scrollTo(pendingScroll.current);
      pendingScroll.current = null;
    }
  }, [open]);

  const pillBase =
    "shrink-0 px-2.5 py-1 border font-mono text-[10px] md:text-[11px] uppercase tracking-wide transition-colors";
  const on = "border-tac text-tac bg-tac/5";
  const off = "border-line text-muted hover:text-fg hover:border-line-bright";

  return (
    <div>
      {/* Sticky sort + filter toolbar (one scrollable row, stays under the nav) */}
      <div className="sticky top-11 z-40 bg-void/95 backdrop-blur-sm border-b border-line">
        <div className="px-3 md:px-6 py-2.5 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="t-label shrink-0 mr-0.5">SORT</span>
          {SORTS.map((s) => (
            <button key={s.id} onClick={() => setSort(s.id)} className={`${pillBase} ${sort === s.id ? on : off}`}>
              {s.label}
            </button>
          ))}
          <span className="w-px h-5 bg-line-bright shrink-0 mx-1.5" aria-hidden />
          <span className="t-label shrink-0 mr-0.5">FILTER</span>
          <button onClick={() => setCategory(null)} className={`${pillBase} ${category === null ? on : off}`}>
            All
          </button>
          {WORK_CATEGORIES.map((c) => (
            <button key={c} onClick={() => setCategory(c)} className={`${pillBase} ${category === c ? on : off}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="px-3 md:px-6 py-5 md:py-6">
        <div className="t-label mb-4">
          {list.length} OF {projects.length} FILES{category ? ` // ${category.toUpperCase()}` : ""}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 grid-flow-row-dense">
          {list.map((p) => (
            <CampaignCard
              key={p.slug}
              project={p}
              gallery={getGallery(p.slug)}
              cover={coverFor(p)}
              expanded={open === p.slug}
              onToggle={() => toggle(p.slug)}
            />
          ))}
        </div>

        {/* Abridged ops, no imagery */}
        <div className="hud-panel mt-3 md:mt-4">
          <div className="flex items-center justify-between px-4 h-9 border-b border-line bg-panel-2/50">
            <span className="t-label text-tac">// ADDITIONAL OPS · ABRIDGED</span>
            <span className="t-label !text-muted hidden sm:inline">FILED FOR THE RECORD</span>
          </div>
          <ul className="divide-y divide-line">
            {abridgedOps.map((a) => (
              <li
                key={a.op}
                className="grid grid-cols-12 gap-2 md:gap-5 px-4 py-3.5 group hover:bg-panel-2/30 transition-colors"
              >
                <div className="col-span-12 md:col-span-3 flex items-baseline gap-3 min-w-0">
                  <span className="font-mono text-[11px] text-tac shrink-0">{a.op}</span>
                  <span className="font-head font-600 text-base md:text-lg text-fg uppercase leading-tight group-hover:text-tac transition-colors">
                    {a.brand}
                  </span>
                </div>
                <p className="col-span-12 md:col-span-7 font-mono text-[11px] md:text-xs text-fg/75 leading-relaxed">
                  {a.note}
                </p>
                <div className="col-span-12 md:col-span-2 md:text-right">
                  <span className="t-label !text-muted">{a.clearance}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
