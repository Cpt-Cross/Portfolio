# /work + /gallery — build notes

Two new pages added to the site, matching the existing tactical look (Chakra Petch + JetBrains Mono, tac-green, HUD panels). Nothing on the homepage layout was moved; the hero and CallsignBar are untouched.

## Your two questions
1. **Photos for every campaign.** The pipeline handles any count. A campaign with one photo just shows a single image with no arrows/dots/filmstrip; two or more get the full carousel. All 10 campaigns have imagery filed.
2. **AMD GameOn + government.** Confirmed: IndiaJoy 2025 (Hyderabad, Nov 1–2) is organised by TVAGA and supported by the Government of Telangana, and AMD GameOn runs inside it. So AMD GameOn is tagged **Government** as a secondary category (primary identity stays the cosplay competition). It now shows up under the Government filter next to WAVES.

## What you got
- `/work` — every campaign as a card. A sticky toolbar sorts (Newest / Oldest / Brand A-Z / Footfall) and filters (Cosplay / Esports / Launch / Booth / Government). Tap a card and it expands in place into the full file: brief, role, green stat blocks, tags, and the image carousel. Opening one closes the others and scrolls to it. Below the grid is the abridged ops list (World of Warships, Amazon Big Billion Days, Intel, ViewSonic).
- `/gallery` — a Pinterest-style masonry wall of every campaign photo, minimal chrome, lazy-loaded. Tap any image to jump to that campaign on `/work` (it opens the file via `/work#<slug>`).
- **Carousel** — Instagram-style. Mobile: swipe, dots, counter, tap to zoom. Desktop: arrows, a thumbnail filmstrip, click to zoom into a full-screen lightbox (arrow keys + Esc). Neighbour images preload so it feels instant.
- **Entry points** — the Deployment Log section on the homepage now has two buttons at the end: "Open full campaign files" (`/work`) and "View photo gallery" (`/gallery`), both opening in a new tab as you asked. The new pages carry their own slim nav (HOME · WORK · GALLERY · CONNECT) so you can move between them.

## Images: how it works
Raw photos live in `work-images/<slug>/` (one folder per campaign, folder name = the slug). They are **not committed** (gitignored, kept on your machine). Running the pipeline writes web-sized WebP into `public/images/work/<slug>/` (committed) and regenerates `lib/galleries.generated.ts`.

```
npm install        # one time, pulls in sharp
npm run images     # processes work-images/ -> public/images/work/ + the manifest
```

Per photo it makes a 1600px "full" (carousel/lightbox), a 600px "thumb" (filmstrip + gallery wall), and the first photo also makes a 1200px card cover. It auto-orients from EXIF, compresses, and skips files that have not changed, so re-runs are fast. **The 111 MB old set came down to ~20 MB.**

To swap in your own (better) photos: drop them into `work-images/<slug>/`, name the hero shot `cover.jpg` (or just let the first file be the cover), number the rest `1.jpg, 2.jpg, ...` for order, then `npm run images`. Reordering is just renaming. Add a new campaign by adding a folder + an entry in `lib/projects.ts`.

I bootstrapped from your old portfolio repo so both pages have real images right now. AMD's one low-res Instagram screenshot was dropped.

## Please confirm these (mixed sources, best guesses — fix the value, no code change)
All sorting still works; only the displayed value is provisional. In `lib/projects.ts`:
- **Lenovo Tech World** — year: your image folder says 2025, the current site says 2026. I used **2026**. Month unknown.
- **Bengaluru Comic Con** — year "2024-25" and footfall: current site says **25,000+**, old portfolio said 30,000+. I used 25,000+. Date guessed 2024-11.
- **Samsung 2025 / 2024** — exact launch month (I used July). Creator count: brief says "four per event", old data said 6+. I used **4+**.
- **Riot Valorant Convergence** — year and month (I used 2024-06).
- **College Rivals S3** — month (I used 2026-03).
- **Delhi Comic Con** — month (I used 2025-12).
- **AMD GameOn** — Nov 2025, confirmed, no action.
- Samsung 2025 is marked **ACTIVE** (ongoing partnership); everything else is **COMPLETE**. Change if you prefer.

