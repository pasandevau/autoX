"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  ChevronLeft, ChevronRight, Clock, User, CheckCircle,
  Phone, Send, Car, Wrench, Settings, Truck, Shield,
  ClipboardCheck, AlertTriangle, MapPin, Calendar,
  ArrowLeft, Loader2, CalendarCheck,
} from "lucide-react";

/* ── Types ─────────────────────────────────────────────────────── */
type Slot = { label: string; display: string; startHour: number; endHour: number; available: boolean };
type FormData = {
  firstName: string; lastName: string; email: string; phone: string;
  service: string; vehicleMake: string; vehicleModel: string; vehicleYear: string;
  suburb: string; notes: string;
};

/* ── Constants ─────────────────────────────────────────────────── */
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const SERVICE_OPTIONS = [
  { value: "car-servicing",    label: "Car Servicing",       icon: Wrench },
  { value: "repairs",          label: "General Repairs",     icon: Settings },
  { value: "fleet",            label: "Fleet Services",      icon: Truck },
  { value: "suspension",       label: "Suspension Repairs",  icon: Car },
  { value: "safety-checks",    label: "Safety & Roadworthy", icon: Shield },
  { value: "pre-purchase",     label: "Pre-Purchase Check",  icon: ClipboardCheck },
  { value: "roadside",         label: "Roadside Assistance", icon: AlertTriangle },
  { value: "other",            label: "Other / Not Sure",    icon: Wrench },
];

const STEP_LABELS = ["Choose Date", "Pick Time", "Your Details", "Confirm"];

/* ── Helpers ───────────────────────────────────────────────────── */
function getCalendarDays(year: number, month: number): (number | null)[] {
  const firstDow = new Date(year, month, 1).getDay(); // 0=Sun
  const offset   = (firstDow + 6) % 7;               // Mon=0 system
  const total    = new Date(year, month + 1, 0).getDate();
  const days: (number | null)[] = Array(offset).fill(null);
  for (let d = 1; d <= total; d++) days.push(d);
  return days;
}

function isPast(year: number, month: number, day: number): boolean {
  const today = new Date();
  const d     = new Date(year, month, day);
  const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return d <= todayMidnight;
}

