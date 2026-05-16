"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Clock, Users, Star } from "lucide-react";

const items = [
  { icon: Users, value: "500+", label: "Happy Customers", color: "#FFB300" },
  { icon: Clock, value: "24/7", label: "Always Available", color: "#FF8C00" },
  { icon: Shield, value: "10+", label: "Years of Experience", color: "#FFB300" },
  { icon: Star, value: "5.0★", label: "Google Rating", color: "#FF8C00" },
];

export default function TrustBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="relative py-10 bg-[#FFF3CC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-[#FFB300]/30">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className="flex flex-col items-center text-center lg:px-8 gap-2"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-1"
                style={{ background: `${item.color}30` }}
              >
                <item.icon size={22} style={{ color: item.color }} strokeWidth={2} />
              </div>
              <div className="text-3xl font-extrabold text-[#1A1A2E]">{item.value}</div>
              <div className="text-sm font-medium text-[#1A1A2E]/60">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fade into ServicesGrid white bg */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-b from-transparent to-[#F8F8F8] pointer-events-none" />
    </section>
  );
}