Double-check the footfall numbers generally, since the Scale sort uses them.

## Preview and deploy
```
npm install
npm run dev        # then open http://localhost:3000/work and /gallery
```
Deploy is unchanged: `npx next build && npx wrangler deploy`. The export produces `work.html` and `gallery.html`, the same flat pattern as your existing `connect.html`, so `worker.js` needs no changes. I ran a production build here and all routes compiled and exported clean.

## Files in this bundle
New: `app/work/page.tsx`, `app/gallery/page.tsx`, `components/SiteNav.tsx`, `components/work/{WorkArchive,CampaignCard,Carousel,Lightbox}.tsx`, `components/gallery/GalleryWall.tsx`, `lib/projects.ts`, `lib/work.ts`, `lib/galleries.generated.ts`, `scripts/process-images.mjs`, `public/images/work/<slug>/…`.
Changed: `components/DeploymentLog.tsx` (entry buttons), `package.json` (added sharp + the `images` script — note npm reformatted the file when adding the dependency), `.gitignore` (ignores `work-images/`).

Unzip into the repo root, preserving paths. I did not push to GitHub or deploy.

---

## UPDATE — round 2 (desktop polish + gallery shuffle)

**Mobile is byte-for-byte unchanged on both pages.** All work here is desktop-only or additive.

### /work — desktop jank fixed
- The old expand used framer `layout` on every grid card. At one column (mobile) that only animates height, so it stays smooth. At 2–3 columns it animated width + reflowed the whole grid (FLIP) = the jank you saw.
- Now the page branches on column count:
  - **1 column (mobile):** unchanged in-place morph (`CampaignCard`, still uses `layout`).
  - **2–3 columns (desktop/tablet):** cards are static plain articles (`DesktopCard`, no framer). The opened file renders as a single full-width panel injected right after that card's row; only that one panel animates its height open/close. No per-card FLIP, so no jank.
- New files: `components/work/cardParts.tsx` (shared `CollapsedInner` + `CampaignDetail`, so mobile and desktop render identical markup) and `components/work/DesktopCard.tsx`.

### Scan line — now one-shot
- `.cc-avatar-scan` (the hero-avatar sweep) loops every 3.6s and is shared, so it was left alone.
- Added `.cc-image-scan` in `globals.css`: plays **once** when a file opens (carousel mount), not on every image change, not looping. To revert to a sweep on each image change, key the span to the image index again in `Carousel.tsx`.

### /gallery — randomized order
- `GalleryWall` is now a client component. Order is seeded (deterministic PRNG) and stored in `localStorage` (`cc_gallery_seed`).
- Reshuffles on: a reload (F5 / Ctrl+F5), first ever visit, or when the stored order is older than the interval. Soft navigations within the interval keep the same order so it does not churn.
- **Interval is one constant:** `RESHUFFLE_AFTER_MS` at the top of `components/gallery/GalleryWall.tsx` (default 30 min). Set it lower/higher to taste. To make plain refreshes *not* reshuffle (only the interval), remove the `isReload` check.
- Build order renders first (matches SSR), then it reorders once on mount — a one-time reflow, no layout change.

### Data
- `lib/projects.ts`: AMD finale wording aligned to the homepage ("YouTube livestream").

---

## UPDATE — round 3 (Instagram-style overlay, replaces inline expand)

The inline expand (both the mobile morph and the desktop injected panel) is gone.
Opening a campaign now opens a centered modal **overlay** over a static grid. The
grid never reflows, so there is no expand jank on any screen size, and the modal
is sized to its content so it does not waste space like the old full-width panel.

### What it does
- **/work:** clicking a card opens the overlay. Image-dominant on the left, brief
  + stats on the right; stacks vertically on mobile. Esc / backdrop / X to close.
- **/gallery:** clicking a photo opens the same overlay **in place** (no jump to
  /work), and the carousel starts on the exact photo you clicked. The link still
  points at `/work#slug` under the hood, so middle-click / Cmd-click opens /work
  in a new tab and crawlers still see the link.
- **Deep links:** `/work#slug` (and `/gallery#slug`) open that campaign on load.
  The URL updates as you open/close (via `replaceState`, so no history spam).
