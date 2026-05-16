"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import PageHero from "@/components/PageHero";
import { insights } from "@/data/insights";
import { CheckCircle, ChevronDown, Phone } from "lucide-react";
import { AnimatePresence } from "framer-motion";

const iconEmojis: Record<string, string> = {
  "clipboard-check": "📋",
  droplets: "💧",
  circle: "⭕",
  sun: "☀️",
};

function InsightCard({ insight, index }: { insight: typeof insights[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      className="card overflow-hidden"
    >
      {/* Card header */}
      <div
        className="p-6 cursor-pointer flex items-start justify-between gap-4"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FFB300]/20 to-[#FF8C00]/10 flex items-center justify-center text-2xl flex-shrink-0">
            {iconEmojis[insight.icon] || "🚗"}
          </div>
          <div>
            <h3 className="font-extrabold text-[#1A1A2E] text-lg leading-snug">{insight.title}</h3>
            <p className="text-sm text-[#1A1A2E]/50 font-medium mt-1">{insight.excerpt}</p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.22 }}
          className="flex-shrink-0 mt-1"
        >
          <ChevronDown size={22} className="text-[#FFB300]" />
        </motion.div>
      </div>

      {/* Tips */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-black/[0.05] pt-5">
              <div className="flex flex-col gap-3">
                {insight.tips.map((tip, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#FFB300]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle size={12} className="text-[#FFB300]" strokeWidth={2.5} />
                    </div>
                    <p className="text-sm text-[#1A1A2E]/70 font-medium leading-relaxed">{tip}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function InsightsPage() {
  return (
    <>
      <Navigation />
      <main>
        <PageHero
          badge="Car Care Insights"
          title="Helpful Tips to Keep"
          titleHighlight="Your Car Healthy"
          subtitle="Practical, no-nonsense guides from Adelaide's mobile mechanic team. Click any guide below to expand the tips."
        />

        {/* Quick stats */}
        <section className="py-12 bg-white border-b border-black/[0.05]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { emoji: "📋", value: "5", label: "Expert Guides" },
                { emoji: "💡", value: "40+", label: "Actionable Tips" },
                { emoji: "🚗", value: "All", label: "Makes & Models" },
                { emoji: "🆓", value: "Free", label: "Always Free" },
              ].map((item) => (
                <div key={item.label} className="text-center p-5 rounded-2xl bg-[#F8F8F8]">
                  <div className="text-3xl mb-2">{item.emoji}</div>
                  <div className="text-2xl font-extrabold text-[#1A1A2E]">{item.value}</div>
                  <div className="text-sm font-semibold text-[#1A1A2E]/45 mt-0.5">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Insights */}
        <section className="section bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-[#FFB300]/12 text-[#FF8C00] px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase mb-4">
                Click to Expand
              </div>
              <h2 className="text-3xl font-extrabold text-[#1A1A2E]">
                Your Car Care Guides
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              {insights.map((insight, i) => (
                <InsightCard key={insight.slug} insight={insight} index={i} />
              ))}
            </div>

            {/* Disclaimer + CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-[#FFB300]/12 to-[#FF8C00]/6 text-center"
            >
              <p className="text-sm text-[#1A1A2E]/60 font-medium mb-4">
                <strong className="text-[#1A1A2E]">Not sure what your car needs?</strong> Stop guessing — call us. We'll diagnose it on the spot.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <motion.a
                  href="tel:1300096616"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-2 btn-brand text-[#1A1A2E] px-7 py-3.5 rounded-xl font-extrabold"
                >
                  <Phone size={18} />
                  Call 1300 09 66 16
                </motion.a>
                <Link
                  href="/bookings"
                  className="inline-flex items-center justify-center gap-2 border-2 border-[#1A1A2E]/12 text-[#1A1A2E] px-7 py-3.5 rounded-xl font-extrabold hover:border-[#FFB300]/50 transition-colors"
                >
                  Book a Service
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Link to blog */}
        <section className="section bg-[#F8F8F8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A2E] mb-4">
                Want to Learn More?
              </h2>
              <p className="text-[#1A1A2E]/55 font-medium mb-6 max-w-lg mx-auto">
                Our blog has in-depth articles on car maintenance, safety, buying tips, and more.
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 btn-brand text-[#1A1A2E] px-8 py-4 rounded-2xl font-extrabold text-lg"
              >
                Visit the Blog →
              </Link>
            </motion.div>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
