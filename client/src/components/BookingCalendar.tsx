/*
 * BookingCalendar - Jan's Fence
 * Design: Dark charcoal background, two-column layout
 * Left: interactive calendar with available/booked days
 * Right: time slot picker + booking form
 * Forest green selected states, rust accents
 */

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

// ─── Types ───────────────────────────────────────────────────────────────────
type BookingStatus = "idle" | "submitting" | "success";

interface BookingForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  service: string;
  notes: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────
const SERVICES = [
  "Wood / Cedar Fencing",
  "Ornamental Iron Fencing",
  "Vinyl / PVC Fencing",
  "Chain-Link / Security Fencing",
  "Fence Repair / Replacement",
  "Gate Installation",
  "Custom / Other",
];

const TIME_SLOTS = [
  "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM",
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// Simulate some pre-booked slots (day-of-month numbers)
const BOOKED_DAYS_SEED = [3, 7, 12, 18, 22, 25];

function getBookedDays(year: number, month: number): Set<number> {
  // Deterministic "fake" bookings based on month
  const base = (year * 12 + month) % 7;
  return new Set(BOOKED_DAYS_SEED.map((d) => ((d + base) % 28) + 1));
}

// ─── Mini Calendar ────────────────────────────────────────────────────────────
function MiniCalendar({
  selectedDate,
  onSelect,
}: {
  selectedDate: Date | null;
  onSelect: (d: Date) => void;
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const bookedDays = getBookedDays(viewYear, viewMonth);

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const isSelected = (day: number) =>
    selectedDate &&
    selectedDate.getDate() === day &&
    selectedDate.getMonth() === viewMonth &&
    selectedDate.getFullYear() === viewYear;

  const isPast = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    return d < today;
  };

  const isWeekend = (day: number) => {
    const dow = new Date(viewYear, viewMonth, day).getDay();
    return dow === 0 || dow === 6;
  };

  const isBooked = (day: number) => bookedDays.has(day);

  const isToday = (day: number) =>
    day === today.getDate() &&
    viewMonth === today.getMonth() &&
    viewYear === today.getFullYear();

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  // Pad to full rows
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div>
      {/* Month nav */}
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={prevMonth}
          className="p-2 rounded hover:bg-white/10 text-white/60 hover:text-white transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft size={18} />
        </button>
        <h3 className="font-display font-semibold text-white text-lg">
          {MONTHS[viewMonth]} {viewYear}
        </h3>
        <button
          onClick={nextMonth}
          className="p-2 rounded hover:bg-white/10 text-white/60 hover:text-white transition-colors"
          aria-label="Next month"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-2">
        {DAYS.map((d) => (
          <div key={d} className="text-center font-mono-label text-[10px] text-white/30 py-1 uppercase tracking-wider">
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, idx) => {
          if (!day) return <div key={`empty-${idx}`} />;

          const disabled = isPast(day) || isWeekend(day) || isBooked(day);
          const selected = isSelected(day);
          const booked = isBooked(day);
          const past = isPast(day);
          const weekend = isWeekend(day);
          const todayCell = isToday(day);

          return (
            <button
              key={day}
              disabled={disabled}
              onClick={() => onSelect(new Date(viewYear, viewMonth, day))}
              className={`
                relative h-9 w-full rounded text-sm font-body font-medium transition-all duration-150
                ${selected
                  ? "text-white shadow-lg scale-105"
                  : disabled
                  ? "text-white/20 cursor-not-allowed"
                  : "text-white/80 hover:text-white hover:scale-105"
                }
              `}
              style={{
                backgroundColor: selected
                  ? "var(--color-forest)"
                  : !disabled && todayCell
                  ? "rgba(255,255,255,0.08)"
                  : !disabled
                  ? "rgba(255,255,255,0.03)"
                  : "transparent",
              }}
              title={booked ? "Fully booked" : past ? "Past date" : weekend ? "Weekends unavailable" : undefined}
            >
              {day}
              {booked && !past && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-red-400/60" />
              )}
              {todayCell && !selected && (
                <span
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                  style={{ backgroundColor: "var(--color-rust)" }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-5 pt-4 border-t border-white/10">
        {[
          { color: "var(--color-forest)", label: "Selected" },
          { color: "rgba(255,255,255,0.08)", label: "Today" },
          { color: "transparent", dotColor: "#f87171", label: "Booked" },
          { color: "transparent", textColor: "rgba(255,255,255,0.2)", label: "Unavailable" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            {item.dotColor ? (
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.dotColor }} />
            ) : (
              <span
                className="w-3 h-3 rounded text-[8px] flex items-center justify-center font-body"
                style={{
                  backgroundColor: item.color,
                  color: item.textColor || "white",
                  border: item.color === "transparent" ? "1px solid rgba(255,255,255,0.1)" : "none",
                }}
              >
                {item.textColor ? "–" : ""}
              </span>
            )}
            <span className="font-mono-label text-[10px] text-white/40">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function BookingCalendar() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [status, setStatus] = useState<BookingStatus>("idle");
  const [form, setForm] = useState<BookingForm>({
    name: "", email: "", phone: "", address: "", service: "", notes: "",
  });
  const [errors, setErrors] = useState<Partial<BookingForm>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const validate = (): boolean => {
    const e: Partial<BookingForm> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    if (!form.service) e.service = "Please select a service";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      toast.error("Please select a date and time slot first.");
      return;
    }
    if (!validate()) return;

    setStatus("submitting");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      toast.success("Consultation booked! We'll confirm within 1 business hour.");
    }, 1500);
  };

  const formatDate = (d: Date) =>
    d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

  if (status === "success") {
    return (
      <section id="booking" className="py-24 lg:py-32" style={{ backgroundColor: "#111111" }}>
        <div className="container">
          <div className="max-w-lg mx-auto text-center">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: "rgba(30, 77, 43, 0.2)" }}
            >
              <CheckCircle2 size={40} style={{ color: "var(--color-sage)" }} />
            </div>
            <h2 className="font-display text-3xl font-bold text-white mb-3">You're Booked!</h2>
            <p className="font-body text-white/60 mb-2">
              <strong className="text-white">{formatDate(selectedDate!)}</strong> at <strong className="text-white">{selectedTime}</strong>
            </p>
            <p className="font-body text-white/60 mb-8">
              A confirmation has been sent to <strong className="text-white">{form.email}</strong>. Our team will call you within 1 business hour to confirm.
            </p>
            <button
              onClick={() => { setStatus("idle"); setSelectedDate(null); setSelectedTime(null); setForm({ name: "", email: "", phone: "", address: "", service: "", notes: "" }); }}
              className="btn-rust px-8 py-3.5 rounded font-semibold font-body"
            >
              Book Another Appointment
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-24 lg:py-32" style={{ backgroundColor: "#111111" }}>
      <div className="container" ref={ref}>
        {/* Header */}
        <div
          className={`mb-12 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="section-label mb-3" style={{ color: "var(--color-rust)" }}>
            Schedule a Visit
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white leading-tight">
              Book Your Free
              <br />
              <span style={{ color: "var(--color-sage)" }}>Consultation</span>
            </h2>
            <p className="font-body text-white/50 max-w-sm leading-relaxed">
              Pick a date, choose a time, and we'll come to you. Free estimates, no obligation.
            </p>
          </div>
        </div>

        {/* Two-column layout */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "150ms" }}
        >
          {/* Left: Calendar + Time Slots */}
          <div
            className="rounded-xl p-6 lg:p-8 border border-white/10"
            style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
          >
            <MiniCalendar selectedDate={selectedDate} onSelect={handleDateSelect} />

            {/* Time slots */}
            {selectedDate && (
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center gap-2 mb-4">
                  <Clock size={14} style={{ color: "var(--color-rust)" }} />
                  <p className="font-body text-sm text-white/70">
                    Available times for <span className="text-white font-medium">{selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                  </p>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {TIME_SLOTS.map((slot) => {
                    const isSelected = selectedTime === slot;
                    // Randomly mark some slots as taken based on date
                    const taken = (selectedDate.getDate() + slot.charCodeAt(0)) % 5 === 0;
                    return (
                      <button
                        key={slot}
                        disabled={taken}
                        onClick={() => setSelectedTime(slot)}
                        className={`py-2 px-1 rounded text-xs font-body font-medium transition-all duration-150 ${
                          isSelected
                            ? "text-white shadow-md"
                            : taken
                            ? "text-white/20 cursor-not-allowed line-through"
                            : "text-white/60 hover:text-white border border-white/10 hover:border-white/30"
                        }`}
                        style={{
                          backgroundColor: isSelected ? "var(--color-forest)" : taken ? "transparent" : "rgba(255,255,255,0.03)",
                        }}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Selected summary */}
            {selectedDate && selectedTime && (
              <div
                className="mt-5 p-3 rounded-lg border"
                style={{ backgroundColor: "rgba(30, 77, 43, 0.15)", borderColor: "rgba(30, 77, 43, 0.4)" }}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} style={{ color: "var(--color-sage)" }} />
                  <p className="font-body text-sm text-white/80">
                    <span className="font-semibold text-white">{formatDate(selectedDate)}</span>
                    {" at "}
                    <span className="font-semibold text-white">{selectedTime}</span>
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right: Booking form */}
          <div
            className="rounded-xl p-6 lg:p-8 border border-white/10"
            style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
          >
            <h3 className="font-display text-xl font-semibold text-white mb-6">Your Details</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="font-body text-xs text-white/50 mb-1.5 block uppercase tracking-wide">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="John & Jane Smith"
                  className={`w-full bg-white/5 border rounded px-3 py-2.5 text-sm text-white placeholder-white/20 font-body focus:outline-none focus:border-white/40 transition-colors ${
                    errors.name ? "border-red-500/50" : "border-white/10"
                  }`}
                />
                {errors.name && (
                  <p className="flex items-center gap-1 mt-1 text-xs text-red-400 font-body">
                    <AlertCircle size={11} /> {errors.name}
                  </p>
                )}
              </div>

              {/* Email + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-body text-xs text-white/50 mb-1.5 block uppercase tracking-wide">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    className={`w-full bg-white/5 border rounded px-3 py-2.5 text-sm text-white placeholder-white/20 font-body focus:outline-none focus:border-white/40 transition-colors ${
                      errors.email ? "border-red-500/50" : "border-white/10"
                    }`}
                  />
                  {errors.email && (
                    <p className="flex items-center gap-1 mt-1 text-xs text-red-400 font-body">
                      <AlertCircle size={11} /> {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label className="font-body text-xs text-white/50 mb-1.5 block uppercase tracking-wide">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="(512) 555-0100"
                    className={`w-full bg-white/5 border rounded px-3 py-2.5 text-sm text-white placeholder-white/20 font-body focus:outline-none focus:border-white/40 transition-colors ${
                      errors.phone ? "border-red-500/50" : "border-white/10"
                    }`}
                  />
                  {errors.phone && (
                    <p className="flex items-center gap-1 mt-1 text-xs text-red-400 font-body">
                      <AlertCircle size={11} /> {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="font-body text-xs text-white/50 mb-1.5 block uppercase tracking-wide">
                  Property Address
                </label>
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="123 Maple Street, Austin, TX 78701"
                  className="w-full bg-white/5 border border-white/10 rounded px-3 py-2.5 text-sm text-white placeholder-white/20 font-body focus:outline-none focus:border-white/40 transition-colors"
                />
              </div>

              {/* Service */}
              <div>
                <label className="font-body text-xs text-white/50 mb-1.5 block uppercase tracking-wide">
                  Service Needed *
                </label>
                <select
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className={`w-full bg-white/5 border rounded px-3 py-2.5 text-sm font-body focus:outline-none focus:border-white/40 transition-colors ${
                    errors.service ? "border-red-500/50" : "border-white/10"
                  } ${form.service ? "text-white" : "text-white/30"}`}
                  style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                >
                  <option value="" disabled style={{ backgroundColor: "#1a1a1a" }}>Select a service...</option>
                  {SERVICES.map((s) => (
                    <option key={s} value={s} style={{ backgroundColor: "#1a1a1a", color: "white" }}>{s}</option>
                  ))}
                </select>
                {errors.service && (
                  <p className="flex items-center gap-1 mt-1 text-xs text-red-400 font-body">
                    <AlertCircle size={11} /> {errors.service}
                  </p>
                )}
              </div>

              {/* Notes */}
              <div>
                <label className="font-body text-xs text-white/50 mb-1.5 block uppercase tracking-wide">
                  Additional Notes
                </label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Tell us about your project — yard size, existing fence, style preferences..."
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded px-3 py-2.5 text-sm text-white placeholder-white/20 font-body focus:outline-none focus:border-white/40 transition-colors resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full py-3.5 rounded font-semibold font-body text-white transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ backgroundColor: "var(--color-rust)" }}
                onMouseEnter={(e) => { if (status !== "submitting") (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--color-rust-light)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--color-rust)"; }}
              >
                {status === "submitting" ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Booking...
                  </span>
                ) : (
                  "Confirm Consultation"
                )}
              </button>

              <p className="font-body text-xs text-white/30 text-center leading-relaxed">
                Free estimate · No obligation · We'll confirm within 1 business hour
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
