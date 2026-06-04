"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tv, Play, Zap, Film, Camera, Users, Briefcase, Palette, FileText,
  ArrowUpRight, Radio, Crosshair,
} from "lucide-react";
import { LiveClock } from "./LiveClock";
import { ScrambleText } from "./ScrambleText";

const broadcast = [
  { key: "twitch", name: "TWITCH", tag: "LIVE OPS", href: "/twitch", sub: "twitch.tv/captaincrosstv", Icon: Tv,
    thumb: "https://static-cdn.jtvnw.net/previews-ttv/live_user_captaincrosstv-440x248.jpg" },
  { key: "yt", name: "YOUTUBE", tag: "MAIN CHANNEL", href: "/yt", sub: "youtube.com/@CaptainCross", Icon: Play,
    thumb: "/api/yt-thumb/main" },
] as const;

const channels = [
  { name: "KICK", tag: "LIVE OPS // ALT", href: "/kick", sub: "kick.com/captaincrosstv", Icon: Zap },
  { name: "YOUTUBE", tag: "VOD ARCHIVE", href: "/vods", sub: "stream highlights channel", Icon: Film },
  { name: "INSTAGRAM", tag: "FIELD MEDIA", href: "/ig", sub: "@cpt.cross", Icon: Camera },
  { name: "DISCORD", tag: "SQUAD COMMS", href: "/discord", sub: "join the server", Icon: Users },
  { name: "LINKEDIN", tag: "SERVICE RECORD", href: "/linkedin", sub: "in/captaincross", Icon: Briefcase },
  { name: "BEHANCE", tag: "DESIGN PORTFOLIO", href: "/behance", sub: "behance.net/captaincross", Icon: Palette },
  { name: "DOSSIER", tag: "RESUME // PDF", href: "/cv", sub: "download CV", Icon: FileText },
] as const;

