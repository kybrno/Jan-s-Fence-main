/*
 * ContactFooter - Jan's Fence
 * Design: Contact section with info cards, then dark footer
 * Forest green contact cards, rust accent on phone number
 */

import { useEffect, useRef, useState } from "react";
import { Phone, Mail, MapPin, Clock, Facebook, User, MessageSquare, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface FormData {
  name: string;
  email: string;
  phone: string;
  town: string;
  message: string;
}

function ContactFormComponent() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    town: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.town.trim() || !formData.message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    if (!formData.email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch("https://formspree.io/f/mpqevopz", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.ok) {
        setSubmitted(true);
        toast.success("Thank you! We'll contact you soon.");
        setFormData({ name: "", email: "", phone: "", town: "", message: "" });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-12 text-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "var(--color-forest)" }}>
          <CheckCircle2 size={32} className="text-white" />
        </div>
        <h3 className="font-display text-2xl font-bold text-stone-900 mb-2">Thank You!</h3>
        <p className="font-body text-stone-600 mb-6">We've received your message and will contact you within one business day.</p>
        <button onClick={() => setSubmitted(false)} className="px-6 py-2.5 rounded-lg font-semibold font-body text-white transition-all duration-200 hover:opacity-90" style={{ backgroundColor: "var(--color-forest)" }}>Send Another Message</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 lg:p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block font-body font-semibold text-stone-900 text-sm mb-2">Full Name *</label>
          <div className="relative">
            <User size={16} className="absolute left-3 top-3.5 text-stone-400" />
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" className="w-full pl-10 pr-4 py-2.5 border border-stone-200 rounded-lg font-body text-sm focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all" style={{ "--tw-ring-color": "var(--color-forest)" } as React.CSSProperties} />
          </div>
        </div>
        <div>
          <label className="block font-body font-semibold text-stone-900 text-sm mb-2">Email Address *</label>
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-3.5 text-stone-400" />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" className="w-full pl-10 pr-4 py-2.5 border border-stone-200 rounded-lg font-body text-sm focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all" style={{ "--tw-ring-color": "var(--color-forest)" } as React.CSSProperties} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block font-body font-semibold text-stone-900 text-sm mb-2">Phone Number *</label>
          <div className="relative">
            <Phone size={16} className="absolute left-3 top-3.5 text-stone-400" />
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="(617) 953-9487" className="w-full pl-10 pr-4 py-2.5 border border-stone-200 rounded-lg font-body text-sm focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all" style={{ "--tw-ring-color": "var(--color-forest)" } as React.CSSProperties} />
          </div>
        </div>
        <div>
          <label className="block font-body font-semibold text-stone-900 text-sm mb-2">Town *</label>
          <div className="relative">
            <MapPin size={16} className="absolute left-3 top-3.5 text-stone-400" />
            <input type="text" name="town" value={formData.town} onChange={handleChange} placeholder="Littleton, MA" className="w-full pl-10 pr-4 py-2.5 border border-stone-200 rounded-lg font-body text-sm focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all" style={{ "--tw-ring-color": "var(--color-forest)" } as React.CSSProperties} />
          </div>
        </div>
      </div>
      <div className="mb-8">
        <label className="block font-body font-semibold text-stone-900 text-sm mb-2">Message *</label>
        <div className="relative">
          <MessageSquare size={16} className="absolute left-3 top-3.5 text-stone-400" />
          <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Tell us about your fencing project..." rows={5} className="w-full pl-10 pr-4 py-2.5 border border-stone-200 rounded-lg font-body text-sm focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all resize-none" style={{ "--tw-ring-color": "var(--color-forest)" } as React.CSSProperties} />
        </div>
      </div>
      <button type="submit" disabled={isSubmitting} className="w-full py-3 rounded-lg font-semibold font-body text-white transition-all duration-200 hover:opacity-90 disabled:opacity-50" style={{ backgroundColor: "var(--color-forest)" }}>
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
      <p className="font-body text-xs text-stone-500 text-center mt-4">We'll respond within one business day.</p>
    </form>
  );
}

const contactItems = [
  {
    icon: Phone,
    title: "Call Us",
    lines: ["617-953-9487", "Mon–Fri, 8am–5pm"],
    accent: true,
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["jansfence@yahoo.com", "Response within 1 business day"],
    accent: false,
  },
  {
    icon: MapPin,
    title: "Location",
    lines: ["671 Great Rd.", "Littleton, MA 01460"],
    accent: false,
  },
  {
    icon: Clock,
    title: "Business Hours",
    lines: ["Mon–Fri: 8am – 6pm", "Sat: 8am – 1pm"],
    accent: false,
  },
];

