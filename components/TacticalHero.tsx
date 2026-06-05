"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, ClipboardList, FileText, Radio } from "lucide-react";
import { profile, loadout } from "@/lib/data";
import { AnimatedStat } from "./AnimatedStat";
import { BrandMarquee } from "./BrandMarquee";

export function TacticalHero() {
  const ref = useRef<HTMLElement>(null);
  const [photoError, setPhotoError] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Scroll-reactive parallax
  const ghostX = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const ghostOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section ref={ref} className="relative grid-bg overflow-hidden">
      {/* Ghost watermark - oversized callsign, parallax */}
      <motion.div
        style={{ x: ghostX, opacity: ghostOpacity }}
        className="pointer-events-none absolute inset-0 flex items-center justify-end overflow-hidden"
      >
        <span className="ghost-text font-head font-700 text-[40vw] leading-none tracking-tightest whitespace-nowrap pr-[2vw]">
          CC
        </span>
      </motion.div>

      <div className="relative px-3 md:px-6 pt-7 md:pt-10 pb-0 flex flex-col md:min-h-[calc(100svh-2.75rem)]">
        {/* Top annotation row */}
        <div className="flex items-start justify-between gap-6">
          <span className="t-label text-tac">// FIELD OPERATOR</span>
          <div className="hidden md:block max-w-sm border-r border-line pr-4 text-right">
            <p className="t-label !text-muted leading-relaxed">
              SEVEN YEARS DEPLOYED ACROSS GAMING,<br />
              ESPORTS & LIVE ACTIVATIONS, OPERATING<br />
              REMOTE-FIRST, GLOBALLY.
            </p>
          </div>
        </div>

        {/* Main hero block */}
        <motion.div style={{ y: contentY }} className="py-7 md:py-9">
          <div className="hidden lg:grid lg:grid-cols-12 gap-7 lg:gap-6 items-center">
            {/* Left - identity */}
            <div className="lg:col-span-8">
              <div className="t-label text-muted mb-3 md:mb-4">{profile.taskforce} · DESIGNATION</div>
              <h1 className="font-head font-700 text-[15vw] sm:text-[13vw] lg:text-[7.5rem] xl:text-[8.5rem] leading-[0.82] tracking-tightest text-fg uppercase">
                {profile.name}
              </h1>
              <div className="mt-4 md:mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
                <span className="font-head font-600 text-2xl md:text-4xl text-tac tracking-tight">
                  // {profile.callsign}
                </span>
              </div>
              <p className="mt-4 md:mt-5 font-mono text-sm md:text-base text-muted">
                [ {profile.role.split(", ").join(" · ")} ]
              </p>
              <p className="mt-1 font-mono text-xs md:text-sm text-dim uppercase tracking-wide">{profile.field}</p>

              {/* CTAs */}
              <div className="mt-7 md:mt-8 flex flex-wrap gap-3">
                <a
                  href="#deployment"
                  className="group inline-flex items-center gap-2.5 bg-tac text-void px-5 py-3 font-mono text-xs md:text-sm uppercase tracking-wide font-700 hover:bg-fg transition-colors"
                >
                  View deployment log
                  <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
                </a>
                <a
                  href="#service"
                  className="group inline-flex items-center gap-2.5 border border-line-bright px-5 py-3 font-mono text-xs md:text-sm uppercase tracking-wide text-fg hover:border-tac hover:text-tac transition-colors"
                >
                  <ClipboardList className="w-4 h-4" />
                  View service record
                </a>
                <a
                  href="#comms"
                  className="group inline-flex items-center gap-2.5 border border-line-bright px-5 py-3 font-mono text-xs md:text-sm uppercase tracking-wide text-fg hover:border-tac hover:text-tac transition-colors"
                >
                  <Radio className="w-4 h-4" />
                  Establish contact
                </a>
                <a
                  href="/Aditya_Kumar_Resume_2026Q2.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 px-5 py-3 font-mono text-xs md:text-sm uppercase tracking-wide text-muted hover:text-fg transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  Dossier [PDF]
                </a>
              </div>
            </div>

            {/* Right - photo as blueprint card (height-capped so the hero fits one screen) */}
            <div className="lg:col-span-4">
              <motion.div
                style={{ y: photoY }}
                className="hud-panel relative group aspect-[4/5] lg:aspect-auto lg:h-[52vh]"
              >
                {!photoError ? (
                  <>
                    <Image
                      src={profile.photo}
                      alt={profile.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover grayscale contrast-110 opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                      onError={() => setPhotoError(true)}
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent" />
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-3 left-3 t-label text-tac">OPERATOR</div>
                      <div className="absolute top-3 right-3 t-label !text-fg/70">EST.2019</div>
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                        <span className="t-label !text-fg/70">{profile.coords}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-tac blink" />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="font-head font-700 text-5xl text-tac mb-2">CC</div>
                      <p className="t-label">DROP hero.jpg IN /public/images</p>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>

          {/* MOBILE hero - compact: smaller image beside the name, no endless scroll */}
          <div className="lg:hidden">
            <div className="t-label text-muted mb-3">{profile.taskforce} · DESIGNATION</div>
            <div className="flex items-start gap-4">
              <h1 className="min-w-0 flex-1 font-head font-700 text-5xl sm:text-6xl leading-[0.85] tracking-tightest text-fg uppercase">
                {profile.name}
              </h1>
              <div className="hud-panel relative shrink-0 w-[88px] sm:w-28 aspect-[3/4] overflow-hidden">
                {!photoError ? (
                  <>
                    <Image
                      src={profile.photo}
                      alt={profile.name}
                      fill
                      sizes="120px"
                      className="object-cover grayscale contrast-110 opacity-80"
                      onError={() => setPhotoError(true)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent" />
                    <div className="absolute bottom-1.5 left-1.5 right-1.5 flex items-center justify-between">
                      <span className="t-label !text-fg/70 !text-[8px]">EST.2019</span>
                      <span className="w-1 h-1 rounded-full bg-tac blink" />
                    </div>
                  </>
                ) : (
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="font-head font-700 text-3xl text-tac">CC</span>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-3 font-head font-600 text-2xl text-tac tracking-tight">// {profile.callsign}</div>
            <p className="mt-3 font-mono text-sm text-muted">[ {profile.role.split(", ").join(" · ")} ]</p>
            <p className="mt-1 font-mono text-xs text-dim uppercase tracking-wide">{profile.field}</p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              <a href="#deployment" className="group inline-flex items-center gap-2 bg-tac text-void px-4 py-2.5 font-mono text-xs uppercase tracking-wide font-700">
                Deployment log
                <ArrowDownRight className="w-4 h-4" />
              </a>
              <a href="#comms" className="inline-flex items-center gap-2 border border-line-bright px-4 py-2.5 font-mono text-xs uppercase tracking-wide text-fg">
                <Radio className="w-4 h-4" /> Contact
              </a>
              <a href="#service" className="inline-flex items-center gap-2 border border-line-bright px-4 py-2.5 font-mono text-xs uppercase tracking-wide text-fg">
                <ClipboardList className="w-4 h-4" /> Service record
              </a>
              <a href="/Aditya_Kumar_Resume_2026Q2.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 font-mono text-xs uppercase tracking-wide text-muted">
                <FileText className="w-4 h-4" /> Dossier [PDF]
              </a>
            </div>
          </div>
        </motion.div>

        {/* Stat cards - same HUD style as the rest of the site */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-4 pt-5 md:pt-6 border-t border-line">
          {loadout.map((l) => (
            <div key={l.label} className="hud-panel p-3 md:p-4">
              <div className="font-head font-700 text-2xl md:text-4xl text-tac leading-none">
                <AnimatedStat value={l.value} />
              </div>
              <div className="t-label mt-1.5">{l.label}</div>
              <div className="t-label !text-dim mt-1 hidden md:block">{l.sub}</div>
            </div>
          ))}
        </div>

        {/* Past affiliations - folded into the hero so it's visible without scrolling */}
        <div className="mt-5 md:mt-6">
          <span className="t-label text-tac">// PAST AFFILIATIONS</span>
        </div>
        <div className="-mx-3 md:-mx-6 mt-2">
          <BrandMarquee compact />
        </div>
      </div>
    </section>
  );
}
