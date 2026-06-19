/*
 * ContactForm - Jan's Fence
 * Design: Contact form section with input fields for name, email, phone, message
 * Forest green accent, responsive layout, form validation
 */

import { useState, useRef, useEffect } from "react";
import { Mail, Phone, User, MessageSquare, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function ContactForm() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    // Email validation
    if (!formData.email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "353760ac-de35-4e64-9869-847d7cb829db",
          subject: `New fence inquiry from ${formData.name}`,
          from_name: formData.name,
          ...formData,
        }),
      });
      const data = await res.json();
      console.log("Web3Forms response:", data);
      if (data.success) {
        setSubmitted(true);
        toast.success("Thank you! We'll contact you soon.");
        setFormData({ name: "", email: "", phone: "", message: "" });
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

  return (
    <section id="contact-form" className="py-24 lg:py-32" style={{ backgroundColor: "var(--color-parchment)" }}>
      <div className="container">
        <div
          ref={ref}
          className={`max-w-3xl mx-auto transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <p className="section-label mb-4">Get In Touch</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-stone-900 leading-tight mb-4">
              Send Us Your <span style={{ color: "var(--color-forest)" }}>Information</span>
            </h2>
            <p className="font-body text-stone-600 max-w-xl mx-auto">
              Fill out the form below and we'll get back to you within one business day with a free estimate.
            </p>
          </div>

          {/* Form */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 lg:p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Name */}
                <div>
                  <label className="block font-body font-semibold text-stone-900 text-sm mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-3.5 text-stone-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full pl-10 pr-4 py-2.5 border border-stone-200 rounded-lg font-body text-sm focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all"
                      style={{ "--tw-ring-color": "var(--color-forest)" } as React.CSSProperties}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block font-body font-semibold text-stone-900 text-sm mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-3.5 text-stone-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full pl-10 pr-4 py-2.5 border border-stone-200 rounded-lg font-body text-sm focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all"
                      style={{ "--tw-ring-color": "var(--color-forest)" } as React.CSSProperties}
                    />
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="mb-6">
                <label className="block font-body font-semibold text-stone-900 text-sm mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3 top-3.5 text-stone-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(617) 953-9487"
                    className="w-full pl-10 pr-4 py-2.5 border border-stone-200 rounded-lg font-body text-sm focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all"
                    style={{ "--tw-ring-color": "var(--color-forest)" } as React.CSSProperties}
                  />
                </div>
              </div>

              {/* Message */}
              <div className="mb-8">
                <label className="block font-body font-semibold text-stone-900 text-sm mb-2">
                  Message *
                </label>
                <div className="relative">
                  <MessageSquare size={16} className="absolute left-3 top-3.5 text-stone-400" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your fencing project..."
                    rows={5}
                    className="w-full pl-10 pr-4 py-2.5 border border-stone-200 rounded-lg font-body text-sm focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all resize-none"
                    style={{ "--tw-ring-color": "var(--color-forest)" } as React.CSSProperties}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-lg font-semibold font-body text-white transition-all duration-200 hover:opacity-90 disabled:opacity-50"
                style={{ backgroundColor: "var(--color-forest)" }}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>

              <p className="font-body text-xs text-stone-500 text-center mt-4">
                We'll respond within one business day.
              </p>
            </form>
          ) : (
            /* Success Message */
            <div className="bg-white rounded-lg shadow-lg p-12 text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: "var(--color-forest)" }}
              >
                <CheckCircle2 size={32} className="text-white" />
              </div>
              <h3 className="font-display text-2xl font-bold text-stone-900 mb-2">
                Thank You!
              </h3>
              <p className="font-body text-stone-600 mb-6">
                We've received your message and will contact you within one business day to discuss your fencing project.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-lg font-semibold font-body text-white transition-all duration-200 hover:opacity-90"
                style={{ backgroundColor: "var(--color-forest)" }}
              >
                Send Another Message
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
