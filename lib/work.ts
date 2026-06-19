import { projects, type Project } from "./projects";
import { galleries, type GalleryImage } from "./galleries.generated";

export function getGallery(slug: string) {
  return galleries[slug];
}

// Card cover for a project, falling back to its first gallery image.
export function coverFor(project: Project): string | null {
  const g = galleries[project.slug];
  if (!g) return null;
  return g.cover ?? g.images[0]?.full ?? null;
}

export function imageCount(slug: string): number {
  return galleries[slug]?.images.length ?? 0;
}

export type WallImage = GalleryImage & { slug: string; title: string; index: number };

// Every gallery image, flattened, in the same order projects are declared.
// Used by /gallery. Each links back to /work#<slug>.
export function allGalleryImages(): WallImage[] {
  const out: WallImage[] = [];
  for (const p of projects) {
    const g = galleries[p.slug];
    if (!g) continue;
    g.images.forEach((im, index) => {
      out.push({ ...im, slug: p.slug, title: p.title, index });
    });
  }
  return out;
}
