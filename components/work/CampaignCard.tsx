"use client";

import type { Project } from "@/lib/projects";
import { CollapsedInner } from "./cardParts";

// Static grid card. No motion in the grid: clicking opens the campaign overlay,
// so the grid itself never reflows or animates. `active` brightens the card
// while its overlay is open.
export function CampaignCard({
  project: p,
  cover,
  active,
  onOpen,
}: {
  project: Project;
  cover: string | null;
  active: boolean;
  onOpen: () => void;
}) {
  return (
    <article
      id={p.slug}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Open ${p.client} file`}
      className={`hud-panel group scroll-mt-28 flex flex-col cursor-pointer transition-colors outline-none focus-visible:border-tac ${
        active ? "border-line-bright" : ""
      }`}
    >
      <CollapsedInner p={p} cover={cover} active={active} />
    </article>
  );
}
