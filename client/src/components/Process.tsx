/*
 * Process - Jan's Fence
 * Design: Clean white background, 4-step horizontal flow with numbered circles
 * Forest green step numbers, rust connecting lines, subtle entrance animations
 */

import { useEffect, useRef, useState } from "react";
import { CalendarCheck, ClipboardList, Hammer, CheckCircle2 } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: CalendarCheck,
    title: "Book a Consultation",
    desc: "Schedule your free on-site visit using our online calendar. We'll come to your property at a time that works for you.",
  },
  {
    num: "02",
    icon: ClipboardList,
    title: "Get Your Custom Quote",
    desc: "Our estimator measures your property, discusses your options, and delivers a detailed written quote — same day.",
  },
  {
    num: "03",
    icon: Hammer,
    title: "Professional Installation",
    desc: "Our crew arrives on schedule, handles all permits, and installs your fence with precision. Most jobs complete in 1–2 days.",
  },
  {
    num: "04",
    icon: CheckCircle2,
    title: "Final Walkthrough",
    desc: "We walk the finished fence with you, answer any questions, and don't leave until you're completely satisfied.",
  },
];

export default function Process() {
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
    <section className="py-20 lg:py-28 bg-white border-t border-stone-100" ref={ref}>
      <div className="container">
        <div
          className={`text-center mb-14 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="section-label mb-3">How It Works</p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-stone-900 leading-tight">
            From Booking to
            <span style={{ color: "var(--color-forest)" }}> Beautiful Fence</span>
          </h2>
          <p className="font-body text-stone-500 mt-4 max-w-xl mx-auto">
            Our streamlined process makes getting a new fence simple, transparent, and stress-free.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line (desktop only) */}
          <div
            className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px z-0"
            style={{ backgroundColor: "var(--color-border)" }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className={`flex flex-col items-center text-center transition-all duration-500 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                {/* Circle */}
                <div className="relative mb-5">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center shadow-md"
                    style={{ backgroundColor: "var(--color-forest)" }}
                  >
                    <step.icon size={28} className="text-white" />
                  </div>
                  {/* Step number badge */}
                  <div
                    className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center font-mono-label text-[10px] font-bold text-white shadow"
                    style={{ backgroundColor: "var(--color-rust)" }}
                  >
                    {i + 1}
                  </div>
                </div>

                <h3 className="font-display text-lg font-bold text-stone-900 mb-2">{step.title}</h3>
                <p className="font-body text-sm text-stone-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          className={`mt-14 text-center transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "500ms" }}
        >
          <button
            onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-forest px-10 py-4 rounded font-semibold font-body text-base"
          >
            Contact Us for Free Estimate
          </button>
        </div>
      </div>
    </section>
  );
}
