"use client";

import type { Project } from "@/lib/projects";
import { CollapsedInner } from "./cardParts";

// Desktop (multi-column) card. Deliberately a plain <article> with NO framer
// motion / layout animation, so opening a file never triggers a FLIP across the
// grid. The opened file is rendered as a separate height-animated panel injected
// after this card's row (see WorkArchive). That keeps desktop smooth.
export function DesktopCard({
  project: p,
  cover,
  active,
  onToggle,
}: {
  project: Project;
  cover: string | null;
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <article
      id={p.slug}
      onClick={onToggle}
      className={`hud-panel group scroll-mt-24 flex flex-col cursor-pointer transition-colors ${
        active ? "border-line-bright" : ""
      }`}
    >
      <CollapsedInner p={p} cover={cover} active={active} />
    </article>
  );
}