export default function ContactFooter() {
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
    <>
      {/* Contact section */}
      <section id="contact" className="py-24 lg:py-28 bg-white" ref={ref}>
        <div className="container">
          <div
            className={`mb-12 transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <p className="section-label mb-3">Get in Touch</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-stone-900 leading-tight">
              Ready to Start
              <br />
              <span style={{ color: "var(--color-forest)" }}>Your Project?</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {contactItems.map((item, i) => (
              <div
                key={item.title}
                className={`p-6 rounded-lg border transition-all duration-500 hover:shadow-md ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{
                  transitionDelay: `${i * 80}ms`,
                  borderColor: item.accent ? "var(--color-rust)" : "var(--color-border)",
                  backgroundColor: item.accent ? "rgba(184, 92, 56, 0.04)" : "white",
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: item.accent ? "rgba(184, 92, 56, 0.1)" : "rgba(30, 77, 43, 0.08)" }}
                >
                  <item.icon
                    size={18}
                    style={{ color: item.accent ? "var(--color-rust)" : "var(--color-forest)" }}
                  />
                </div>
                <h4 className="font-body font-semibold text-stone-900 mb-1">{item.title}</h4>
                {item.lines.map((line, li) => (
                  <p
                    key={li}
                    className={`font-body text-sm ${
                      li === 0 && item.accent
                        ? "font-semibold"
                        : "text-stone-500"
                    }`}
                    style={li === 0 && item.accent ? { color: "var(--color-rust)" } : undefined}
                  >
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </div>

          {/* CTA banner */}
          <div
            className={`mt-12 rounded-xl p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-6 transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{
              transitionDelay: "400ms",
              backgroundColor: "var(--color-forest)",
              backgroundImage: "linear-gradient(135deg, var(--color-forest) 0%, var(--color-forest-light) 100%)",
            }}
          >
            <div>
              <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mb-2">
                Get Your Free Estimate Today
              </h3>
              <p className="font-body text-white/70">
                Call 617-953-9487 or fill out the form. Most inquiries answered within one business day.
              </p>
            </div>
            <button
              onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}
              className="flex-shrink-0 bg-white font-semibold font-body px-8 py-3.5 rounded transition-all duration-200 hover:bg-stone-100 hover:shadow-lg"
              style={{ color: "var(--color-forest)" }}
            >
              Get Free Estimate
            </button>
          </div>

          {/* Contact Form */}
          <div id="contact-form" className="mt-16 max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <p className="section-label mb-3">Get In Touch</p>
              <h3 className="font-display text-3xl lg:text-4xl font-bold text-stone-900 leading-tight">
                Send Us Your <span style={{ color: "var(--color-forest)" }}>Information</span>
              </h3>
            </div>
            <ContactFormComponent />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: "var(--color-charcoal)" }} className="pt-16 pb-8">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/images/jans-fence-logo.png"
                  alt="Jan's Fence logo"
                  className="h-14 w-auto"
                />
              </div>
              <p className="font-body text-sm text-white/40 leading-relaxed max-w-xs">
                Littleton's trusted fencing contractor since 2010. 30 years of experience, family-owned, 10-year warranty on all metal and vinyl fences.
              </p>
              <div className="flex gap-3 mt-5">
                <a
                  href="https://www.facebook.com/people/Jans-Fence-Inc/100067796463427/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-colors"
                >
                  <Facebook size={14} />
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h5 className="font-body font-semibold text-white text-sm mb-4">Services</h5>
              <ul className="space-y-2">
                {["Wood Fencing", "Vinyl Fencing", "Metal Fencing", "Free Estimates"].map((s) => (
                  <li key={s}>
                    <button
                      onClick={() => document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })}
                      className="font-body text-sm text-white/40 hover:text-white/70 transition-colors"
                    >
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h5 className="font-body font-semibold text-white text-sm mb-4">Company</h5>
              <ul className="space-y-2">
                {[
                  { label: "About Us", href: "#about" },
                  { label: "Gallery", href: "#gallery" },
                  { label: "Contact", href: "#contact" },
                  { label: "Call: 617-953-9487", href: "tel:617-953-9487" },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-body text-sm text-white/40 hover:text-white/70 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <p className="font-body text-sm text-white/30">
                © 2024 Jan's Fence. All rights reserved. | 671 Great Rd., Littleton, MA 01460
              </p>
              <div className="flex gap-6">
                {[
                  { label: "Privacy Policy", href: "#" },
                  { label: "Terms of Service", href: "#" },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="font-body text-sm text-white/30 hover:text-white/60 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
