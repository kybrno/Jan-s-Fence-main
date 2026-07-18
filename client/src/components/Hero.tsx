/*
 * Hero - Jan's Fence
 * Design: Full-bleed background image, dark overlay, left-aligned oversized headline
 * Stats bar at bottom, scroll indicator, rust CTA button
 */

import { useState, useEffect, useRef } from "react";
import { ArrowDown, Star, CheckCircle2 } from "lucide-react";

const COVER_IMAGE = "/images/Coverphoto.jpg";

const OTHER_IMAGES = [
  "/images/IMG_4220.jpg",
  "/images/IMG_4221.jpg",
  "/images/Metal1.jpg",
  "/images/Metal2.jpg",
  "/images/Metal3.jpg",
  "/images/Metal4.jpg",
  "/images/Vinyl1.jpg",
  "/images/Vinyl2.jpg",
  "/images/Vinyl3.jpg",
  "/images/Vinyl5.jpg",
  "/images/Vinyl6.jpg",
  "/images/Vinyl7.jpg",
  "/images/Vinyl8.jpg",
  "/images/Vinyl9.jpg",
  "/images/Vinyl10.jpg",
  "/images/Wood1.jpg",
  "/images/Wood2.jpg",
  "/images/Wood3.jpg",
  "/images/Wood4.jpg",
  "/images/Wood5.jpg",
  "/images/Wood6.jpg",
  "/images/Wood7.jpg",
  "/images/Wood8.jpg",
  "/images/Wood9.jpg",
  "/images/Wood10.jpg",
  "/images/Wood11.jpg",
  "/images/Wood12.jpg",
];

const stats = [
  { value: "30+ yrs", label: "Fencing Experience" },
  { value: "Since 2010", label: "Family-Owned" },
  { value: "10-Year", label: "Installation Warranty" },
  { value: "Free", label: "Estimates" },
];

export default function Hero() {
  const [visible, setVisible] = useState(false);

  const [images] = useState(() => {
    const shuffled = [...OTHER_IMAGES].sort(() => Math.random() - 0.5);
    return [COVER_IMAGE, ...shuffled];
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const [fading, setFading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const next = (currentIndex + 1) % images.length;
      setNextIndex(next);
      setFading(true);
      timerRef.current = setTimeout(() => {
        setCurrentIndex(next);
        setNextIndex(null);
        setFading(false);
      }, 1000);
    }, 6000);
    return () => {
      clearInterval(interval);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex, images.length]);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const scrollToBooking = () => {
    document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToServices = () => {
    document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col" id="hero">
      {/* Background slideshow */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={images[currentIndex]}
          alt="Jan's Fence installation"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {nextIndex !== null && (
          <img
            src={images[nextIndex]}
            alt="Jan's Fence installation"
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
            style={{ opacity: fading ? 1 : 0 }}
          />
        )}
        {/* Gradient overlay: darker on left for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center">
        <div className="container">
          <div className="max-w-2xl pt-24 pb-16">
            {/* Label */}
            <div
              className={`flex items-center gap-2 mb-6 transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "0ms" }}
            >
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} fill="#9B1B1B" color="#9B1B1B" />
                ))}
              </div>
              <span className="section-label text-white/70">Trusted Since 2010</span>
            </div>

            {/* Headline */}
            <h1
              className={`font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6 transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "120ms" }}
            >
              Quality Fencing.
              <br />
              <span style={{ color: "#C62828" }}>Expert</span>
              <br />
              Installation.
            </h1>

            {/* Subheadline */}
            <p
              className={`font-body text-lg text-white/80 mb-8 leading-relaxed max-w-lg transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "240ms" }}
            >
              Vinyl, wood, and metal fencing for homes and businesses in and around Littleton, MA. 30 years of experience, owner-operated, with a 10-year installation warranty on all metal and vinyl fences.
            </p>

            {/* CTAs */}
            <div
              className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "360ms" }}
            >
              <button
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-forest px-8 py-4 rounded font-semibold font-body text-base"
              >
                Contact Us for Free Estimate
              </button>
              <button
                onClick={scrollToServices}
                className="px-8 py-4 rounded font-semibold font-body text-base text-white border border-white/40 hover:bg-white/10 transition-colors duration-200"
              >
                View Our Services
              </button>
            </div>

            {/* Trust badges */}
            <div
              className={`flex flex-wrap gap-4 mt-8 transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "480ms" }}
            >
              {["Licensed & Insured", "Free Estimates", "Vinyl & Metal Warranty"].map((badge) => (
                <div key={badge} className="flex items-center gap-1.5 text-white/70">
                  <CheckCircle2 size={14} style={{ color: "var(--color-sage)" }} />
                  <span className="font-body text-sm">{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative z-10 bg-black/50 backdrop-blur-sm border-t border-white/10">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`py-5 px-4 text-center transition-all duration-700 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${600 + i * 80}ms` }}
              >
                <div className="font-display text-2xl font-bold text-white">{stat.value}</div>
                <div className="font-body text-xs text-white/50 mt-0.5 uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToServices}
        className="absolute bottom-24 right-8 z-10 hidden lg:flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors duration-200"
        aria-label="Scroll down"
      >
        <span className="font-mono-label text-[10px] tracking-widest rotate-90 mb-2">SCROLL</span>
        <ArrowDown size={16} className="animate-bounce" />
      </button>
    </section>
  );
}
