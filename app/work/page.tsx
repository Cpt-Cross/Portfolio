import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Radio } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { SectionLabel } from "@/components/SectionLabel";
import { WorkArchive } from "@/components/work/WorkArchive";

export const metadata: Metadata = {
  title: "Campaigns · Captain Cross",
  description:
    "Client campaigns run across gaming, esports, cosplay, and creator marketing, with photos, scope, and results. Samsung, AMD, Riot Games, Lenovo, Garena, and more.",
};

export default function WorkPage() {
  return (
    <>
      <SiteNav />
      <main className="relative">
        <section className="px-3 md:px-6 pt-6 md:pt-8 pb-1">
          <SectionLabel
            index="01"
            code="CAMPAIGN-FILES"
            title="Campaigns"
            annotation="EVERY CLIENT OP ON RECORD. SORT, FILTER, OPEN A FILE."
          />
          <p className="font-mono text-xs md:text-sm text-muted max-w-2xl -mt-3 md:-mt-4">
            Client campaigns I have run across gaming, esports, cosplay, and creator marketing. Tap any card to open
            the full file with photos, scope, and results.
          </p>
        </section>

        <WorkArchive />

        <footer className="px-3 md:px-6 py-8 border-t border-line grid-bg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <Link
              href="/"
              className="group inline-flex items-center gap-2.5 border border-line-bright px-5 py-3 font-mono text-xs md:text-sm uppercase tracking-wide text-fg hover:border-tac hover:text-tac transition-colors w-fit"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              Back to base
            </Link>
            <Link
              href="/connect"
              className="group inline-flex items-center gap-2.5 px-5 py-3 font-mono text-xs md:text-sm uppercase tracking-wide text-muted hover:text-tac transition-colors w-fit"
            >
              <Radio className="w-4 h-4" />
              Establish contact
            </Link>
          </div>
        </footer>
      </main>
    </>
  );
}
