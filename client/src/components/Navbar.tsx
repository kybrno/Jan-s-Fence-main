/*
 * Navbar - Jan's Fence
 * Design: Dark background header, logo with tagline below, white nav text
 * Mobile: Hamburger menu with slide-down drawer
 */

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-stone-900/95 backdrop-blur-sm shadow-lg border-b border-stone-800"
            : "bg-stone-900/80 backdrop-blur-sm"
        }`}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="flex items-center gap-2.5 group"
            >
              {/* Jan's Fence logo */}
              <img
                src="/images/jans-fence-logo.png"
                alt="Jan's Fence logo"
                className="h-[140px] w-auto transition-all duration-300 group-hover:opacity-80"
              />
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="font-body text-sm font-medium transition-colors duration-200 relative group text-white/90 hover:text-white"
                >
                  {link.label}
                  <span
                    className="absolute -bottom-0.5 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                    style={{ backgroundColor: "var(--color-rust)" }}
                  />
                </a>
              ))}
              <a
                href="tel:617-953-9487"
                className="btn-forest px-5 py-2.5 rounded text-sm font-semibold font-body text-white transition-colors duration-200"
              >
                Call 617-953-9487
              </a>
            </nav>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded transition-colors text-white"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu drawer */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={`absolute top-16 left-0 right-0 bg-stone-900 shadow-xl transition-all duration-300 ${
            menuOpen ? "translate-y-0" : "-translate-y-4"
          }`}
        >
          <nav className="flex flex-col p-6 gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="py-3 px-2 text-white/80 font-medium border-b border-stone-800 last:border-0 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="tel:617-953-9487"
              className="mt-4 px-5 py-3 rounded text-center font-semibold font-body text-white btn-forest transition-colors duration-200"
            >
              Call 617-953-9487
            </a>
          </nav>
        </div>
      </div>
    </>
  );
}
