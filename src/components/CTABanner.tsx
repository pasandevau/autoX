"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone } from "lucide-react";

export default function CTABanner() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="relative overflow-hidden py-20 lg:py-24">
      {/* Yellow gradient bg — matches the screenshot exactly */}
      <div className="absolute inset-0 brand-gradient" />

      {/* Subtle dot overlay */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(circle, #1A1A2E 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Radial light on right */}
      <div
        className="absolute top-1/2 right-0 w-[400px] h-[400px] -translate-y-1/2 translate-x-1/4 rounded-full opacity-40"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1A1A2E] mb-4 leading-[1.08]">
            Stuck on the road?
            <br />
            We can help right now.
          </h2>
          <p className="text-lg text-[#1A1A2E]/65 font-medium mb-10 max-w-xl mx-auto">
            Don't stress. Our mobile mechanics are ready to be dispatched to your
            location immediately.
          </p>

          <motion.a
            href="tel:1300096616"
            whileHover={{ scale: 1.05, boxShadow: "0 16px 48px rgba(26,26,46,0.20)" }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-4 bg-white text-[#1A1A2E] px-10 py-5 rounded-[20px] font-extrabold text-2xl shadow-xl border border-white/60 transition-all"
          >
            <Phone size={28} className="text-[#FF8C00]" />
            1300 09 66 16
          </motion.a>

          <p className="mt-5 text-[#1A1A2E]/50 text-xs font-bold tracking-[0.18em] uppercase">
            Available 24 Hours a Day, 7 Days a Week
          </p>
        </motion.div>
      </div>
    </section>
  );
}
