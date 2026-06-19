// Image pipeline for the /work and /gallery pages.
//
// What it does
//   Reads raw photos from   work-images/<slug>/*   (one folder per campaign)
//   Writes web-sized WebP to public/images/work/<slug>/
//   Writes the image list to lib/galleries.generated.ts (do not edit by hand)
//
// Per source image it emits a 1600px "full" (for the carousel/lightbox) and a
// 600px "thumb" (for the filmstrip and the gallery wall). The first image in a
// folder also becomes a 1200px "cover" used on the campaign card.
//
// Run it with:  npm run images
// It skips files that have not changed (content-hash cache), so re-runs are fast.
//
// Folder + naming rules
//   - Folder name must match the project "slug" in lib/projects.ts
//   - A file literally named cover.(jpg|png|webp) is used as the cover and shown first
//   - Otherwise files sort naturally: 1, 2, 3 ... then alphabetical
//   - Reorder anything just by renaming files, then re-run
//
// Adding a campaign: make work-images/<slug>/, drop photos in, run npm run images.

import { promises as fs } from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC_DIR = path.join(ROOT, "work-images");
const OUT_DIR = path.join(ROOT, "public", "images", "work");
const MANIFEST = path.join(ROOT, "lib", "galleries.generated.ts");
const CACHE = path.join(SRC_DIR, ".cache.json");

const SIZES = {
  full: { width: 1600, quality: 80 },
  thumb: { width: 600, quality: 72 },
  cover: { width: 1200, quality: 78 },
};
const RX = /\.(jpe?g|png|webp)$/i;

const baseOf = (f) => f.replace(RX, "");
const isCover = (f) => /^cover\.(jpe?g|png|webp)$/i.test(f);
const numLead = (f) => {
  const m = baseOf(f).match(/^(\d+)/);
  return m ? parseInt(m[1], 10) : Number.MAX_SAFE_INTEGER;
};

// cover first, then by leading number, then alphabetical
function sortFiles(files) {
  return [...files].sort((a, b) => {
    if (isCover(a) !== isCover(b)) return isCover(a) ? -1 : 1;
    const na = numLead(a), nb = numLead(b);
    if (na !== nb) return na - nb;
    return a.localeCompare(b, undefined, { numeric: true });
  });
}

async function exists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}
async function readJSON(p, fallback) {
  try { return JSON.parse(await fs.readFile(p, "utf8")); } catch { return fallback; }
}

async function emit(srcPath, outPath, { width, quality }) {
  const img = sharp(srcPath).rotate(); // honour EXIF orientation
  const out = await img
    .resize({ width, withoutEnlargement: true })
    .webp({ quality })
    .toBuffer({ resolveWithObject: true });
  await fs.writeFile(outPath, out.data);
  return { w: out.info.width, h: out.info.height };
}

async function main() {
  if (!(await exists(SRC_DIR))) {
    console.log(`[images] no work-images/ folder found, skipping (committed images left as-is)`);
    return;
  }

  const entries = await fs.readdir(SRC_DIR, { withFileTypes: true });
  const slugs = entries.filter((e) => e.isDirectory()).map((e) => e.name).sort();
  if (slugs.length === 0) {
    console.log(`[images] work-images/ is empty, nothing to do`);
    return;
  }

  const cache = await readJSON(CACHE, {});
  const nextCache = {};
  const manifest = {};
  let processed = 0, skipped = 0;

  for (const slug of slugs) {
    const inDir = path.join(SRC_DIR, slug);
    const outDir = path.join(OUT_DIR, slug);
    await fs.mkdir(outDir, { recursive: true });

    const files = sortFiles((await fs.readdir(inDir)).filter((f) => RX.test(f)));
    if (files.length === 0) continue;

    const images = [];
    let cover = null;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const srcPath = path.join(inDir, file);
      const base = baseOf(file).toLowerCase().replace(/[^a-z0-9_-]/g, "-");
      const wantsCover = i === 0;

      const bytes = await fs.readFile(srcPath);
      const hash = createHash("sha1")
        .update(bytes)
        .update(JSON.stringify({ SIZES, wantsCover, base }))
        .digest("hex");

      const fullName = `${base}-full.webp`;
      const thumbName = `${base}-thumb.webp`;
      const fullPath = path.join(outDir, fullName);
      const thumbPath = path.join(outDir, thumbName);
      const coverPath = path.join(outDir, "cover.webp");
      const cacheKey = `${slug}/${file}`;

      const cached = cache[cacheKey];
      const outputsExist =
        (await exists(fullPath)) &&
        (await exists(thumbPath)) &&
        (!wantsCover || (await exists(coverPath)));

      let dims;
      if (cached && cached.hash === hash && outputsExist && cached.dims) {
        dims = cached.dims;
        skipped++;
      } else {
        dims = await emit(srcPath, fullPath, SIZES.full);
        await emit(srcPath, thumbPath, SIZES.thumb);
        if (wantsCover) await emit(srcPath, coverPath, SIZES.cover);
        processed++;
      }

      nextCache[cacheKey] = { hash, dims };
      const webFull = `/images/work/${slug}/${fullName}`;
      const webThumb = `/images/work/${slug}/${thumbName}`;
      images.push({ full: webFull, thumb: webThumb, w: dims.w, h: dims.h });
      if (wantsCover) cover = `/images/work/${slug}/cover.webp`;
    }

    manifest[slug] = { cover, images };
  }

  await fs.writeFile(CACHE, JSON.stringify(nextCache, null, 2));

  // Write the generated TypeScript module (stable key order for clean diffs)
  const orderedSlugs = Object.keys(manifest).sort();
  const body = orderedSlugs
    .map((slug) => {
      const m = manifest[slug];
      const imgs = m.images
        .map((im) => `      { full: ${JSON.stringify(im.full)}, thumb: ${JSON.stringify(im.thumb)}, w: ${im.w}, h: ${im.h} },`)
        .join("\n");
      return `  ${JSON.stringify(slug)}: {\n    cover: ${JSON.stringify(m.cover)},\n    images: [\n${imgs}\n    ],\n  },`;
    })
    .join("\n");

  const ts = `// AUTO-GENERATED by scripts/process-images.mjs. Do not edit by hand.
// Run "npm run images" to regenerate after adding or changing photos.

export type GalleryImage = { full: string; thumb: string; w: number; h: number };
export type GalleryEntry = { cover: string | null; images: GalleryImage[] };

export const galleries: Record<string, GalleryEntry> = {
${body}
};
`;
  await fs.mkdir(path.dirname(MANIFEST), { recursive: true });
  await fs.writeFile(MANIFEST, ts);

  const total = orderedSlugs.reduce((n, s) => n + manifest[s].images.length, 0);
  console.log(`[images] ${orderedSlugs.length} campaigns, ${total} images (${processed} processed, ${skipped} unchanged)`);
  console.log(`[images] wrote ${path.relative(ROOT, MANIFEST)}`);
}

main().catch((err) => {
  console.error("[images] failed:", err);
  process.exit(1);
});
