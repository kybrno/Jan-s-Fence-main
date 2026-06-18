/*
 * Testimonials - Jan's Fence
 * Design: Dark charcoal background, white text, rust star accents
 * Horizontal scroll on mobile, 3-column grid on desktop
 */

import { useEffect, useRef, useState } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Nasreen Shaikh",
    location: "Verified Review",
    rating: 5,
    text: "Mariusz and his team did an excellent job for us with our fence project. He did the work on time, very easy to work with, always responsive to my emails and did quality work. I am very glad I chose him to do my fence. He is highly dependable, reasonable and performs good quality work. I am very satisfied and pleased with my awesome fence!",
    project: "Fence Project",
    initials: "NS",
  },
  {
    name: "Colleen Quinn",
    location: "Verified Review",
    rating: 5,
    text: "Highly recommend Jan's Fence. Mariusz was professional, showed up for the estimate and install when he said he would, does high-quality, quick work, and his price was quite a bit lower than the next-lowest company I got an estimate from. Mariusz' attention to detail is excellent - he recommended a non-standard gate height to fit my yard's topography, and installed a thin strip of vinyl between my fence and the neighbor's because he saw I had small dogs who could squeeze through a tight spot. My new fence is straight, pristine, and lovely!",
    project: "Fence Installation",
    initials: "CQ",
  },
  {
    name: "Pamela Isaacson",
    location: "Verified Review",
    rating: 5,
    text: "I can't say enough about Mariusz and his crew! We contracted them to replace a decaying, untreated wood fence as well as extend a chain link fence to keep the dog from climbing the stone wall, and they came onsite and made suggestions and provided a very reasonable estimate. They also walked us through the prep along the way (calling DigSafe, etc.).",
    project: "Wood & Chain-Link",
    initials: "PI",
  },
  {
    name: "Vanessa Ma",
    location: "Verified Review",
    rating: 5,
    text: "Mariusz and his team did an amazing job on our cedar fence! They were so helpful, knowledgeable, friendly, and went the extra mile. The quality of the fence is top notch— we're so grateful that we went with them for this job!!",
    project: "Cedar Fence",
    initials: "VM",
  },
  {
    name: "Giuliana Castellanos",
    location: "Verified Review",
    rating: 5,
    text: "Mariusz was a pleasure to work with. His response time was amazing. Fantastic customer service and our fence looks great. I highly recommend Jan's Fence!",
    project: "Fence Installation",
    initials: "GC",
  },
];

const TEXT_LIMIT = 180;

function TestimonialCard({ t, index, visible }: { t: typeof testimonials[0]; index: number; visible: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = t.text.length > TEXT_LIMIT;
  const displayText = isLong && !expanded ? t.text.slice(0, TEXT_LIMIT).trimEnd() + "..." : t.text;

  return (
    <div
      className={`flex-shrink-0 w-80 lg:w-auto bg-white/5 border border-white/10 rounded-lg p-6 transition-all duration-500 hover:bg-white/10 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Quote icon */}
      <Quote size={20} className="mb-4 opacity-30" style={{ color: "var(--color-rust)" }} />

      {/* Stars */}
      <div className="flex gap-0.5 mb-3">
        {[...Array(t.rating)].map((_, i) => (
          <Star key={i} size={13} fill="#B85C38" color="#B85C38" />
        ))}
      </div>

      {/* Text */}
      <p className="font-body text-sm text-white/80 leading-relaxed mb-1 italic">
        "{displayText}"
      </p>
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="font-body text-xs font-medium mb-4 transition-colors"
          style={{ color: "var(--color-rust)" }}
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
      {!isLong && <div className="mb-5" />}

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-white/10">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center font-body font-bold text-xs text-white flex-shrink-0"
          style={{ backgroundColor: "var(--color-forest)" }}
        >
          {t.initials}
        </div>
        <div>
          <p className="font-body font-semibold text-white text-sm">{t.name}</p>
          <p className="font-mono-label text-[10px] text-white/40 mt-0.5">{t.project} · {t.location}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="testimonials"
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ backgroundColor: "var(--color-charcoal)" }}
    >
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "repeating-linear-gradient(90deg, white 0px, white 1px, transparent 1px, transparent 60px), repeating-linear-gradient(0deg, white 0px, white 1px, transparent 1px, transparent 60px)",
        }}
      />

      <div className="container relative z-10" ref={ref}>
        {/* Header */}
        <div
          className={`mb-12 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="section-label mb-3" style={{ color: "var(--color-rust)" }}>
            Customer Reviews
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white leading-tight">
              What Our Clients
              <br />
              <span style={{ color: "var(--color-sage)" }}>Are Saying</span>
            </h2>
            <div className="flex items-center gap-3">
              <div className="text-center">
                <p className="font-display text-4xl font-bold text-white">4.7</p>
                <div className="flex gap-0.5 justify-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill="#B85C38" color="#B85C38" />
                  ))}
                </div>
                <p className="font-body text-xs text-white/40 mt-1">60+ reviews</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cards — horizontal scroll on mobile, grid on desktop */}
        <div className="flex lg:grid lg:grid-cols-3 xl:grid-cols-5 gap-4 overflow-x-auto pb-4 lg:pb-0 lg:overflow-visible -mx-4 px-4 lg:mx-0 lg:px-0">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}
