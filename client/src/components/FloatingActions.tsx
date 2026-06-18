/*
 * FloatingActions - Jan's Fence
 * Design: Sticky floating "Call Now" button (bottom right), scroll-to-top (appears after scroll)
 * Forest green call button, subtle shadow, smooth transitions
 */

import { useState, useEffect } from "react";
import { ArrowUp, CalendarCheck } from "lucide-react";

export default function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setShowScrollTop(y > 600);
      // Show contact button after scrolling past hero
      setShowBooking(y > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 items-end">
      {/* Scroll to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`w-10 h-10 rounded-full bg-white border border-stone-200 shadow-lg flex items-center justify-center text-stone-500 hover:text-stone-800 hover:shadow-xl transition-all duration-300 ${
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={16} />
      </button>

      {/* Contact Us floating button */}
      <button
        onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
        className={`flex items-center gap-2 px-4 py-3 rounded-full shadow-xl font-body font-semibold text-sm text-white transition-all duration-300 ${
          showBooking ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        style={{ backgroundColor: "var(--color-forest)" }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--color-forest-light)")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--color-forest)")}
        aria-label="Contact Jan's Fence"
      >
        <CalendarCheck size={16} />
        <span>Contact Us</span>
      </button>
    </div>
  );
}
