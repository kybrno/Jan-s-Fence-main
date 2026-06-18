/*
 * Services - Jan's Fence
 * Design: Numbered cards in 2-column offset grid, rust left-border accents
 * Each card has image, number, title, description, and features list
 */

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

const WOOD_IMG = "/images/Wood1.jpg";
const VINYL_IMG = "/images/Vinyl1.jpg";
const METAL_IMG = "/images/Metal1.jpg";

// Metal fencing subcategories
const metalSubcategories = [
  { name: "Chain Link", description: "Affordable, durable, and functional for yards, pools, and play areas" },
  { name: "Aluminum", description: "Sleek, modern, and low-maintenance with a clean aesthetic" },
  { name: "Ornamental (Steel)", description: "Decorative and elegant for enhanced curb appeal and property value" },
];

const services = [
  {
    num: "01",
    title: "Wood Fencing",
    tagline: "Classic warmth and curb appeal",
    description:
      "Wood fencing is a timeless choice that adds warmth and natural beauty to any property. We offer privacy, semi-privacy, picket, and post-and-rail styles with customization options for height, design details, and finishes.",
    features: ["Privacy & semi-privacy styles", "Picket & post-and-rail options", "Custom heights & designs", "Durable construction"],
    image: WOOD_IMG,
    color: "#8B5E3C",
  },
  {
    num: "02",
    title: "Vinyl Fencing",
    tagline: "Low-maintenance, long-lasting",
    description:
      "Vinyl fencing is low-maintenance and doesn't need painting or staining. It resists rot, insects, and harsh weather. Perfect for privacy fences, pool enclosures, and yard boundaries in multiple styles and colors.",
    features: ["Zero maintenance required", "Rot & insect resistant", "Multiple colors & styles", "10-year installation warranty"],
    image: VINYL_IMG,
    color: "#E8E8E8",
  },
  {
    num: "03",
    title: "Metal Fencing",
    tagline: "Durable, affordable, reliable",
    description:
      "Metal fencing is durable, low-maintenance, and affordable. We offer three types: chain-link for functional spaces, aluminum for a sleek modern look, and ornamental steel for decorative appeal. Ideal for yards, play areas, pools, and property boundaries.",
    features: ["Chain-link fencing", "Aluminum fencing", "Ornamental steel fencing", "10-year installation warranty"],
    image: METAL_IMG,
    color: "#6B7280",
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${isEven ? "mt-0 lg:mt-8" : "mt-0"}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        {/* Large number overlay */}
        <div
          className="absolute top-3 right-4 font-display font-black text-6xl leading-none select-none"
          style={{ color: "rgba(255,255,255,0.15)" }}
        >
          {service.num}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Number + title */}
        <div className="flex items-start gap-3 mb-3">
          <span
            className="font-mono-label text-xs font-medium mt-1"
            style={{ color: "var(--color-rust)" }}
          >
            {service.num}
          </span>
          <div>
            <h3 className="font-display text-xl font-bold text-stone-900 leading-tight">
              {service.title}
            </h3>
            <p className="font-body text-sm mt-0.5" style={{ color: "var(--color-rust)" }}>
              {service.tagline}
            </p>
          </div>
        </div>

        <p className="font-body text-sm text-stone-600 leading-relaxed mb-4">
          {service.description}
        </p>

        {/* Features */}
        <ul className="space-y-1.5">
          {service.features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-stone-600 font-body">
              <Check size={13} style={{ color: "var(--color-forest)", flexShrink: 0 }} />
              {f}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}
          className="mt-5 w-full py-2.5 rounded text-sm font-semibold font-body border-2 transition-all duration-200 hover:text-white"
          style={{
            borderColor: "var(--color-forest)",
            color: "var(--color-forest)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--color-forest)";
            (e.currentTarget as HTMLButtonElement).style.color = "white";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
            (e.currentTarget as HTMLButtonElement).style.color = "var(--color-forest)";
          }}
        >
          Contact Us for Free Estimate
        </button>
      </div>
    </div>
  );
}

export default function Services() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeaderVisible(true); },
      { threshold: 0.2 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="py-24 lg:py-32" style={{ backgroundColor: "var(--color-parchment)" }}>
      <div className="container">
        {/* Header */}
        <div
          ref={headerRef}
          className={`mb-16 transition-all duration-700 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="section-label mb-3">Our Services</p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-stone-900 max-w-lg leading-tight">
              Complete Fencing
              <br />
              <span style={{ color: "var(--color-forest)" }}>Solutions</span>
            </h2>
            <p className="font-body text-stone-600 max-w-md leading-relaxed lg:text-right">
              Jan's Fence provides complete fence installation and repair services for homes and small businesses in Littleton, MA and surrounding areas. 30 years of experience, family-owned since 2010.
            </p>
          </div>
          {/* Decorative rule */}
          <div className="mt-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-stone-200" />
            <div className="w-2 h-2 rotate-45" style={{ backgroundColor: "var(--color-rust)" }} />
            <div className="h-px w-16 bg-stone-200" />
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start max-w-5xl mx-auto">
          {services.map((service, i) => (
            <ServiceCard key={service.num} service={service} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="font-body text-stone-500 mb-4">Ready to get started?</p>
          <a
            href="tel:617-953-9487"
            className="btn-forest px-8 py-3.5 rounded font-semibold font-body inline-block"
          >
            OR Call Us Now
          </a>
        </div>
      </div>
    </section>
  );
}
