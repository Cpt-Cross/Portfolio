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
