"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, Navigation, ThumbsUp } from "lucide-react";
import VanDriveScene from "@/components/animations/VanDriveScene";

const steps = [
  {
    number: "01",
    icon: Phone,
    title: "Give Us a Call",
    description:
      "Call or message us anytime. Tell us what's happening with your car and where you are. We'll give you a clear quote on the spot — no obligation.",
  },
  {
    number: "02",
    icon: Navigation,
    title: "We Come to You",
    description:
      "Our mobile mechanic heads straight to your location — home, work, or roadside. No towing, no waiting rooms, no hassle.",
  },
  {
    number: "03",
    icon: ThumbsUp,
    title: "Problem Solved",
    description:
      "We diagnose, repair, and get you back on the road — usually on the same visit. Simple, fast, and done right the first time.",
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section" style={{ background: "linear-gradient(135deg, #FFF8E7 0%, #FFF3D6 100%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#FFB300]/20 text-[#FF8C00] px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase mb-4">
            How It Works
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1A1A2E] mb-4 leading-tight">
            Getting Help Is
            <br />
            <span className="brand-gradient-text">Incredibly Simple</span>
          </h2>
          <p className="text-lg text-[#1A1A2E]/60 font-medium max-w-xl mx-auto">
            Three easy steps and your car troubles are sorted. That's it.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-12 left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-0.5 bg-gradient-to-r from-[#FFB300] to-[#FF8C00] opacity-30 z-0" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
              className="relative z-10 flex flex-col items-center text-center"
            >
              {/* Number circle */}
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-full btn-brand flex items-center justify-center shadow-lg">
                  <step.icon size={30} className="text-[#1A1A2E]" strokeWidth={2} />
                </div>
                <div className="absolute -top-2 -right-2 w-7 h-7 bg-[#1A1A2E] text-white text-xs font-extrabold rounded-full flex items-center justify-center">
                  {step.number}
                </div>
              </div>

              <h3 className="text-xl font-extrabold text-[#1A1A2E] mb-3">{step.title}</h3>
              <p className="text-sm text-[#1A1A2E]/60 leading-relaxed font-medium max-w-xs">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Animated van scene */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="mt-10 mb-2"
        >
          <VanDriveScene />
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          className="text-center mt-14"
        >
          <motion.a
            href="tel:1300096616"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 bg-[#1A1A2E] text-white px-9 py-4 rounded-2xl font-extrabold text-lg shadow-xl hover:shadow-2xl transition-all"
          >
            <Phone size={22} />
            Start with a Free Quote — 1300 09 66 16
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