function BootSequence({ onDone }: { onDone: () => void }) {
  const steps = ["ESTABLISHING UPLINK", "AUTHENTICATING OPERATOR", "DECRYPTING CHANNELS"];
  const [done, setDone] = useState(0);
  const [granted, setGranted] = useState(false);
  useEffect(() => {
    const t = steps.map((_, i) => setTimeout(() => setDone(i + 1), 240 * (i + 1)));
    const g = setTimeout(() => setGranted(true), 240 * steps.length + 180);
    const f = setTimeout(onDone, 240 * steps.length + 820);
    return () => { t.forEach(clearTimeout); clearTimeout(g); clearTimeout(f); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <motion.div
      initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
      className="grid-bg fixed inset-0 z-[60] flex flex-col items-center justify-center bg-void px-6"
    >
      <div className="w-full max-w-sm">
        <div className="t-label mb-4 text-tac">// CAPTAIN CROSS · COMMS UPLINK</div>
        <div className="space-y-1.5 font-mono text-[12px]">
          {steps.map((s, i) => (
            <div key={s} className={`flex items-center justify-between transition-opacity ${i < done ? "opacity-100" : "opacity-25"}`}>
              <span className="text-muted">&gt; {s}</span>
              <span className={i < done ? "text-tac" : "text-dim"}>{i < done ? "OK" : "··"}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 h-px w-full bg-line">
          <motion.div className="h-px bg-tac" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 0.95, ease: "easeInOut" }} />
        </div>
        <div className="mt-4 h-5 font-head text-sm tracking-wide2 text-tac">
          {granted && <span className="blink">ACCESS GRANTED</span>}
        </div>
      </div>
      <button onClick={onDone} className="t-label absolute bottom-6 right-6 text-dim transition-colors hover:text-fg">SKIP ▸</button>
    </motion.div>
  );
}

function Reticle() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let raf = 0; let x = 0; let y = 0;
    const apply = () => { raf = 0; if (ref.current) ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`; };
    const move = (e: MouseEvent) => { x = e.clientX; y = e.clientY; if (!raf) raf = requestAnimationFrame(apply); };
    window.addEventListener("mousemove", move);
    return () => { window.removeEventListener("mousemove", move); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return (
    <div ref={ref} className="pointer-events-none fixed left-0 top-0 z-50 hidden md:block">
      <Crosshair className="h-6 w-6 -translate-x-1/2 -translate-y-1/2 text-tac/25" strokeWidth={1} />
    </div>
  );
}

function Corners() {
  const pos = ["left-0 top-0 border-l border-t", "right-0 top-0 border-r border-t", "left-0 bottom-0 border-l border-b", "right-0 bottom-0 border-r border-b"];
  return (
    <>
      {pos.map((p, i) => (
        <motion.span key={i} initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25 + i * 0.08, duration: 0.4 }} className={`absolute h-3 w-3 border-tac ${p}`} />
      ))}
    </>
  );
}

function SignalBars() {
  const bars = [6, 9, 12, 8];
  return (
    <span className="flex h-3 items-end gap-0.5">
      {bars.map((h, i) => (
        <motion.span key={i} className="w-0.5 bg-tac" style={{ height: h }}
          animate={{ opacity: [0.25, 1, 0.25] }} transition={{ duration: 1.4, delay: i * 0.15, repeat: Infinity }} />
      ))}
    </span>
  );
}

function BroadcastCard({ item, i }: { item: (typeof broadcast)[number]; i: number }) {
  const [imgOk, setImgOk] = useState(true);
  const { name, tag, href, sub, Icon, thumb } = item;
  return (
    <motion.a href={href} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="hud-panel group relative block overflow-hidden bg-panel">
      <span className="cc-sweep" />
      <div className="relative aspect-video overflow-hidden border-b border-line bg-panel-2">
        {imgOk ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={thumb} alt="" onError={() => setImgOk(false)} className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-105 group-hover:opacity-100" />
        ) : (
          <div className="grid-bg flex h-full w-full items-center justify-center"><Icon className="h-9 w-9 text-tac-dim" strokeWidth={1.4} /></div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-panel/85 via-transparent to-transparent" />
        <div className="absolute left-2.5 top-2.5 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-tac blink" />
          <span className="t-label !text-[10px] !text-fg/80">{tag}</span>
        </div>
      </div>
      <div className="flex items-center gap-3 p-3.5">
        <div className="grid h-9 w-9 shrink-0 place-items-center border border-line text-tac transition-colors group-hover:border-tac/50"><Icon className="h-4 w-4" strokeWidth={1.6} /></div>
        <div className="min-w-0 flex-1">
          <div className="font-head text-sm tracking-wide text-fg">{name}</div>
          <div className="truncate font-mono text-[11px] text-muted">{sub}</div>
        </div>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-dim transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-tac" />
      </div>
    </motion.a>
  );
}

function ChannelRow({ item, i }: { item: (typeof channels)[number]; i: number }) {
  const { name, tag, href, sub, Icon } = item;
  return (
    <motion.a href={href} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="hud-panel group relative flex items-center gap-3.5 overflow-hidden bg-panel p-3.5">
      <span className="cc-sweep" />
      <div className="grid h-10 w-10 shrink-0 place-items-center border border-line text-muted transition-colors group-hover:border-tac/50 group-hover:text-tac"><Icon className="h-4 w-4" strokeWidth={1.6} /></div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <span className="font-head text-sm tracking-wide text-fg">{name}</span>
          <span className="t-label !text-[9px] !text-tac-dim">{tag}</span>
        </div>
        <div className="truncate font-mono text-[11px] text-muted">{sub}</div>
      </div>
      <ArrowUpRight className="h-4 w-4 shrink-0 text-dim transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-tac" />
    </motion.a>
  );
}

export function Console() {
  const [avatarOk, setAvatarOk] = useState(true);
  const [booting, setBooting] = useState(false);
  useEffect(() => {
    const seen = sessionStorage.getItem("cc_booted");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!seen && !reduce) setBooting(true);
  }, []);
  const endBoot = () => { sessionStorage.setItem("cc_booted", "1"); setBooting(false); };

  return (
    <main className="grid-bg relative min-h-screen text-fg">
      <Reticle />
      <span className="cc-bg-sweep" />
      <AnimatePresence>{booting && <BootSequence key="boot" onDone={endBoot} />}</AnimatePresence>

      <div className="sticky top-0 z-40 border-b border-line bg-void/85 backdrop-blur-md">
        <div className="mx-auto flex h-11 max-w-3xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Radio className="h-3.5 w-3.5 text-tac" strokeWidth={1.8} />
            <span className="font-head text-xs tracking-wide text-fg">CAPTAIN CROSS</span>
            <span className="t-label hidden sm:inline">// COMMS</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="t-label hidden sm:inline">DELHI</span>
            <span className="font-mono text-[11px] text-fg/80"><LiveClock /></span>
            <span className="text-dim">·</span>
            <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-tac blink" /><span className="t-label !text-tac">ONLINE</span></span>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-4 pb-20 pt-8 sm:pt-12">
        <motion.header initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="mb-9 flex items-center gap-4 sm:gap-5">
          <div className="relative h-20 w-20 shrink-0 sm:h-24 sm:w-24">
            <Corners />
            <div className="hud-panel relative grid h-full w-full place-items-center overflow-hidden bg-panel-2">
              {avatarOk ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src="/images/hero.jpg" alt="Captain Cross" onError={() => setAvatarOk(false)} className="h-full w-full object-cover" />
              ) : (
                <span className="font-head text-xl tracking-tightest text-tac">CC</span>
              )}
              <span className="cc-avatar-scan" />
            </div>
          </div>
          <div className="min-w-0">
            <div className="t-label mb-1 text-tac">// ESTABLISH UPLINK</div>
            <h1 className="font-head text-2xl leading-none tracking-tightest text-fg sm:text-3xl"><ScrambleText text="CAPTAIN CROSS" /></h1>
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-tac blink" /><span className="t-label !text-tac">ONLINE</span></span>
              <SignalBars />
              <span className="t-label hidden sm:inline">CLASS // CREATOR · PARTNERSHIPS</span>
            </div>
            <p className="mt-2 font-mono text-[11px] leading-relaxed text-muted sm:text-xs">Community, creator and partnerships operator. Patch into a channel below.</p>
          </div>
        </motion.header>

        <div className="mb-3 flex items-center gap-2"><span className="t-label">BROADCAST</span><span className="h-px flex-1 bg-line" /></div>
        <div className="mb-8 grid gap-3 sm:grid-cols-2">{broadcast.map((item, i) => <BroadcastCard key={item.key} item={item} i={i} />)}</div>

        <div className="mb-3 flex items-center gap-2"><span className="t-label">CHANNELS</span><span className="h-px flex-1 bg-line" /></div>
        <div className="mb-10 grid gap-3 sm:grid-cols-2">{channels.map((item, i) => <ChannelRow key={item.href} item={item} i={i} />)}</div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }} className="hud-panel flex flex-col items-center gap-4 bg-panel p-6 sm:flex-row sm:gap-6">
          <div className="shrink-0 border border-line bg-fg p-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/connect-qr.svg" alt="Scan to open captaincross.net/connect" className="h-28 w-28" />
          </div>
          <div className="text-center sm:text-left">
            <div className="t-label mb-1 text-tac">FIELD DEPLOYMENT</div>
            <div className="font-head text-base tracking-wide text-fg">SCAN TO CONNECT</div>
            <p className="mt-1.5 font-mono text-[11px] leading-relaxed text-muted">Point a camera at the code to open this uplink. Built for badges, slides, and event screens.</p>
          </div>
        </motion.div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-line pt-5 sm:flex-row">
          <span className="t-label">CAPTAIN CROSS · TF-141</span>
          <a href="/" className="t-link font-mono text-[11px] text-muted transition-colors hover:text-fg">FULL DOSSIER →</a>
        </div>
      </div>
    </main>
  );
}
