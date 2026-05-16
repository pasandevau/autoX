"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import Navigation from "./Navigation";
import Footer from "./Footer";
import CTABanner from "./CTABanner";
import {
  ArrowLeft,
  CheckCircle,
  Phone,
  Wrench,
  Settings,
  Truck,
  Car,
  Shield,
  ClipboardCheck,
  AlertTriangle,
} from "lucide-react";

const iconMap = {
  wrench: Wrench,
  settings: Settings,
  truck: Truck,
  car: Car,
  shield: Shield,
  "clipboard-check": ClipboardCheck,
  "alert-triangle": AlertTriangle,
} as const;

type IconKey = keyof typeof iconMap;

interface ServicePageProps {
  title: string;
  subtitle: string;
  description: string;
  icon: IconKey;
  accent: string;
  includes: string[];
  benefits: { title: string; description: string }[];
  faq: { q: string; a: string }[];
  metaKeywords?: string;
}

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

export default function ServicePageTemplate({
  title,
  subtitle,
  description,
  icon,
  accent,
  includes,
  benefits,
  faq,
}: ServicePageProps) {
  const Icon = iconMap[icon];
  return (
    <>
      <Navigation />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 overflow-hidden brand-gradient">
          {/* Dot pattern */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: `radial-gradient(circle, #1A1A2E 1px, transparent 1px)`,
              backgroundSize: "32px 32px",
            }}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={container}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={item}>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-[#1A1A2E]/60 hover:text-[#1A1A2E] font-semibold text-sm mb-8 transition-colors"
                >
                  <ArrowLeft size={16} />
                  Back to Home
                </Link>
              </motion.div>

              <motion.div variants={item} className="inline-flex items-center gap-2 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-[#1A1A2E]/10 flex items-center justify-center">
                  <Icon size={28} className="text-[#1A1A2E]" strokeWidth={2} />
                </div>
              </motion.div>

              <motion.div
                variants={item}
                className="inline-block bg-[#1A1A2E]/10 text-[#1A1A2E] px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
              >
                AutoXpert Group
              </motion.div>

              <motion.h1
                variants={item}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1A1A2E] mb-4 leading-[1.05] max-w-3xl"
              >
                {title}
              </motion.h1>

              <motion.p
                variants={item}
                className="text-xl text-[#1A1A2E]/65 font-semibold mb-6 max-w-2xl"
              >
                {subtitle}
              </motion.p>

              <motion.p
                variants={item}
                className="text-base text-[#1A1A2E]/60 font-medium max-w-2xl leading-relaxed mb-10"
              >
                {description}
              </motion.p>

              <motion.div variants={item} className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  href="tel:1300096616"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-3 bg-[#1A1A2E] text-white px-8 py-4 rounded-2xl font-extrabold text-lg shadow-xl transition-all"
                >
                  <Phone size={22} />
                  Call 1300 09 66 16
                </motion.a>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-3 bg-white/30 backdrop-blur-sm border-2 border-[#1A1A2E]/20 text-[#1A1A2E] px-8 py-4 rounded-2xl font-extrabold text-lg hover:bg-white/50 transition-all"
                >
                  Get a Free Quote
                </motion.a>
              </motion.div>
            </motion.div>
          </div>

          {/* Wave */}
          <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
            <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-14 fill-white">
              <path d="M0,40 C360,80 1080,0 1440,40 L1440,60 L0,60 Z" />
            </svg>
          </div>
        </section>

        {/* What's Included */}
        <section className="section bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#FFB300]/12 text-[#FF8C00] px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase mb-5">
                  What's Included
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A2E] mb-8 leading-tight">
                  Everything Covered,
                  <br />
                  <span className="brand-gradient-text">Nothing Hidden</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {includes.map((inc) => (
                    <div key={inc} className="flex items-start gap-3 p-4 rounded-xl bg-[#F8F8F8] border border-black/[0.05]">
                      <CheckCircle size={18} className="text-[#FFB300] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span className="text-sm font-semibold text-[#1A1A2E]/80">{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="flex flex-col gap-5">
                {benefits.map((b, i) => (
                  <div
                    key={b.title}
                    className="flex gap-5 p-6 rounded-2xl bg-[#F8F8F8] border border-black/[0.05] hover:border-[#FFB300]/25 hover:bg-white hover:shadow-md transition-all"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-extrabold text-sm"
                      style={{ background: `${i % 2 === 0 ? "#FFB300" : "#FF8C00"}20`, color: i % 2 === 0 ? "#FFB300" : "#FF8C00" }}
                    >
                      0{i + 1}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-[#1A1A2E] mb-1">{b.title}</h3>
                      <p className="text-sm text-[#1A1A2E]/58 font-medium leading-relaxed">{b.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        {faq.length > 0 && (
          <section className="section bg-[#F8F8F8]">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-[#FFB300]/12 text-[#FF8C00] px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase mb-4">
                  FAQ
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A2E]">
                  Common Questions
                </h2>
              </div>
              <div className="flex flex-col gap-4">
                {faq.map((item) => (
                  <div key={item.q} className="card p-6">
                    <h3 className="font-extrabold text-[#1A1A2E] mb-2">{item.q}</h3>
                    <p className="text-sm text-[#1A1A2E]/60 font-medium leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