- **Animation:** tactical entrance (fade + scale) plus a one-shot scan sweep
  (`.cc-panel-scan`), in the /connect style. The zoom Lightbox still layers above
  the overlay.

### Files
- **NEW:** `components/work/CampaignOverlay.tsx` (the modal).
- **DELETE this file from your repo:** `components/work/DesktopCard.tsx` — it is no
  longer used (the grid card is now `CampaignCard.tsx`, static, no animation).
  Copying this bundle will not remove it for you, so delete it manually.
- `CampaignCard.tsx` is now a plain static card (no framer). `cardParts.tsx` no
  longer exports `CampaignDetail` (the detail layout lives in the overlay).
- `Carousel.tsx` gained an optional `initialIndex` prop.

### Mobile note
This replaces the mobile morph too, so mobile now uses the overlay as well (it is
the same Instagram pattern, which works well on phones). If you want the old
in-place morph back on mobile specifically, say so and I will gate it.

---

## UPDATE — round 4 (overlay perf, stat fit, 4 new files, Curated sort)

### Overlay open is now smooth
The lag on opening a file was the full-screen `backdrop-blur` animating its
opacity (the browser recomputes the blur every frame). Removed it: the backdrop
is now a solid dark dim, the modal entrance is a light fade + slide (no scale),
and body-scroll-lock compensates for the scrollbar so nothing jumps on open. Same
blur removed from the zoom Lightbox. No visual loss, much smoother.

### Stat boxes fit
The 3-up stat blocks were too tight in the narrow detail column (numbers touched
the edges). The grid now adapts to the number of stats (1 / 2 / 3 columns), the
value is sized to fit, and labels wrap cleanly.

### Four campaigns promoted to full files
World of Warships, Amazon Big Billion Days 2024, Intel Ambassador Program, and
ViewSonic Monitor Launch are now full campaign files (they were the abridged
strip, which is now empty and hidden). Copy is in `lib/projects.ts`; **CONFIRM
the dates and add real numbers to their `stats`** (marked with comments).

**Adding their images** — for each, the slug is the folder name:
`world-of-warships`, `amazon-bbd`, `intel-ambassador`, `viewsonic-launch`.
1. Make a folder `work-images/<slug>/` (same place as the other campaigns).
2. Drop photos in. Name the cover `cover.jpg` (or just prefix numerically:
   `01-...`, `02-...`). jpg / jpeg / png / webp all fine. First image = cover.
3. Run `npm run images`. That writes the optimized webp into
   `public/images/work/<slug>/` and updates `lib/galleries.generated.ts`.
4. Commit the new `public/images/work/<slug>/` + the regenerated manifest, then
   build / deploy.
Until you add images they show a placeholder cover and "NO IMAGERY FILED" in the
overlay, which is expected.

### "Curated" sort (now the default)
New sort that front-loads the campaigns you want to show off, regardless of
stats. The order is a plain list, `CURATED_ORDER`, at the bottom of
`lib/projects.ts` — reorder it however you like. Anything not listed falls to the
end, newest first. It is the default sort now (best first impression); say so if
you would rather default to Newest. If you would rather Curated *hide* the
non-curated ones instead of just ordering them, that is a small change too.

---

## UPDATE — round 5 (single scan, dim fix)

- **One scan only.** Removed the per-image scan inside the carousel; the overlay
  now runs a single sweep across the whole modal (`.cc-panel-scan`). No more two
  offset sweeps.
- **Background dim fixed.** The backdrop used `bg-void/92`, but `/92` is not one
  of Tailwind's opacity steps so that class was never generated (the blur that
  used to be there had been hiding it). Switched to `bg-void/90`, which is a real
  step, so the page behind now darkens again.

### Where the Curated order lives
`lib/projects.ts`, at the very bottom: `export const CURATED_ORDER` is a plain
array of slugs. Reorder it however you like; anything you leave out drops to the
end (newest first). The 14 valid slugs are: samsung-2025, amd-gameon,
riot-convergence, lenovo-techworld, college-rivals, comiccon-delhi, waves-summit,
comiccon-bengaluru, samsung-2024, freefire-jjk, amazon-bbd, world-of-warships,
intel-ambassador, viewsonic-launch.
