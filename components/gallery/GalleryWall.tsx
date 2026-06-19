import Image from "next/image";
import Link from "next/link";
import { allGalleryImages } from "@/lib/work";

export function GalleryWall() {
  const images = allGalleryImages();
  return (
    <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-2 md:gap-3">
      {images.map((img, i) => (
        <Link
          key={`${img.slug}-${img.index}`}
          href={`/work#${img.slug}`}
          aria-label={`Open ${img.title}`}
          className="group relative block mb-2 md:mb-3 break-inside-avoid overflow-hidden border border-transparent hover:border-tac/50 transition-colors"
        >
          <Image
            src={img.thumb}
            alt={img.title}
            width={img.w}
            height={img.h}
            sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 20vw"
            className="w-full h-auto object-cover grayscale-[0.35] contrast-105 group-hover:grayscale-0 transition-all duration-500"
            priority={i < 4}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-0 left-0 right-0 p-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block">
            <span className="t-label !text-fg/90">{img.title}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
