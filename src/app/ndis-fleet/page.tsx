"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import {
  Shield, ClipboardCheck, FileText, Truck, CheckCircle,
  Calendar, Phone, ArrowRight, Users, Star, AlertTriangle, Wrench,
} from "lucide-react";

const services = [
  {
    icon: Shield,
    title: "Safety & Roadworthy Inspections",
    desc: "Comprehensive vehicle safety checks ensuring every vehicle in your NDIS fleet meets SA roadworthy standards and compliance requirements.",
    color: "#FFB300",
  },
  {
    icon: FileText,
    title: "Detailed Compliance Reports",
    desc: "Professionally documented reports for each inspection — ready for audits, NDIS quality checks, and provider compliance records.",
    color: "#FF8C00",
  },
  {
    icon: Wrench,
    title: "Scheduled Fleet Servicing",
    desc: "Regular logbook servicing and maintenance visits to your location. We handle your entire fleet so vehicles are always roadworthy and reliable.",
    color: "#FFB300",
  },
  {
    icon: Calendar,
    title: "Flexible Scheduling",
    desc: "We work around your operation hours. Morning, afternoon, or weekend — our mobile team comes to your depot or participant locations.",
    color: "#FF8C00",
  },
  {
    icon: ClipboardCheck,
    title: "Pre-Trip & Periodic Checks",
    desc: "Structured pre-trip inspection programs and periodic safety reviews to keep drivers and participants safe at all times.",
    color: "#FFB300",
  },
  {
    icon: FileText,
    title: "Maintenance Record Keeping",
    desc: "Digital service histories and maintenance logs for your entire fleet — accessible anytime for NDIS quality management systems.",
    color: "#FF8C00",
  },
];

const steps = [
  {
    step: "01",
    title: "Contact Us",
    desc: "Reach out via phone or our booking form. Tell us about your fleet size, vehicle types, and compliance needs.",
  },
  {
    step: "02",
    title: "Fleet Assessment",
    desc: "We assess your current fleet condition and create a tailored servicing and compliance schedule for your organisation.",
  },
  {
    step: "03",
    title: "On-Site Service",
    desc: "Our mobile mechanics come directly to your depot or location — no downtime, no towing, no disruption to your services.",
  },
  {
    step: "04",
    title: "Reports & Documentation",
    desc: "You receive detailed compliance reports, service records, and safety certificates ready for NDIS audits and internal records.",
  },
];

const benefits = [
  "NDIS Quality & Safeguards Commission compliance support",
  "Vehicles serviced at your location — zero downtime",
  "Detailed reports suitable for NDIS audits",
  "Flexible scheduling around participant transport hours",
  "All makes & models — cars, vans, and modified vehicles",
  "24/7 emergency roadside support for your fleet",
  "Transparent pricing with fleet discounts available",
  "Adelaide-wide coverage including outer suburbs",
];

