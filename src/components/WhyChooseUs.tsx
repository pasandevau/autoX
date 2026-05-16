"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Clock3, BadgeCheck, DollarSign, Smile, Zap } from "lucide-react";

const features = [
  {
    icon: MapPin,
    accent: "#FFB300",
    title: "We Come to You",
    description:
      "No need to tow your car or arrange a lift. We come straight to your home, workplace, or wherever you are across Adelaide.",
  },
  {
    icon: Clock3,
    accent: "#FF8C00",
    title: "Available 24 / 7",
    description:
      "Emergencies don't keep office hours. Neither do we. Day, night, weekends, public holidays — we're always just a call away.",
  },
  {
    icon: DollarSign,
    accent: "#FFB300",
    title: "Transparent Pricing",
    description:
      "You'll know the price before we start — no hidden fees, no nasty surprises. Honest quotes every single time.",
  },
  {
    icon: BadgeCheck,
    accent: "#FF8C00",
    title: "Licensed & Insured",
    description:
      "All our mechanics are fully licensed, trade-qualified, and insured. You're in safe, professional hands.",
  },
  {
    icon: Zap,
    accent: "#FFB300",
    title: "Same Day Service",
    description:
      "Need it done today? In most cases, we can get to you same day. Fast response, fast fixes — that's our promise.",
  },
  {
    icon: Smile,
    accent: "#FF8C00",
    title: "Friendly & Honest",
    description:
      "We explain everything in plain English, never upsell unnecessary work, and treat every customer like a mate.",
  },
];

export default function WhyChooseUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="why-us" className="section bg-white">
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
            Why AutoXpert
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1A1A2E] mb-4 leading-tight">
            The Easy Choice for
            <br />
            <span className="brand-gradient-text">Every Adelaide Driver</span>
          </h2>
          <p className="text-lg text-[#1A1A2E]/55 font-medium max-w-2xl mx-auto">
            We built AutoXpert around one simple idea — getting your car fixed should be
            stress-free, affordable, and actually kind of pleasant.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.08, ease: "easeOut" }}
              className="group flex flex-col gap-4 p-7 rounded-2xl bg-[#F8F8F8] border border-black/[0.05] hover:bg-white hover:shadow-md hover:border-[#FFB300]/25 transition-all duration-300"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                style={{ background: `${feature.accent}18` }}
              >
                <feature.icon size={26} strokeWidth={2} style={{ color: feature.accent }} />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-[#1A1A2E] mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#1A1A2E]/58 leading-relaxed font-medium">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
