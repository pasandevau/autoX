"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Shield, FileText, Truck, CheckCircle, ArrowRight } from "lucide-react";

const highlights = [
  { icon: Shield, label: "Safety Inspections", desc: "Full roadworthy checks" },
  { icon: FileText, label: "Compliance Reports", desc: "Audit-ready documentation" },
  { icon: Truck, label: "On-Site Servicing", desc: "We come to your depot" },
  { icon: CheckCircle, label: "NDIS Compliant", desc: "Quality & Safeguards standards" },
];

export default function NDISSection() {
  return (
    <section className="section bg-[#1A1A2E] relative overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle, #FFB300 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFB300]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FF8C00]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 bg-[#FFB300]/15 text-[#FFB300] px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase mb-5">
              NDIS Fleet Management
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-5">
              Specialised Fleet Services<br />
              <span style={{ background: "linear-gradient(135deg,#FFB300,#FF8C00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                for NDIS Providers
              </span>
            </h2>
            <p className="text-white/60 font-medium leading-relaxed mb-8 text-lg">
              We provide comprehensive vehicle safety checks, maintenance, and compliance reports for NDIS transport providers across Adelaide — delivered directly to your depot or participant locations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/ndis-fleet"
                  className="inline-flex items-center justify-center gap-2.5 btn-brand text-[#1A1A2E] px-7 py-4 rounded-2xl font-extrabold text-base"
                >
                  Learn More
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
              <motion.a
                href="tel:1300096616"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2.5 border-2 border-white/15 text-white px-7 py-4 rounded-2xl font-extrabold text-base hover:border-[#FFB300]/40 transition-colors"
              >
                Call for Fleet Quote
              </motion.a>
            </div>
          </motion.div>

          {/* Right: feature cards */}
          <div className="grid grid-cols-2 gap-4">
            {highlights.map((h, i) => (
              <motion.div
                key={h.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                className="p-5 rounded-2xl bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.08] transition-colors"
              >
                <div className="w-11 h-11 rounded-xl bg-[#FFB300]/15 flex items-center justify-center mb-4">
                  <h.icon size={20} className="text-[#FFB300]" />
                </div>
                <div className="font-extrabold text-white text-sm mb-1">{h.label}</div>
                <div className="text-white/45 text-xs font-medium">{h.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