export default function NDISFleetPage() {
  return (
    <>
      <Navigation />
      <main>
        <PageHero
          badge="NDIS Fleet Management"
          title="Fleet Safety &"
          titleHighlight="NDIS Compliance"
          subtitle="Specialised mobile mechanic services for NDIS transport providers across Adelaide — safety checks, compliance reports, and full fleet servicing delivered to your door."
        />

        {/* Trust bar */}
        <section className="bg-[#1A1A2E] py-5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-8 text-white/70 text-sm font-semibold">
              {["NDIS Provider Specialists", "Mobile — We Come To You", "Compliance Reports Included", "Adelaide-Wide Coverage", "24/7 Emergency Support"].map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FFB300]" />
                  {t}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="section bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="inline-flex items-center gap-2 bg-[#FFB300]/12 text-[#FF8C00] px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase mb-5">
                  Why NDIS Providers Choose Us
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A2E] leading-tight mb-5">
                  Keeping Your Fleet Safe,<br />
                  <span className="brand-gradient-text">Compliant & On the Road</span>
                </h2>
                <p className="text-lg text-[#1A1A2E]/60 font-medium leading-relaxed mb-6">
                  NDIS transport providers carry a significant responsibility — every vehicle must be safe, roadworthy, and fully compliant. We make that easy with mobile fleet servicing that comes to you, complete with documentation ready for any audit.
                </p>
                <p className="text-base text-[#1A1A2E]/55 font-medium leading-relaxed mb-8">
                  Whether you operate a single accessible vehicle or a full transport fleet, AutoXpert Group provides the inspections, maintenance, and reporting your organisation needs to stay compliant with the NDIS Quality & Safeguards Commission standards.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.a
                    href="tel:1300096616"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center justify-center gap-2.5 btn-brand text-[#1A1A2E] px-8 py-4 rounded-2xl font-extrabold text-base"
                  >
                    <Phone size={18} />
                    Call 1300 09 66 16
                  </motion.a>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Link
                      href="/bookings"
                      className="inline-flex items-center justify-center gap-2.5 border-2 border-[#1A1A2E]/15 text-[#1A1A2E] px-8 py-4 rounded-2xl font-extrabold text-base hover:border-[#FFB300]/50 transition-colors"
                    >
                      Book a Fleet Assessment
                      <ArrowRight size={16} />
                    </Link>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="grid grid-cols-1 gap-3"
              >
                {benefits.map((b, i) => (
                  <motion.div
                    key={b}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.06, ease: "easeOut" }}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-[#F8F8F8] border border-black/[0.04]"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#FFB300]/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle size={14} className="text-[#FF8C00]" />
                    </div>
                    <span className="text-sm font-semibold text-[#1A1A2E]">{b}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="section bg-[#F8F8F8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="text-center mb-14"
            >
              <div className="inline-flex items-center gap-2 bg-[#FFB300]/12 text-[#FF8C00] px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase mb-4">
                What We Provide
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A2E] leading-tight">
                Complete NDIS Fleet<br />
                <span className="brand-gradient-text">Service Package</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                  className="card p-6"
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                    style={{ background: `${s.color}18` }}
                  >
                    <s.icon size={22} style={{ color: s.color }} />
                  </div>
                  <h3 className="font-extrabold text-[#1A1A2E] text-base mb-2">{s.title}</h3>
                  <p className="text-sm text-[#1A1A2E]/55 font-medium leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="section bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="text-center mb-14"
            >
              <div className="inline-flex items-center gap-2 bg-[#FFB300]/12 text-[#FF8C00] px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase mb-4">
                Simple Process
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A2E] leading-tight">
                How It Works
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((s, i) => (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                  className="relative"
                >
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-[calc(100%-12px)] w-6 h-px bg-[#FFB300]/30 z-10" />
                  )}
                  <div className="card p-6 h-full">
                    <div className="text-4xl font-black text-[#FFB300]/20 mb-3">{s.step}</div>
                    <h3 className="font-extrabold text-[#1A1A2E] text-base mb-2">{s.title}</h3>
                    <p className="text-sm text-[#1A1A2E]/55 font-medium leading-relaxed">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Who we serve */}
        <section className="section bg-[#1A1A2E]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="inline-flex items-center gap-2 bg-[#FFB300]/15 text-[#FFB300] px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase mb-5">
                  Who We Serve
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-5">
                  Built for NDIS<br />
                  Transport Providers
                </h2>
                <p className="text-white/60 font-medium leading-relaxed mb-8">
                  If your organisation provides supported transport to NDIS participants, vehicle safety and compliance is non-negotiable. We partner with providers of all sizes across Adelaide to make compliance simple.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: Truck, label: "Support Coordinators", desc: "Managing participant transport" },
                    { icon: Users, label: "Day Programs", desc: "Regular fleet requirements" },
                    { icon: Shield, label: "Support Workers", desc: "Individual vehicle checks" },
                    { icon: Star, label: "Registered Providers", desc: "Full compliance packages" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.05] border border-white/[0.07]">
                      <div className="w-10 h-10 rounded-xl bg-[#FFB300]/15 flex items-center justify-center flex-shrink-0">
                        <item.icon size={18} className="text-[#FFB300]" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm">{item.label}</div>
                        <div className="text-white/45 text-xs font-medium mt-0.5">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-white/[0.04] border border-white/[0.08] rounded-3xl p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#FFB300]/15 flex items-center justify-center">
                    <AlertTriangle size={22} className="text-[#FFB300]" />
                  </div>
                  <div>
                    <div className="font-extrabold text-white text-lg">NDIS Compliance Matters</div>
                    <div className="text-white/45 text-sm font-medium">What happens without it</div>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    "Vehicles deemed unroadworthy can't legally transport participants",
                    "Non-compliance can result in NDIS registration issues",
                    "Participants and drivers face increased safety risks",
                    "Insurance claims may be denied for uninspected vehicles",
                    "Audit failures can disrupt service delivery",
                  ].map((risk) => (
                    <div key={risk} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                      </div>
                      <span className="text-white/60 text-sm font-medium leading-relaxed">{risk}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-white/[0.08]">
                  <p className="text-[#FFB300] font-bold text-sm mb-4">Don't risk non-compliance — we make it easy.</p>
                  <motion.a
                    href="tel:1300096616"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center justify-center gap-2.5 btn-brand text-[#1A1A2E] py-4 rounded-2xl font-extrabold text-base w-full"
                  >
                    <Phone size={18} />
                    Talk to Us Today
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 bg-[#FFB300]/12 text-[#FF8C00] px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase mb-5">
                Get Started Today
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A2E] mb-4">
                Ready to Simplify Your<br />
                <span className="brand-gradient-text">Fleet Compliance?</span>
              </h2>
              <p className="text-lg text-[#1A1A2E]/55 font-medium mb-8">
                Call us today or book a fleet assessment online. We'll create a custom compliance plan for your organisation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="tel:1300096616"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-3 btn-brand text-[#1A1A2E] px-8 py-4 rounded-2xl font-extrabold text-lg"
                >
                  <Phone size={20} />
                  Call 1300 09 66 16
                </motion.a>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/bookings"
                    className="inline-flex items-center justify-center gap-3 border-2 border-[#1A1A2E]/15 text-[#1A1A2E] px-8 py-4 rounded-2xl font-extrabold text-lg hover:border-[#FFB300]/50 transition-colors"
                  >
                    Book Fleet Assessment
                    <ArrowRight size={18} />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
