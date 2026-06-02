"use client";
import { motion } from "framer-motion";
import { ScrambleText } from "./ScrambleText";

type Props = {
  index: string;       // e.g. "02"
  code: string;        // e.g. "DEPLOYMENT-LOG"
  title: string;       // e.g. "Deployment log"
  annotation?: string; // right-side technical note
};

export function SectionLabel({ index, code, title, annotation }: Props) {
  return (
    <div className="relative mb-8 md:mb-10">
      {/* top rule + scan */}
      <div className="relative h-px bg-line mb-5 overflow-hidden">
        <motion.div
          initial={{ x: "-100%" }}
          whileInView={{ x: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="scan-line"
        />
      </div>

      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div className="flex items-baseline gap-4 md:gap-6">
          <span className="font-mono text-tac text-xs md:text-sm">[{index}]</span>
          <div>
            <div className="t-label text-tac mb-1.5">{code}</div>
            <h2 className="font-head font-700 text-3xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tightest text-fg uppercase">
              <ScrambleText text={title} />
            </h2>
          </div>
        </div>
        {annotation && (
          <p className="t-label !text-muted max-w-xs md:text-right leading-relaxed border-l md:border-l-0 md:border-r border-line pl-3 md:pl-0 md:pr-3">
            {annotation}
          </p>
        )}
      </div>
    </div>
  );
}
