/*
 * Gallery - Jan's Fence
 * Design: Masonry-style irregular photo grid with hover overlays
 * Mix of tall and wide images for visual variety
 */

import { useEffect, useRef, useState } from "react";
import { ZoomIn } from "lucide-react";

const INITIAL_COUNT = 8;

const galleryItems = [
  { id: 1, src: "/images/Wood1.jpg", alt: "Wood fence installation", label: "Wood Fencing", span: "row-span-2" },
  { id: 2, src: "/images/Vinyl1.jpg", alt: "Vinyl fence installation", label: "Vinyl Fencing", span: "" },
  { id: 3, src: "/images/Metal1.jpg", alt: "Metal fence installation", label: "Metal Fencing", span: "" },
  { id: 4, src: "/images/Wood2.jpg", alt: "Wood fence installation", label: "Wood Fencing", span: "col-span-2" },
  { id: 5, src: "/images/Vinyl2.jpg", alt: "Vinyl fence installation", label: "Vinyl Fencing", span: "" },
  { id: 6, src: "/images/Metal2.jpg", alt: "Metal fence installation", label: "Metal Fencing", span: "row-span-2" },
  { id: 7, src: "/images/Wood3.jpg", alt: "Wood fence installation", label: "Wood Fencing", span: "" },
  { id: 8, src: "/images/Vinyl3.jpg", alt: "Vinyl fence installation", label: "Vinyl Fencing", span: "" },
  { id: 9, src: "/images/Wood4.jpg", alt: "Wood fence installation", label: "Wood Fencing", span: "col-span-2" },
  { id: 10, src: "/images/Metal3.jpg", alt: "Metal fence installation", label: "Metal Fencing", span: "" },
  { id: 11, src: "/images/Wood5.jpg", alt: "Wood fence installation", label: "Wood Fencing", span: "row-span-2" },
  { id: 12, src: "/images/Vinyl5.jpg", alt: "Vinyl fence installation", label: "Vinyl Fencing", span: "" },
  { id: 13, src: "/images/Wood6.jpg", alt: "Wood fence installation", label: "Wood Fencing", span: "" },
  { id: 14, src: "/images/Vinyl6.jpg", alt: "Vinyl fence installation", label: "Vinyl Fencing", span: "col-span-2" },
  { id: 15, src: "/images/Metal4.jpg", alt: "Metal fence installation", label: "Metal Fencing", span: "" },
  { id: 16, src: "/images/Wood7.jpg", alt: "Wood fence installation", label: "Wood Fencing", span: "row-span-2" },
  { id: 17, src: "/images/Vinyl7.jpg", alt: "Vinyl fence installation", label: "Vinyl Fencing", span: "" },
  { id: 18, src: "/images/Wood8.jpg", alt: "Wood fence installation", label: "Wood Fencing", span: "" },
  { id: 19, src: "/images/Vinyl8.jpg", alt: "Vinyl fence installation", label: "Vinyl Fencing", span: "col-span-2" },
  { id: 20, src: "/images/Wood9.jpg", alt: "Wood fence installation", label: "Wood Fencing", span: "" },
  { id: 21, src: "/images/Vinyl9.jpg", alt: "Vinyl fence installation", label: "Vinyl Fencing", span: "row-span-2" },
  { id: 22, src: "/images/Wood10.jpg", alt: "Wood fence installation", label: "Wood Fencing", span: "" },
  { id: 23, src: "/images/Vinyl10.jpg", alt: "Vinyl fence installation", label: "Vinyl Fencing", span: "" },
  { id: 24, src: "/images/Wood11.jpg", alt: "Wood fence installation", label: "Wood Fencing", span: "" },
  { id: 25, src: "/images/Wood12.jpg", alt: "Wood fence installation", label: "Wood Fencing", span: "col-span-2" },
];

function GalleryItem({ item, index }: { item: typeof galleryItems[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [lightbox, setLightbox] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        ref={ref}
        className={`relative overflow-hidden rounded-lg cursor-pointer group ${item.span} ${
          visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        } transition-all duration-500`}
        style={{ transitionDelay: `${index * 60}ms`, minHeight: "200px" }}
        onClick={() => setLightbox(true)}
      >
        <img
          src={item.src}
          alt={item.alt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          style={{ minHeight: "200px" }}
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 text-center">
            <ZoomIn size={28} className="text-white mx-auto mb-2" />
            <p className="font-body text-white text-sm font-medium">{item.label}</p>
          </div>
        </div>
        {/* Label badge */}
        <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span
            className="font-mono-label text-[10px] px-2 py-1 rounded text-white"
            style={{ backgroundColor: "var(--color-rust)" }}
          >
            {item.label}
          </span>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(false)}
        >
          <img
            src={item.src}
            alt={item.alt}
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
          />
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white text-3xl leading-none"
            onClick={() => setLightbox(false)}
          >
            ×
          </button>
          <p className="absolute bottom-6 text-white/70 font-body text-sm">{item.label}</p>
        </div>
      )}
    </>
  );
}

export default function Gallery() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const visibleItems = showAll ? galleryItems : galleryItems.slice(0, INITIAL_COUNT);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeaderVisible(true); },
      { threshold: 0.2 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="gallery" className="py-24 lg:py-32 bg-white">
      <div className="container">
        {/* Header */}
        <div
          ref={headerRef}
          className={`mb-12 transition-all duration-700 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="section-label mb-3">Our Work</p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-stone-900 leading-tight">
              Projects We're
              <br />
              <span style={{ color: "var(--color-forest)" }}>Proud Of</span>
            </h2>
            <p className="font-body text-stone-500 max-w-sm leading-relaxed">
              Every fence tells a story. Browse a selection of our recent installations across the region.
            </p>
          </div>
        </div>

        {/* Masonry grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px]">
          {visibleItems.map((item, i) => (
            <GalleryItem key={item.id} item={item} index={i} />
          ))}
        </div>

        <div className="mt-10 text-center space-y-4">
          {galleryItems.length > INITIAL_COUNT && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 rounded font-semibold font-body text-white transition-all duration-200 hover:opacity-90"
              style={{ backgroundColor: "var(--color-forest)" }}
            >
              {showAll ? "Show Less" : `View More (${galleryItems.length - INITIAL_COUNT} more photos)`}
            </button>
          )}
          <p className="font-body text-stone-400 text-sm">
            Click any photo to enlarge &nbsp;·&nbsp; 500+ projects completed
          </p>
        </div>
      </div>
    </section>
  );
}
