"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";

const contactDetails = [
  {
    icon: Phone,
    label: "Phone",
    value: "1300 09 66 16",
    href: "tel:1300096616",
    accent: "#FFB300",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@autoxpertgroup.com.au",
    href: "mailto:info@autoxpertgroup.com.au",
    accent: "#FF8C00",
  },
  {
    icon: MapPin,
    label: "Service Area",
    value: "Adelaide & Surrounding Suburbs",
    href: null,
    accent: "#FFB300",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "24/7 — Always Open",
    href: null,
    accent: "#FF8C00",
  },
];

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", service: "", message: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
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
            Book a Service or
            <br />
            <span className="brand-gradient-text">Ask Us Anything</span>
          </h2>
          <p className="text-lg text-[#1A1A2E]/55 font-medium max-w-xl mx-auto">
            We'll get back to you fast — usually within the hour.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">
          {/* Contact details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            {contactDetails.map((detail) => (
              <div
                key={detail.label}
                className="flex items-start gap-4 p-5 rounded-2xl bg-[#F8F8F8] border border-black/[0.05]"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${detail.accent}18` }}
                >
                  <detail.icon size={20} strokeWidth={2} style={{ color: detail.accent }} />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#1A1A2E]/45 uppercase tracking-wider mb-0.5">
                    {detail.label}
                  </div>
                  {detail.href ? (
                    <a
                      href={detail.href}
                      className="font-extrabold text-[#1A1A2E] hover:text-[#FF8C00] transition-colors"
                    >
                      {detail.value}
                    </a>
                  ) : (
                    <div className="font-extrabold text-[#1A1A2E]">{detail.value}</div>
                  )}
                </div>
              </div>
            ))}

            {/* Quick call CTA */}
            <motion.a
              href="tel:1300096616"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-3 btn-brand text-[#1A1A2E] py-4 rounded-2xl font-extrabold text-lg mt-2"
            >
              <Phone size={22} />
              Call for Immediate Help
            </motion.a>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-3 card p-8"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center gap-4 py-12 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#FFB300]/15 flex items-center justify-center">
                  <CheckCircle size={32} className="text-[#FFB300]" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#1A1A2E]">Message Sent!</h3>
                <p className="text-[#1A1A2E]/60 font-medium max-w-xs">
                  We'll get back to you very soon. For urgent help, call us directly.
                </p>
                <a
                  href="tel:1300096616"
                  className="btn-brand text-[#1A1A2E] px-6 py-3 rounded-xl font-extrabold"
                >
                  Call 1300 09 66 16
                </a>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-[#1A1A2E]/70">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="e.g. Sarah Johnson"
                      className="w-full px-4 py-3 rounded-xl border border-black/[0.1] bg-[#F8F8F8] text-[#1A1A2E] font-medium text-sm placeholder:text-[#1A1A2E]/30 focus:outline-none focus:ring-2 focus:ring-[#FFB300]/40 focus:border-[#FFB300] transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-[#1A1A2E]/70">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="04XX XXX XXX"
                      className="w-full px-4 py-3 rounded-xl border border-black/[0.1] bg-[#F8F8F8] text-[#1A1A2E] font-medium text-sm placeholder:text-[#1A1A2E]/30 focus:outline-none focus:ring-2 focus:ring-[#FFB300]/40 focus:border-[#FFB300] transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-[#1A1A2E]/70">Service Needed</label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-black/[0.1] bg-[#F8F8F8] text-[#1A1A2E] font-medium text-sm focus:outline-none focus:ring-2 focus:ring-[#FFB300]/40 focus:border-[#FFB300] transition-all appearance-none"
                  >
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
                  <label className="text-sm font-bold text-[#1A1A2E]/70">Tell Us More</label>
                  <textarea
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="What's happening with your car? Where are you located?"
                    className="w-full px-4 py-3 rounded-xl border border-black/[0.1] bg-[#F8F8F8] text-[#1A1A2E] font-medium text-sm placeholder:text-[#1A1A2E]/30 focus:outline-none focus:ring-2 focus:ring-[#FFB300]/40 focus:border-[#FFB300] transition-all resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-3 btn-brand text-[#1A1A2E] py-4 rounded-xl font-extrabold text-base w-full"
                >
                  <Send size={18} />
                  Send Message
                </motion.button>

                <p className="text-center text-xs text-[#1A1A2E]/40 font-medium">
                  For urgent help call{" "}
                  <a href="tel:1300096616" className="text-[#FF8C00] font-bold">
                    1300 09 66 16
                  </a>{" "}
                  — we respond immediately.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
