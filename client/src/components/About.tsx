/*
 * About - Jan's Fence
 * Design: Two-column layout, team photo on right, story + values on left
 * Rust left-border accent on pull quote, forest green value icons
 */

import { useEffect, useRef, useState } from "react";
import { Shield, Award, Clock, Users } from "lucide-react";

const TEAM_IMG = "/images/Coverphoto.jpg";

const values = [
  {
    icon: Shield,
    title: "Licensed & Insured",
    desc: "Fully licensed and insured for all work in Massachusetts.",
  },
  {
    icon: Award,
    title: "10-Year Warranty",
    desc: "We stand behind every installation with a 10-year installation warranty on all metal and vinyl fences.",
  },
  {
    icon: Clock,
    title: "Owner-Operated",
    desc: "The owner is directly involved in each project from estimate through installation to ensure quality.",
  },
  {
    icon: Users,
    title: "Family-Owned Since 2010",
    desc: "A local, family-owned business with 30 years of hands-on fencing experience.",
  },
];

export default function About() {
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

  return (
    <section id="about" className="py-24 lg:py-32" style={{ backgroundColor: "var(--color-parchment)" }}>
      <div className="container">
        <div
          ref={ref}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Left: Story */}
          <div>
            <p className="section-label mb-4">Our Story</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-stone-900 leading-tight mb-6">
              30 Years of
              <br />
              <span style={{ color: "var(--color-forest)" }}>Fencing Experience</span>
            </h2>

            {/* Pull quote */}
            <blockquote
              className="rust-border-left mb-6"
            >
              <p className="font-display text-lg italic text-stone-700 leading-relaxed">
                "Quality fencing is about doing the job right the first time."
              </p>
              <footer className="font-body text-sm text-stone-500 mt-2">
                — Jan's Fence
              </footer>
            </blockquote>

            <p className="font-body text-stone-600 leading-relaxed mb-4">
              Jan's Fence is a family-owned fencing contractor serving Littleton, MA and surrounding areas since 2010. With 30 years of hands-on fencing experience, we bring expertise and attention to detail to every project.
            </p>

            <p className="font-body text-stone-600 leading-relaxed mb-8">
              The owner is directly involved in each project, from the initial estimate through installation, to make sure the work is done right the first time. We use quality materials, careful installation practices, and maintain clean job sites. Every metal and vinyl fence comes with our 10-year installation warranty.
            </p>

            {/* Values grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {values.map((v, i) => (
                <div
                  key={v.title}
                  className={`flex gap-3 transition-all duration-500 ${
                    visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                  }`}
                  style={{ transitionDelay: `${200 + i * 80}ms` }}
                >
                  <div
                    className="flex-shrink-0 w-9 h-9 rounded flex items-center justify-center mt-0.5"
                    style={{ backgroundColor: "rgba(30, 77, 43, 0.1)" }}
                  >
                    <v.icon size={16} style={{ color: "var(--color-forest)" }} />
                  </div>
                  <div>
                    <h4 className="font-body font-semibold text-stone-900 text-sm mb-0.5">{v.title}</h4>
                    <p className="font-body text-xs text-stone-500 leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => window.location.href = "tel:617-953-9487"}
              className="btn-forest mt-8 px-8 py-3.5 rounded font-semibold font-body text-white"
            >
              Call 617-953-9487
            </button>
          </div>

          {/* Right: Team photo */}
          <div
            className={`relative transition-all duration-700 ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
            style={{ transitionDelay: "150ms" }}
          >
            <div className="relative">
              {/* Decorative frame offset */}
              <div
                className="absolute -top-4 -right-4 w-full h-full rounded-lg border-2 z-0"
                style={{ borderColor: "var(--color-rust)", opacity: 0.3 }}
              />
              <img
                src={TEAM_IMG}
                alt="Jan's Fence team of professional fencing installers"
                className="relative z-10 w-full rounded-lg shadow-2xl object-cover"
                style={{ maxHeight: "520px", borderRadius: '0px' }}
              />
              {/* Badge overlay */}
              <div
                className="absolute -bottom-5 -left-5 z-20 bg-white rounded-lg shadow-xl p-4 border border-stone-100"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-white text-lg"
                    style={{ backgroundColor: "var(--color-forest)" }}
                  >
                    30
                  </div>
                  <div>
                    <p className="font-body font-semibold text-stone-900 text-sm leading-tight">Years of</p>
                    <p className="font-body font-semibold text-stone-900 text-sm leading-tight">Experience</p>
                    <p className="font-mono-label text-[10px] mt-0.5" style={{ color: "var(--color-rust)" }}>EST. 2010</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
