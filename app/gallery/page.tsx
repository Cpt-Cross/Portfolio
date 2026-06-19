import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { GalleryWall } from "@/components/gallery/GalleryWall";

export const metadata: Metadata = {
  title: "Gallery · Captain Cross",
  description: "Every campaign photo in one wall. Tap any image to open its campaign file.",
};

export default function GalleryPage() {
  return (
    <>
      <SiteNav />
      <main className="relative">
        <section className="px-3 md:px-6 pt-6 md:pt-7 pb-4">
          <div className="t-label text-tac mb-2">// GALLERY</div>
          <h1 className="font-head font-700 text-3xl md:text-5xl uppercase tracking-tightest text-fg leading-none">
            Gallery
          </h1>
          <p className="font-mono text-xs md:text-sm text-muted mt-2">
            Every campaign photo in one wall. Tap any image to open its file.
          </p>
        </section>

        <div className="px-3 md:px-6 pb-10">
          <GalleryWall />
        </div>

        <footer className="px-3 md:px-6 py-8 border-t border-line grid-bg">
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 border border-line-bright px-5 py-3 font-mono text-xs md:text-sm uppercase tracking-wide text-fg hover:border-tac hover:text-tac transition-colors w-fit"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to base
          </Link>
        </footer>
      </main>
    </>
  );
}