function toDateStr(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function formatDateLong(dateStr: string): string {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-AU", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
}

/* ── Slide variants ────────────────────────────────────────────── */
const slideVariants = {
  enter:  (dir: number) => ({ x: dir * 60,  opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.35, ease: "easeOut" as const } },
  exit:   (dir: number) => ({ x: dir * -60, opacity: 0, transition: { duration: 0.22, ease: "easeIn" as const } }),
};

/* ══════════════════════════════════════════════════════════════════
   Main Component
══════════════════════════════════════════════════════════════════ */
export default function BookingWizard() {
  const today       = new Date();
  const [step, setStep]         = useState<1|2|3|4>(1);
  const [dir,  setDir]          = useState<1|-1>(1);
  const [calYear,  setCalYear]  = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [calDir,   setCalDir]   = useState<1|-1>(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [slots,        setSlots]        = useState<Slot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError,   setSlotsError]   = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [submitStatus, setSubmitStatus] = useState<"idle"|"loading"|"success"|"error">("idle");
  const [errorMsg,  setErrorMsg]  = useState("");
  const [eventLink, setEventLink] = useState("");
  const [form, setForm] = useState<FormData>({
    firstName: "", lastName: "", email: "", phone: "",
    service: "", vehicleMake: "", vehicleModel: "", vehicleYear: "",
    suburb: "", notes: "",
  });

  // Pre-fill from URL params
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const updates: Partial<FormData> = {};
    if (p.get("service")) updates.service = p.get("service")!;
    if (p.get("suburb"))  updates.suburb  = p.get("suburb")!;
    if (p.get("phone"))   updates.phone   = p.get("phone")!;
    if (Object.keys(updates).length) setForm((f) => ({ ...f, ...updates }));
  }, []);

  const ALL_SLOTS: Slot[] = [
    { label: "7:00 – 8:00 AM",      display: "7 AM",  startHour: 7,  endHour: 8,  available: true },
    { label: "8:00 – 9:00 AM",      display: "8 AM",  startHour: 8,  endHour: 9,  available: true },
    { label: "9:00 – 10:00 AM",     display: "9 AM",  startHour: 9,  endHour: 10, available: true },
    { label: "10:00 – 11:00 AM",    display: "10 AM", startHour: 10, endHour: 11, available: true },
    { label: "11:00 AM – 12:00 PM", display: "11 AM", startHour: 11, endHour: 12, available: true },
    { label: "12:00 – 1:00 PM",     display: "12 PM", startHour: 12, endHour: 13, available: true },
    { label: "1:00 – 2:00 PM",      display: "1 PM",  startHour: 13, endHour: 14, available: true },
    { label: "2:00 – 3:00 PM",      display: "2 PM",  startHour: 14, endHour: 15, available: true },
    { label: "3:00 – 4:00 PM",      display: "3 PM",  startHour: 15, endHour: 16, available: true },
    { label: "4:00 – 5:00 PM",      display: "4 PM",  startHour: 16, endHour: 17, available: true },
    { label: "5:00 – 6:00 PM",      display: "5 PM",  startHour: 17, endHour: 18, available: true },
    { label: "6:00 – 7:00 PM",      display: "6 PM",  startHour: 18, endHour: 19, available: true },
  ];

  // Fetch availability whenever selectedDate changes
  useEffect(() => {
    if (!selectedDate) return;
    setSlotsLoading(true);
    setSlotsError(false);
    setSlots([]);
    setSelectedSlot(null);
    fetch(`/api/availability?date=${selectedDate}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.slots && d.slots.length > 0) {
          setSlots(d.slots);
        } else {
          // API returned no slots or an error — fall back to showing all slots
          setSlotsError(true);
          setSlots(ALL_SLOTS);
        }
      })
      .catch(() => {
        setSlotsError(true);
        setSlots(ALL_SLOTS);
      })
      .finally(() => setSlotsLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  function goTo(next: 1|2|3|4) {
    setDir(next > step ? 1 : -1);
    setStep(next);
  }

  function prevMonth() {
    setCalDir(-1);
    if (calMonth === 0) { setCalMonth(11); setCalYear((y) => y - 1); }
    else setCalMonth((m) => m - 1);
  }
  function nextMonth() {
    setCalDir(1);
    if (calMonth === 11) { setCalMonth(0); setCalYear((y) => y + 1); }
    else setCalMonth((m) => m + 1);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleConfirm() {
    setSubmitStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          preferredDate: selectedDate,
          preferredTime: selectedSlot?.label ?? "",
        }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setErrorMsg(data.error ?? "Something went wrong. Please try again.");
        setSubmitStatus("error");
      } else {
        setEventLink(data.eventLink ?? "");
        setSubmitStatus("success");
      }
    } catch {
      setErrorMsg("Network error — please check your connection.");
      setSubmitStatus("error");
    }
  }

  const calDays = getCalendarDays(calYear, calMonth);

  /* ── Step indicator ─────────────────────────────────────────── */
  const StepIndicator = () => (
    <div className="flex items-center justify-center gap-0 mb-8">
      {STEP_LABELS.map((label, i) => {
        const n = (i + 1) as 1|2|3|4;
        const done   = step > n;
        const active = step === n;
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-extrabold border-2 transition-all duration-300 ${
                done   ? "bg-[#FFB300] border-[#FFB300] text-[#1A1A2E]" :
                active ? "bg-[#1A1A2E] border-[#1A1A2E] text-white" :
                         "bg-white border-black/10 text-[#1A1A2E]/30"
              }`}>
                {done ? <CheckCircle size={16} /> : n}
              </div>
              <span className={`text-[10px] font-bold tracking-wide whitespace-nowrap hidden sm:block ${
                active ? "text-[#1A1A2E]" : done ? "text-[#FF8C00]" : "text-[#1A1A2E]/30"
              }`}>{label}</span>
            </div>
            {i < 3 && (
              <div className={`w-12 sm:w-20 h-0.5 mx-1 transition-all duration-500 ${
                step > n ? "bg-[#FFB300]" : "bg-black/08"
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );

  /* ── Success screen ─────────────────────────────────────────── */
  if (submitStatus === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card p-10 lg:p-14 flex flex-col items-center text-center gap-5 max-w-2xl mx-auto"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 250, delay: 0.15 }}
          className="w-24 h-24 rounded-full bg-[#FFB300]/15 flex items-center justify-center"
        >
          <CalendarCheck size={44} className="text-[#FFB300]" />
        </motion.div>
        <h3 className="text-3xl font-extrabold text-[#1A1A2E]">Booking Confirmed!</h3>
        <div className="bg-[#F8F8F8] rounded-2xl px-6 py-4 w-full text-left space-y-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#1A1A2E]/70">
            <Calendar size={15} className="text-[#FFB300]" />
            {formatDateLong(selectedDate)}
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-[#1A1A2E]/70">
            <Clock size={15} className="text-[#FFB300]" />
            {selectedSlot?.label}
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-[#1A1A2E]/70">
            <MapPin size={15} className="text-[#FFB300]" />
            {form.suburb}, Adelaide SA
          </div>
        </div>
        <p className="text-[#1A1A2E]/55 font-medium text-sm max-w-xs leading-relaxed">
          We've added this to our calendar and will call you to confirm details. Check your email for a calendar invite.
        </p>
        {eventLink && (
          <a href={eventLink} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#FF8C00] hover:underline">
            <Calendar size={15} />
            View in Google Calendar →
          </a>
        )}
        <a href="tel:1300096616"
          className="btn-brand text-[#1A1A2E] px-8 py-4 rounded-2xl font-extrabold text-base flex items-center gap-2 mt-2">
          <Phone size={18} />
          1300 09 66 16
        </a>
        <button onClick={() => { setStep(1); setSubmitStatus("idle"); setSelectedDate(""); setSelectedSlot(null); }}
          className="text-sm text-[#1A1A2E]/40 hover:text-[#FF8C00] font-semibold transition-colors">
          Book Another Service
        </button>
      </motion.div>
    );
  }

  return (
    <div className="card p-6 sm:p-8 lg:p-10 max-w-3xl mx-auto">
      <StepIndicator />

      <AnimatePresence mode="wait" custom={dir}>
        {/* ══ STEP 1: CALENDAR ══════════════════════════════════ */}
        {step === 1 && (
          <motion.div key="step1" custom={dir} variants={slideVariants}
            initial="enter" animate="center" exit="exit">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-extrabold text-[#1A1A2E]">Pick a Date</h2>
              <p className="text-sm text-[#1A1A2E]/50 font-medium mt-1">
                Select a date to see available time slots
              </p>
            </div>

            {/* Month navigation */}
            <div className="flex items-center justify-between mb-4 px-1">
              <button onClick={prevMonth}
                className="w-9 h-9 rounded-xl hover:bg-[#FFB300]/10 flex items-center justify-center transition-colors group">
                <ChevronLeft size={18} className="text-[#1A1A2E]/50 group-hover:text-[#FF8C00]" />
              </button>
              <AnimatePresence mode="wait">
                <motion.span key={`${calYear}-${calMonth}`}
                  initial={{ opacity: 0, y: calDir > 0 ? 8 : -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: calDir > 0 ? -8 : 8 }}
                  transition={{ duration: 0.2 }}
                  className="text-base font-extrabold text-[#1A1A2E]">
                  {MONTHS[calMonth]} {calYear}
                </motion.span>
              </AnimatePresence>
              <button onClick={nextMonth}
                className="w-9 h-9 rounded-xl hover:bg-[#FFB300]/10 flex items-center justify-center transition-colors group">
                <ChevronRight size={18} className="text-[#1A1A2E]/50 group-hover:text-[#FF8C00]" />
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 mb-2">
              {DAYS.map((d) => (
                <div key={d} className="text-center text-[10px] font-extrabold text-[#1A1A2E]/30 uppercase tracking-wider py-2">
                  {d}
                </div>
              ))}
            </div>

            {/* Day grid */}
            <AnimatePresence mode="wait">
              <motion.div key={`${calYear}-${calMonth}-grid`}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-7 gap-1">
                {calDays.map((day, i) => {
                  if (!day) return <div key={`e-${i}`} />;
                  const dateStr = toDateStr(calYear, calMonth, day);
                  const past    = isPast(calYear, calMonth, day);
                  const selected = selectedDate === dateStr;
                  const isToday  = dateStr === toDateStr(today.getFullYear(), today.getMonth(), today.getDate());
                  return (
                    <button
                      key={day}
                      disabled={past}
                      onClick={() => {
                        setSelectedDate(dateStr);
                        goTo(2);
                      }}
                      className={`relative aspect-square flex flex-col items-center justify-center rounded-xl text-sm font-bold transition-all duration-200 ${
                        past    ? "opacity-25 cursor-not-allowed text-[#1A1A2E]/50" :
                        selected ? "bg-[#FFB300] text-[#1A1A2E] shadow-md scale-105" :
                                   "hover:bg-[#FFB300]/12 hover:text-[#FF8C00] text-[#1A1A2E]"
                      }`}
                    >
                      {day}
                      {isToday && !selected && (
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#FFB300]" />
                      )}
                    </button>
                  );
                })}
              </motion.div>
            </AnimatePresence>

            <p className="text-center text-xs text-[#1A1A2E]/35 font-medium mt-6">
              Bookings available Mon – Sun · Roadside assistance available 24/7 — call <span className="text-[#FF8C00] font-bold">1300 09 66 16</span>
            </p>
          </motion.div>
        )}

        {/* ══ STEP 2: TIME SLOTS ════════════════════════════════ */}
        {step === 2 && (
          <motion.div key="step2" custom={dir} variants={slideVariants}
            initial="enter" animate="center" exit="exit">
            <div className="flex items-center gap-3 mb-6">
              <button onClick={() => goTo(1)}
                className="w-9 h-9 rounded-xl hover:bg-[#FFB300]/10 flex items-center justify-center transition-colors group flex-shrink-0">
                <ArrowLeft size={17} className="text-[#1A1A2E]/50 group-hover:text-[#FF8C00]" />
              </button>
              <div>
                <h2 className="text-2xl font-extrabold text-[#1A1A2E]">Pick a Time</h2>
                <p className="text-sm text-[#FFB300] font-bold mt-0.5">
                  {formatDateLong(selectedDate)}
                </p>
              </div>
            </div>

            {slotsLoading ? (
              <div className="flex flex-col items-center justify-center py-16 gap-4">
                <Loader2 size={32} className="text-[#FFB300] animate-spin" />
                <p className="text-sm font-semibold text-[#1A1A2E]/50">Checking availability…</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 mb-6">
                  {slots.map((slot) => {
                    const selected = selectedSlot?.label === slot.label;
                    return (
                      <button
                        key={slot.label}
                        disabled={!slot.available}
                        onClick={() => {
                          setSelectedSlot(slot);
                          goTo(3);
                        }}
                        className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-200 ${
                          !slot.available
                            ? "border-black/[0.05] bg-[#F5F5F5] cursor-not-allowed opacity-60"
                            : selected
                            ? "border-[#FFB300] bg-[#FFB300]/8 shadow-md scale-[1.02]"
                            : "border-black/[0.07] hover:border-[#FFB300]/60 hover:bg-[#FFB300]/6 bg-white"
                        }`}
                      >
                        <Clock size={18} className={slot.available ? (selected ? "text-[#FF8C00]" : "text-[#FFB300]") : "text-[#1A1A2E]/20"} />
                        <span className={`font-extrabold text-sm text-center leading-tight ${
                          slot.available ? "text-[#1A1A2E]" : "text-[#1A1A2E]/30"
                        }`}>
                          {slot.label}
                        </span>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          slot.available
                            ? "bg-green-100 text-green-700"
                            : "bg-[#1A1A2E]/06 text-[#1A1A2E]/30"
                        }`}>
                          {slot.available ? "Available" : "Booked"}
                        </span>
                      </button>
                    );
                  })}
                </div>
                {slotsError ? (
                  <p className="text-center text-xs text-[#1A1A2E]/40 font-medium bg-[#FFF9E6] border border-[#FFB300]/30 rounded-xl px-4 py-2.5">
                    ⚡ Showing estimated availability — we'll confirm your slot by phone within the hour.
                  </p>
                ) : (
                  <p className="text-center text-xs text-[#1A1A2E]/35 font-medium">
                    Each slot is a 1-hour window. Exact arrival time confirmed by phone.
                  </p>
                )}
              </>
            )}
          </motion.div>
        )}

        {/* ══ STEP 3: DETAILS ═══════════════════════════════════ */}
        {step === 3 && (
          <motion.div key="step3" custom={dir} variants={slideVariants}
            initial="enter" animate="center" exit="exit">
            <div className="flex items-center gap-3 mb-6">
              <button onClick={() => goTo(2)}
                className="w-9 h-9 rounded-xl hover:bg-[#FFB300]/10 flex items-center justify-center transition-colors group flex-shrink-0">
                <ArrowLeft size={17} className="text-[#1A1A2E]/50 group-hover:text-[#FF8C00]" />
              </button>
              <div>
                <h2 className="text-2xl font-extrabold text-[#1A1A2E]">Your Details</h2>
                <p className="text-sm text-[#1A1A2E]/45 font-medium mt-0.5">
                  {formatDateLong(selectedDate)} · {selectedSlot?.label}
                </p>
              </div>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); goTo(4); }} className="flex flex-col gap-6">
              {/* Contact */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-lg bg-[#FFB300]/15 flex items-center justify-center">
                    <User size={12} className="text-[#FF8C00]" />
                  </div>
                  <span className="font-extrabold text-sm text-[#1A1A2E]">Contact Info</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { name: "firstName", label: "First Name *", placeholder: "Sarah",            type: "text",  required: true },
                    { name: "lastName",  label: "Last Name",    placeholder: "Johnson",           type: "text",  required: false },
                    { name: "phone",     label: "Phone *",      placeholder: "04XX XXX XXX",      type: "tel",   required: true },
                    { name: "email",     label: "Email",        placeholder: "sarah@example.com", type: "email", required: false },
                  ].map((f) => (
                    <div key={f.name} className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-[#1A1A2E]/55">{f.label}</label>
                      <input type={f.type} name={f.name} required={f.required}
                        value={form[f.name as keyof FormData]} onChange={handleChange}
                        placeholder={f.placeholder}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-black/[0.1] bg-[#F8F8F8] text-[#1A1A2E] font-medium text-sm placeholder:text-[#1A1A2E]/25 focus:outline-none focus:ring-2 focus:ring-[#FFB300]/40 focus:border-[#FFB300] transition-all" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Service */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-lg bg-[#FFB300]/15 flex items-center justify-center">
                    <Wrench size={12} className="text-[#FF8C00]" />
                  </div>
                  <span className="font-extrabold text-sm text-[#1A1A2E]">Service Required *</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {SERVICE_OPTIONS.map((opt) => (
                    <label key={opt.value}
                      className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 cursor-pointer transition-all text-center ${
                        form.service === opt.value
                          ? "border-[#FFB300] bg-[#FFB300]/8"
                          : "border-black/[0.07] hover:border-[#FFB300]/40 bg-[#F8F8F8]"
                      }`}>
                      <input type="radio" name="service" value={opt.value} required
                        checked={form.service === opt.value} onChange={handleChange} className="sr-only" />
                      <opt.icon size={16} className={form.service === opt.value ? "text-[#FF8C00]" : "text-[#1A1A2E]/35"} />
                      <span className="text-[11px] font-bold text-[#1A1A2E]/70 leading-tight">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Vehicle + Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded-lg bg-[#FFB300]/15 flex items-center justify-center">
                      <Car size={12} className="text-[#FF8C00]" />
                    </div>
                    <span className="font-extrabold text-sm text-[#1A1A2E]">Vehicle</span>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    {[
                      { name: "vehicleMake",  label: "Make",  placeholder: "Toyota" },
                      { name: "vehicleModel", label: "Model", placeholder: "Camry" },
                      { name: "vehicleYear",  label: "Year",  placeholder: "2019" },
                    ].map((f) => (
                      <div key={f.name} className="flex flex-col gap-1">
                        <label className="text-xs font-bold text-[#1A1A2E]/55">{f.label}</label>
                        <input type="text" name={f.name}
                          value={form[f.name as keyof FormData]} onChange={handleChange}
                          placeholder={f.placeholder}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-black/[0.1] bg-[#F8F8F8] text-[#1A1A2E] font-medium text-sm placeholder:text-[#1A1A2E]/25 focus:outline-none focus:ring-2 focus:ring-[#FFB300]/40 focus:border-[#FFB300] transition-all" />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded-lg bg-[#FFB300]/15 flex items-center justify-center">
                      <MapPin size={12} className="text-[#FF8C00]" />
                    </div>
                    <span className="font-extrabold text-sm text-[#1A1A2E]">Location</span>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-[#1A1A2E]/55">Your Suburb *</label>
                      <input type="text" name="suburb" required
                        value={form.suburb} onChange={handleChange}
                        placeholder="e.g. Norwood"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-black/[0.1] bg-[#F8F8F8] text-[#1A1A2E] font-medium text-sm placeholder:text-[#1A1A2E]/25 focus:outline-none focus:ring-2 focus:ring-[#FFB300]/40 focus:border-[#FFB300] transition-all" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-[#1A1A2E]/55">Notes</label>
                      <textarea name="notes" rows={4} value={form.notes} onChange={handleChange}
                        placeholder="Describe the issue, warning lights, symptoms…"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-black/[0.1] bg-[#F8F8F8] text-[#1A1A2E] font-medium text-sm placeholder:text-[#1A1A2E]/25 focus:outline-none focus:ring-2 focus:ring-[#FFB300]/40 focus:border-[#FFB300] transition-all resize-none" />
                    </div>
                  </div>
                </div>
              </div>

              <button type="submit"
                className="flex items-center justify-center gap-2.5 btn-brand text-[#1A1A2E] py-4 rounded-2xl font-extrabold text-base w-full">
                Review Booking →
              </button>
            </form>
          </motion.div>
        )}

        {/* ══ STEP 4: CONFIRM ═══════════════════════════════════ */}
        {step === 4 && (
          <motion.div key="step4" custom={dir} variants={slideVariants}
            initial="enter" animate="center" exit="exit">
            <div className="flex items-center gap-3 mb-6">
              <button onClick={() => goTo(3)}
                className="w-9 h-9 rounded-xl hover:bg-[#FFB300]/10 flex items-center justify-center transition-colors group flex-shrink-0">
                <ArrowLeft size={17} className="text-[#1A1A2E]/50 group-hover:text-[#FF8C00]" />
              </button>
              <div>
                <h2 className="text-2xl font-extrabold text-[#1A1A2E]">Confirm Booking</h2>
                <p className="text-sm text-[#1A1A2E]/45 font-medium mt-0.5">
                  Review the details below before confirming
                </p>
              </div>
            </div>

            {/* Summary card */}
            <div className="rounded-2xl border-2 border-[#FFB300]/30 bg-gradient-to-br from-[#FFF9E6] to-white p-6 mb-6 space-y-4">
              <div className="flex items-start gap-3 pb-4 border-b border-[#FFB300]/20">
                <div className="w-10 h-10 rounded-xl bg-[#FFB300]/15 flex items-center justify-center flex-shrink-0">
                  <Calendar size={18} className="text-[#FF8C00]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#1A1A2E]/40 uppercase tracking-wider">Date & Time</div>
                  <div className="font-extrabold text-[#1A1A2E] mt-0.5">{formatDateLong(selectedDate)}</div>
                  <div className="text-sm font-semibold text-[#FF8C00]">{selectedSlot?.label}</div>
                </div>
                <button onClick={() => goTo(1)} className="ml-auto text-xs font-bold text-[#1A1A2E]/35 hover:text-[#FF8C00] transition-colors">Edit</button>
              </div>

              <div className="flex items-start gap-3 pb-4 border-b border-[#FFB300]/20">
                <div className="w-10 h-10 rounded-xl bg-[#FFB300]/15 flex items-center justify-center flex-shrink-0">
                  <Wrench size={18} className="text-[#FF8C00]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#1A1A2E]/40 uppercase tracking-wider">Service</div>
                  <div className="font-extrabold text-[#1A1A2E] mt-0.5">
                    {SERVICE_OPTIONS.find((s) => s.value === form.service)?.label ?? form.service}
                  </div>
                  {(form.vehicleMake || form.vehicleModel) && (
                    <div className="text-sm font-semibold text-[#1A1A2E]/55 mt-0.5">
                      {[form.vehicleYear, form.vehicleMake, form.vehicleModel].filter(Boolean).join(" ")}
                    </div>
                  )}
                </div>
                <button onClick={() => goTo(3)} className="ml-auto text-xs font-bold text-[#1A1A2E]/35 hover:text-[#FF8C00] transition-colors">Edit</button>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FFB300]/15 flex items-center justify-center flex-shrink-0">
                  <User size={18} className="text-[#FF8C00]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#1A1A2E]/40 uppercase tracking-wider">Contact</div>
                  <div className="font-extrabold text-[#1A1A2E] mt-0.5">{form.firstName} {form.lastName}</div>
                  <div className="text-sm font-semibold text-[#1A1A2E]/55">{form.phone}</div>
                  {form.email && <div className="text-sm font-semibold text-[#1A1A2E]/55">{form.email}</div>}
                  <div className="text-sm font-semibold text-[#1A1A2E]/55 flex items-center gap-1 mt-0.5">
                    <MapPin size={12} className="text-[#FFB300]" /> {form.suburb}, Adelaide SA
                  </div>
                </div>
                <button onClick={() => goTo(3)} className="ml-auto text-xs font-bold text-[#1A1A2E]/35 hover:text-[#FF8C00] transition-colors">Edit</button>
              </div>

              {form.notes && (
                <div className="pt-3 border-t border-[#FFB300]/20">
                  <div className="text-xs font-bold text-[#1A1A2E]/40 uppercase tracking-wider mb-1">Notes</div>
                  <p className="text-sm text-[#1A1A2E]/60 font-medium">{form.notes}</p>
                </div>
              )}
            </div>

            {submitStatus === "error" && (
              <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4">
                <span className="text-red-500 font-bold text-sm flex-shrink-0">⚠️</span>
                <p className="text-red-700 text-sm font-medium">{errorMsg}</p>
              </div>
            )}

            <motion.button
              onClick={handleConfirm}
              disabled={submitStatus === "loading"}
              whileHover={submitStatus !== "loading" ? { scale: 1.02 } : {}}
              whileTap={submitStatus !== "loading" ? { scale: 0.97 } : {}}
              className="flex items-center justify-center gap-3 btn-brand text-[#1A1A2E] py-4 rounded-2xl font-extrabold text-lg w-full disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {submitStatus === "loading" ? (
                <><Loader2 size={20} className="animate-spin" /> Confirming…</>
              ) : (
                <><Send size={18} /> Confirm Booking</>
              )}
            </motion.button>
            <p className="text-center text-xs text-[#1A1A2E]/35 font-medium mt-3">
              This will be added directly to our calendar. We'll call you to confirm within the hour.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
