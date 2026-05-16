"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

interface PageHeroProps {
  badge: string;
  title: string;
  titleHighlight?: string;
  subtitle: string;
  backHref?: string;
  backLabel?: string;
  cta?: { label: string; href: string; tel?: boolean };
}

export default function PageHero({
  badge,
  title,
  titleHighlight,
  subtitle,
  backHref = "/",
  backLabel = "Back to Home",
  cta,
}: PageHeroProps) {
  return (
    <section className="relative pt-36 pb-24 overflow-hidden brand-gradient">
      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `radial-gradient(circle, #1A1A2E 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 75% 30%, rgba(255,255,255,0.22) 0%, transparent 70%)",
        }}
      />

      {/* Animated floating orbs */}
      <motion.div
        animate={{ y: [0, -18, 0], rotate: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute top-20 right-10 w-48 h-48 rounded-full bg-white/[0.08] blur-2xl pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, 14, 0], rotate: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-10 left-10 w-64 h-64 rounded-full bg-[#1A1A2E]/[0.06] blur-3xl pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={container} initial="hidden" animate="visible">
          <motion.div variants={item}>
            <Link
              href={backHref}
              className="inline-flex items-center gap-2 text-[#1A1A2E]/55 hover:text-[#1A1A2E] font-semibold text-sm mb-8 transition-colors"
            >
              <ArrowLeft size={16} />
              {backLabel}
            </Link>
          </motion.div>

          <motion.div
            variants={item}
            className="inline-block bg-[#1A1A2E]/10 text-[#1A1A2E] px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-5"
          >
            {badge}
          </motion.div>

          <motion.h1
            variants={item}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1A1A2E] leading-[1.05] mb-5 max-w-3xl"
          >
            {title}
            {titleHighlight && (
              <>
                <br />
                <span className="relative inline-block">
                  {titleHighlight}
                  <span className="absolute -bottom-1 left-0 right-0 h-[4px] bg-[#1A1A2E]/20 rounded-full" />
                </span>
              </>
            )}
          </motion.h1>

          <motion.p
            variants={item}
            className="text-lg text-[#1A1A2E]/65 font-semibold max-w-2xl leading-relaxed mb-8"
          >
            {subtitle}
          </motion.p>

          {cta && (
            <motion.div variants={item}>
              {cta.tel ? (
                <motion.a
                  href={cta.href}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-3 bg-[#1A1A2E] text-white px-8 py-4 rounded-2xl font-extrabold text-lg shadow-xl"
                >
                  {cta.label}
                </motion.a>
              ) : (
                <motion.a
                  href={cta.href}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-3 bg-[#1A1A2E] text-white px-8 py-4 rounded-2xl font-extrabold text-lg shadow-xl"
                >
                  {cta.label}
                </motion.a>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Wave */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-14 fill-white">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,60 L0,60 Z" />
        </svg>
      </div>
    </section>
  );
}
