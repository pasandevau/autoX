"use client";

import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  Phone, ArrowRight, Star, CheckCircle,
  Send, Zap, MapPin, Clock, Shield, Loader2,
} from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";

/* ─── Carousel images ─────────────────────────────────────────── */
const slides = [
  { src: "https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=1920&q=90&auto=format&fit=crop", alt: "Mobile mechanic servicing a car" },
  { src: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1920&q=90&auto=format&fit=crop", alt: "Car engine detail" },
  { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=90&auto=format&fit=crop", alt: "Professional mechanic tools" },
  { src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=90&auto=format&fit=crop", alt: "Car on Adelaide roads" },
  { src: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&q=90&auto=format&fit=crop", alt: "Driving across Adelaide" },
];

/* ─── Trust badges ─────────────────────────────────────────────── */
const badges = [
  { icon: Shield, label: "Licensed & Insured" },
  { icon: Zap, label: "Same Day Service" },
  { icon: CheckCircle, label: "Fixed Price Quotes" },
  { icon: Clock, label: "No Call-Out Fee" },
];

/* ─── Stats ────────────────────────────────────────────────────── */
const stats = [
  { value: "500+", label: "Happy Customers" },
  { value: "10+", label: "Years Experience" },
  { value: "24/7", label: "Available" },
  { value: "5.0★", label: "Google Rating" },
];

/* ─── Services for the booking form ───────────────────────────── */
const serviceOptions = [
  "Car Servicing",
  "General Repairs",
  "Roadside Assistance",
  "Pre-Purchase Inspection",
  "Safety / Roadworthy",
  "Fleet Services",
  "Suspension Repairs",
  "Other",
];

/* ─── Animation variants ──────────────────────────────────────── */
const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.25 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

/* ═══════════════════════════════════════════════════════════════ */
export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [form, setForm]       = useState({ name: "", phone: "", service: "", suburb: "" });
  const [callStatus, setCallStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);

  useEffect(() => {
    const t = setInterval(next, 5500);
    return () => clearInterval(t);
  }, [next]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setCallStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "callback",
          name: form.name,
          phone: form.phone,
          service: form.service,
          suburb: form.suburb,
        }),
      });
      const data = await res.json();
      if (!res.ok || data.error) setCallStatus("error");
      else setCallStatus("success");
    } catch {
      setCallStatus("error");
    }
  }

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">

      {/* ── BG: Sliding carousel images with Ken Burns ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <motion.img
            src={slides[current].src}
            alt={slides[current].alt}
            initial={{ scale: 1.10 }}
            animate={{ scale: 1.0 }}
            transition={{ duration: 7, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Amber gradient overlay (stronger left for text, fades right so photo shows) ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(108deg, rgba(255,179,0,0.95) 0%, rgba(255,145,0,0.90) 30%, rgba(255,130,0,0.72) 55%, rgba(220,100,0,0.40) 78%, rgba(180,70,0,0.10) 100%)",
        }}
      />

      {/* ── Dark vignette at bottom so stats are readable ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(26,26,46,0.55) 0%, transparent 100%)" }}
      />

      {/* ── Dot texture ── */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle, #1A1A2E 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* ── Floating glow orbs ── */}
      <motion.div
        animate={{ y: [0, -20, 0], scale: [1, 1.07, 1] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
        className="absolute top-24 right-[5%] w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)" }}
      />
      <motion.div
        animate={{ y: [0, 16, 0], scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 9, ease: "easeInOut", delay: 2 }}
        className="absolute top-1/2 right-[22%] w-52 h-52 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)" }}
      />

      {/* ══════════ MAIN CONTENT ══════════ */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 w-full pt-20 pb-16">

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_440px] gap-10 xl:gap-16 items-center">

            {/* ─── LEFT: Hero copy ─────────────────────────────── */}
            <motion.div
              variants={container}
              initial="hidden"
              animate="visible"
            >
              {/* Live availability badge */}
              <motion.div variants={item} className="flex items-center gap-3 mb-6">
                <div className="inline-flex items-center gap-2.5 bg-[#1A1A2E]/85 backdrop-blur-sm text-white pl-2 pr-4 py-2 rounded-full text-xs font-bold tracking-wide">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20 border border-green-400/40">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  </span>
                  Available Now — 24/7 Emergency Service
                </div>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={item}
                className="text-5xl sm:text-6xl lg:text-[4.8rem] xl:text-[5.4rem] font-extrabold text-[#1A1A2E] leading-[0.97] tracking-tight mb-4"
              >
                Adelaide's
                <br />
                <span className="relative inline-block">
                  Most Trusted
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
                    className="absolute -bottom-2 left-0 right-0 h-[6px] bg-[#1A1A2E]/22 rounded-full origin-left"
                  />
                </span>
                <br />
                <span className="text-white drop-shadow-sm">Mobile Mechanic</span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                variants={item}
                className="text-base sm:text-lg lg:text-xl text-[#1A1A2E]/80 font-medium max-w-xl leading-relaxed mb-5"
              >
                We come to you — expert car servicing, repairs &amp; 24/7
                roadside assistance across Adelaide.{" "}
                <strong className="text-[#1A1A2E]">Fast, friendly, always fair.</strong>
              </motion.p>

              {/* Trust badges — single row, compact */}
              <motion.div variants={item} className="flex flex-wrap gap-2 mb-6">
                {badges.map((b) => (
                  <div
                    key={b.label}
                    className="flex items-center gap-1.5 bg-white/28 backdrop-blur-sm border border-white/50 text-[#1A1A2E] px-3 py-1.5 rounded-full text-xs font-bold"
                  >
                    <b.icon size={12} strokeWidth={2.5} />
                    {b.label}
                  </div>
                ))}
              </motion.div>

              {/* CTA buttons */}
              <motion.div variants={item} className="flex flex-col sm:flex-row gap-3 mb-6">
                <motion.a
                  href="tel:1300096616"
                  whileHover={{ scale: 1.04, boxShadow: "0 16px 48px rgba(26,26,46,0.35)" }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-3 bg-[#1A1A2E] text-white px-7 py-3.5 rounded-2xl font-extrabold text-lg shadow-2xl"
                >
                  <Phone size={22} />
                  1300 09 66 16
                </motion.a>
                <motion.a
                  href="#services"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-3 bg-white/32 backdrop-blur-sm border-2 border-white/60 text-[#1A1A2E] px-7 py-3.5 rounded-2xl font-extrabold text-base hover:bg-white/50 transition-all"
                >
                  Our Services
                  <ArrowRight size={20} />
                </motion.a>
              </motion.div>

              {/* Google rating */}
              <motion.div variants={item} className="flex items-center gap-2.5 mb-5">
                <div className="flex items-center gap-0.5 bg-white/25 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/40">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} className="text-[#1A1A2E] fill-[#1A1A2E]" />
                  ))}
                  <span className="text-[#1A1A2E] font-extrabold text-xs ml-1.5">5.0</span>
                </div>
                <span className="text-[#1A1A2E]/75 font-semibold text-xs">
                  Trusted by hundreds of Adelaide drivers
                </span>
              </motion.div>

              {/* Stats row — compact, inline */}
              <motion.div variants={item} className="flex items-center gap-0 border-t border-[#1A1A2E]/15 pt-5">
                {stats.map((s, i) => (
                  <div
                    key={s.label}
                    className={`flex flex-col pr-6 ${i > 0 ? "pl-6 border-l border-[#1A1A2E]/15" : ""}`}
                  >
                    <span className="text-2xl font-extrabold text-[#1A1A2E] leading-none">{s.value}</span>
                    <span className="text-[11px] font-semibold text-[#1A1A2E]/55 mt-0.5 whitespace-nowrap">{s.label}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* ─── RIGHT: Quick booking form card ──────────────── */}
            <motion.div
              initial={{ opacity: 0, x: 40, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.75, delay: 0.4, ease: "easeOut" }}
              className="relative"
            >
              {/* Glow behind card */}
              <div
                className="absolute -inset-3 rounded-3xl blur-2xl opacity-40 pointer-events-none"
                style={{ background: "linear-gradient(135deg, #FFB300 0%, #FF8C00 100%)" }}
              />

              <div className="relative rounded-3xl overflow-hidden border border-white/25 shadow-2xl"
                style={{ background: "rgba(26,26,46,0.78)", backdropFilter: "blur(24px)" }}
              >
                {/* Card header */}
                <div className="px-7 pt-7 pb-5 border-b border-white/10">
                  <div className="flex items-center gap-2.5 mb-1">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-green-400 text-xs font-extrabold tracking-widest uppercase">
                      We Respond Within the Hour
                    </span>
                  </div>
                  <h2 className="text-2xl font-extrabold text-white">Get Help Now</h2>
                  <p className="text-white/50 text-sm font-medium mt-1">
                    Tell us what you need — we'll call you right back.
                  </p>
                </div>

                  {callStatus === "success" ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="px-7 py-8 flex flex-col items-center text-center gap-4"
                    >
                      <div className="w-16 h-16 rounded-full bg-[#FFB300]/20 flex items-center justify-center">
                        <CheckCircle size={32} className="text-[#FFB300]" />
                      </div>
                      <div>
                        <h3 className="text-xl font-extrabold text-white mb-1">We&apos;ll Call You Shortly!</h3>
                        <p className="text-white/55 text-sm font-medium leading-relaxed">
                          Thanks {form.name}! Your callback request has been received.<br />
                          We&apos;ll ring <span className="text-[#FFB300] font-bold">{form.phone}</span> within the hour.
                        </p>
                      </div>
                      <a href="tel:1300096616"
                        className="flex items-center gap-2 border border-white/20 text-white px-6 py-3 rounded-xl font-extrabold text-sm hover:border-[#FFB300]/50 hover:text-[#FFB300] transition-all mt-1">
                        <Phone size={16} /> Can&apos;t wait? Call us now
                      </a>
                    </motion.div>
                  ) : (
                  <form onSubmit={handleSubmit} className="px-7 py-6 flex flex-col gap-4">
                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-extrabold text-white/50 uppercase tracking-widest">Your Name</label>
                      <input
                        type="text" name="name" value={form.name} onChange={handleChange} required
                        placeholder="e.g. Sarah Johnson"
                        className="w-full px-4 py-3 rounded-xl text-sm font-semibold text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#FFB300]/60 transition-all"
                        style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.15)" }}
                      />
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-extrabold text-white/50 uppercase tracking-widest">Your Phone Number</label>
                      <div className="relative">
                        <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#FFB300]" />
                        <input
                          type="tel" name="phone" value={form.phone} onChange={handleChange} required
                          placeholder="04XX XXX XXX"
                          className="w-full pl-9 pr-4 py-3 rounded-xl text-sm font-semibold text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#FFB300]/60 transition-all"
                          style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.15)" }}
                        />
                      </div>
                    </div>

                    {/* Service */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-extrabold text-white/50 uppercase tracking-widest">Service Needed</label>
                      <select name="service" value={form.service} onChange={handleChange} required
                        className="w-full px-4 py-3 rounded-xl text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-[#FFB300]/60 transition-all appearance-none"
                        style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.15)" }}
                      >
                        <option value="" className="bg-[#1A1A2E]">Select a service…</option>
                        {serviceOptions.map((s) => (
                          <option key={s} value={s} className="bg-[#1A1A2E]">{s}</option>
                        ))}
                      </select>
                    </div>

                    {/* Suburb */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-extrabold text-white/50 uppercase tracking-widest">Your Suburb</label>
                      <div className="relative">
                        <MapPin size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#FFB300]" />
                        <input
                          type="text" name="suburb" value={form.suburb} onChange={handleChange}
                          placeholder="e.g. Norwood, Marion, Prospect…"
                          className="w-full pl-9 pr-4 py-3 rounded-xl text-sm font-semibold text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#FFB300]/60 transition-all"
                          style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.15)" }}
                        />
                      </div>
                    </div>

                    {callStatus === "error" && (
                      <p className="text-red-400 text-xs font-semibold text-center">Something went wrong — please try again or call us directly.</p>
                    )}

                    {/* Submit */}
                    <motion.button type="submit" disabled={callStatus === "loading"}
                      whileHover={callStatus !== "loading" ? { scale: 1.02 } : {}}
                      whileTap={callStatus !== "loading" ? { scale: 0.97 } : {}}
                      className="flex items-center justify-center gap-2.5 btn-brand text-[#1A1A2E] py-4 rounded-xl font-extrabold text-base w-full mt-1 disabled:opacity-70"
                    >
                      {callStatus === "loading"
                        ? <><Loader2 size={17} className="animate-spin" /> Sending…</>
                        : <><Send size={17} /> Request Callback — We&apos;ll Call You</>}
                    </motion.button>

                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-px bg-white/10" />
                      <span className="text-white/35 text-xs font-semibold">or call us directly</span>
                      <div className="flex-1 h-px bg-white/10" />
                    </div>

                    <a href="tel:1300096616"
                      className="flex items-center justify-center gap-2.5 border border-white/20 text-white py-3.5 rounded-xl font-extrabold text-base hover:border-[#FFB300]/50 hover:text-[#FFB300] transition-all">
                      <Phone size={18} />1300 09 66 16
                    </a>

                    <p className="text-center text-[11px] text-white/30 font-medium -mt-1">
                      Available 24/7 · Same day in most cases · No lock-in
                    </p>
                  </form>
                  )}
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* ── Slide dots ── */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 lg:left-10 lg:translate-x-0 lg:bottom-28">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} aria-label={`Slide ${i + 1}`}>
            <span
              className={`block rounded-full transition-all duration-350 ${
                i === current
                  ? "w-6 h-2 bg-white"
                  : "w-2 h-2 bg-white/30 hover:bg-white/55"
              }`}
            />
          </button>
        ))}
      </div>

      {/* ── Wave into cream marquee — tall enough to cover any dark edge ── */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none z-10 pointer-events-none">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-14 sm:h-20" style={{ fill: "#FFF3CC" }}>
          <path d="M0,52 C480,96 960,8 1440,52 L1440,80 L0,80 Z" />
        </svg>
      </div>
    </section>
  );
}
