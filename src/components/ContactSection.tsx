"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, CalendarDays, Loader2 } from "lucide-react";
import Link from "next/link";

const contactDetails = [
  { icon: Phone,  label: "Phone",        value: "1300 09 66 16",                 href: "tel:1300096616",                      accent: "#FFB300" },
  { icon: Mail,   label: "Email",        value: "admin@autoxpertgroup.org",       href: "mailto:admin@autoxpertgroup.org",     accent: "#FF8C00" },
  { icon: MapPin, label: "Service Area", value: "Adelaide & Surrounding Suburbs", href: null,                                  accent: "#FFB300" },
  { icon: Clock,  label: "Hours",        value: "24/7 — Always Open",            href: null,                                  accent: "#FF8C00" },
];

export default function ContactSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [status,  setStatus]  = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errMsg,  setErrMsg]  = useState("");
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", message: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "inquiry", ...form }),
      });
      const data = await res.json();
      if (!res.ok || data.error) { setErrMsg(data.error ?? "Something went wrong."); setStatus("error"); }
      else setStatus("success");
    } catch {
      setErrMsg("Network error — please try again.");
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="section bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#FFB300]/12 text-[#FF8C00] px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase mb-4">
            Get in Touch
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1A1A2E] mb-4 leading-tight">
            Send Us an Enquiry or
            <br />
            <span className="brand-gradient-text">Book a Service</span>
          </h2>
          <p className="text-lg text-[#1A1A2E]/55 font-medium max-w-xl mx-auto">
            Have a question? Drop us a message and we'll get back to you fast — usually within the hour.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">

          {/* Left: contact details + CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            {contactDetails.map((d) => (
              <div key={d.label} className="flex items-start gap-4 p-5 rounded-2xl bg-[#F8F8F8] border border-black/[0.05]">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${d.accent}18` }}>
                  <d.icon size={20} strokeWidth={2} style={{ color: d.accent }} />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#1A1A2E]/45 uppercase tracking-wider mb-0.5">{d.label}</div>
                  {d.href
                    ? <a href={d.href} className="font-extrabold text-[#1A1A2E] hover:text-[#FF8C00] transition-colors">{d.value}</a>
                    : <div className="font-extrabold text-[#1A1A2E]">{d.value}</div>}
                </div>
              </div>
            ))}

            <motion.a
              href="tel:1300096616"
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-3 btn-brand text-[#1A1A2E] py-4 rounded-2xl font-extrabold text-lg mt-2"
            >
              <Phone size={22} />
              Call for Immediate Help
            </motion.a>

            {/* Book Now CTA */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#FFB300]/30 bg-gradient-to-br from-[#FFF9E6] to-white p-6 mt-1">
              <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                style={{ background: "linear-gradient(90deg,#FFB300,#FF8C00)" }} />
              <p className="text-sm font-bold text-[#1A1A2E]/60 mb-1">Ready to make a booking?</p>
              <p className="text-xs text-[#1A1A2E]/40 mb-4 leading-relaxed">
                Pick your date &amp; time, and we'll come to you. No workshop visit needed.
              </p>
              <Link href="/bookings">
                <motion.div
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2.5 bg-[#1A1A2E] text-white py-3.5 rounded-xl font-extrabold text-sm cursor-pointer"
                >
                  <CalendarDays size={18} />
                  Book a Service Online
                </motion.div>
              </Link>
            </div>
          </motion.div>

          {/* Right: enquiry form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-3 card p-8"
          >
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center gap-4 py-12 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#FFB300]/15 flex items-center justify-center">
                  <CheckCircle size={32} className="text-[#FFB300]" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#1A1A2E]">Enquiry Sent!</h3>
                <p className="text-[#1A1A2E]/60 font-medium max-w-xs leading-relaxed">
                  We received your message and will be in touch very soon. For urgent help, call us directly.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
                  <a href="tel:1300096616"
                    className="flex-1 flex items-center justify-center gap-2 btn-brand text-[#1A1A2E] px-5 py-3 rounded-xl font-extrabold text-sm">
                    <Phone size={16} /> Call Us
                  </a>
                  <Link href="/bookings"
                    className="flex-1 flex items-center justify-center gap-2 bg-[#1A1A2E] text-white px-5 py-3 rounded-xl font-extrabold text-sm">
                    <CalendarDays size={16} /> Book Online
                  </Link>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-[#1A1A2E]/70">Your Name *</label>
                    <input type="text" name="name" required value={form.name} onChange={handleChange}
                      placeholder="e.g. Sarah Johnson"
                      className="w-full px-4 py-3 rounded-xl border border-black/[0.1] bg-[#F8F8F8] text-[#1A1A2E] font-medium text-sm placeholder:text-[#1A1A2E]/30 focus:outline-none focus:ring-2 focus:ring-[#FFB300]/40 focus:border-[#FFB300] transition-all" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-[#1A1A2E]/70">Phone Number *</label>
                    <input type="tel" name="phone" required value={form.phone} onChange={handleChange}
                      placeholder="04XX XXX XXX"
                      className="w-full px-4 py-3 rounded-xl border border-black/[0.1] bg-[#F8F8F8] text-[#1A1A2E] font-medium text-sm placeholder:text-[#1A1A2E]/30 focus:outline-none focus:ring-2 focus:ring-[#FFB300]/40 focus:border-[#FFB300] transition-all" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-[#1A1A2E]/70">Email Address</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange}
                    placeholder="sarah@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-black/[0.1] bg-[#F8F8F8] text-[#1A1A2E] font-medium text-sm placeholder:text-[#1A1A2E]/30 focus:outline-none focus:ring-2 focus:ring-[#FFB300]/40 focus:border-[#FFB300] transition-all" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-[#1A1A2E]/70">Service Needed</label>
                  <select name="service" value={form.service} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-black/[0.1] bg-[#F8F8F8] text-[#1A1A2E] font-medium text-sm focus:outline-none focus:ring-2 focus:ring-[#FFB300]/40 focus:border-[#FFB300] transition-all appearance-none">
                    <option value="">Select a service…</option>
                    <option>General Car Servicing</option>
                    <option>General Repairs</option>
                    <option>Fleet Services</option>
                    <option>Suspension Repairs</option>
                    <option>Safety / Roadworthy Check</option>
                    <option>Pre-Purchase Inspection</option>
                    <option>24/7 Roadside Assistance</option>
                    <option>Other / Not Sure</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-[#1A1A2E]/70">Your Message</label>
                  <textarea name="message" rows={4} value={form.message} onChange={handleChange}
                    placeholder="What's happening with your car? Where are you located? Any other details…"
                    className="w-full px-4 py-3 rounded-xl border border-black/[0.1] bg-[#F8F8F8] text-[#1A1A2E] font-medium text-sm placeholder:text-[#1A1A2E]/30 focus:outline-none focus:ring-2 focus:ring-[#FFB300]/40 focus:border-[#FFB300] transition-all resize-none" />
                </div>

                {status === "error" && (
                  <div className="text-red-600 text-sm font-semibold bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                    ⚠️ {errMsg}
                  </div>
                )}

                <motion.button type="submit" disabled={status === "loading"}
                  whileHover={status !== "loading" ? { scale: 1.02 } : {}}
                  whileTap={status !== "loading" ? { scale: 0.97 } : {}}
                  className="flex items-center justify-center gap-3 btn-brand text-[#1A1A2E] py-4 rounded-xl font-extrabold text-base w-full disabled:opacity-70">
                  {status === "loading"
                    ? <><Loader2 size={18} className="animate-spin" /> Sending…</>
                    : <><Send size={18} /> Send Enquiry</>}
                </motion.button>

                <div className="flex items-center gap-3 my-1">
                  <div className="flex-1 h-px bg-black/08" />
                  <span className="text-[#1A1A2E]/35 text-xs font-semibold">or book directly online</span>
                  <div className="flex-1 h-px bg-black/08" />
                </div>

                <Link href="/bookings">
                  <motion.div
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    className="flex items-center justify-center gap-2.5 border-2 border-[#1A1A2E] text-[#1A1A2E] py-4 rounded-xl font-extrabold text-base w-full cursor-pointer hover:bg-[#1A1A2E] hover:text-white transition-colors"
                  >
                    <CalendarDays size={18} />
                    Book a Service Online
                  </motion.div>
                </Link>

                <p className="text-center text-xs text-[#1A1A2E]/40 font-medium -mt-1">
                  For urgent help call{" "}
                  <a href="tel:1300096616" className="text-[#FF8C00] font-bold">1300 09 66 16</a>
                  {" "}— we respond immediately.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
