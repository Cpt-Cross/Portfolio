"use client";

import Image from "next/image";
import { Plus, Minus } from "lucide-react";
import type { Project } from "@/lib/projects";

// highlight numeric tokens in green (skips 4-digit years)
export function hl(text: string) {
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

export const StatusTag = ({ status }: { status: Project["status"] }) => (
  <span className={`t-label ${status === "ONGOING" ? "!text-tac" : "!text-muted"}`}>
    {status === "ONGOING" ? "\u25CF ACTIVE" : "\u2713 COMPLETE"}
  </span>
);

// Inner content of a campaign card (stripe + cover + body). `active` flips the
// bottom hint and pairs with a brighter border on the wrapper while its overlay
// is open.
export function CollapsedInner({
  p,
  cover,
  active = false,
}: {
  p: Project;
  cover: string | null;
  active?: boolean;
}) {
  return (
    <>
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
            {active ? (
              <>
                CLOSE <Minus className="w-3.5 h-3.5" />
              </>
            ) : (
              <>
                OPEN FILE <Plus className="w-3.5 h-3.5" />
              </>
            )}
          </span>
        </div>
      </div>
    </>
  );
}
