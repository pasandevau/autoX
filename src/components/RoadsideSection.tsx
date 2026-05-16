"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Circle,
  Thermometer,
  Zap,
  Battery,
  Search,
  AlertTriangle,
  Cpu,
  Phone,
} from "lucide-react";
import BreakdownCarScene from "@/components/animations/BreakdownCarScene";

const roadsideServices = [
  { icon: Circle, label: "Tyre Puncture Repairs", description: "On-the-spot puncture fix" },
  { icon: AlertTriangle, label: "Flat Tyre Replacement", description: "Spare fitting & tyre help" },
  { icon: Thermometer, label: "Engine Overheating", description: "Cooling system diagnosis" },
  { icon: Zap, label: "Battery Jump Start", description: "Get you moving immediately" },
  { icon: Battery, label: "Battery Replacement", description: "Supply & fit quality batteries" },
  { icon: Search, label: "Diagnostic Services", description: "On-site scan & fault codes" },
  { icon: AlertTriangle, label: "Emergency Breakdown", description: "Any emergency, we respond" },
  { icon: Cpu, label: "Mobile Diagnosis", description: "Advanced mobile diagnostics" },
];

export default function RoadsideSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="roadside" className="section bg-[#1A1A2E] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.06] brand-gradient translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.04] brand-gradient -translate-x-1/2 translate-y-1/2 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 bg-[#FFB300]/15 text-[#FFB300] px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase mb-5">
              <div className="w-2 h-2 rounded-full bg-[#FFB300] animate-pulse" />
              24/7 Roadside Assistance
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 leading-tight">
              Stuck on the Road?
              <br />
              <span className="brand-gradient-text">We're on the Way.</span>
            </h2>
            <p className="text-lg text-white/60 font-medium leading-relaxed mb-8">
              Don't stress. Our mobile mechanics are ready to be dispatched to your
              location immediately. Whether it's a flat tyre at midnight or a dead
              battery in a car park — we've got you covered.
            </p>

            {/* Big phone button */}
            <motion.a
              href="tel:1300096616"
              whileHover={{ scale: 1.04, boxShadow: "0 12px 40px rgba(255,179,0,0.4)" }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-4 bg-white text-[#1A1A2E] px-8 py-5 rounded-2xl font-extrabold text-xl shadow-2xl mb-4 transition-all"
            >
              <Phone size={26} className="text-[#FF8C00]" />
              1300 09 66 16
            </motion.a>
            <p className="text-white/40 text-xs font-bold tracking-widest uppercase">
              Available 24 Hours a Day, 7 Days a Week
            </p>
          </motion.div>

          {/* Right: Animation + Services grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          >
            <BreakdownCarScene />
            <div className="grid grid-cols-2 gap-3">
            {roadsideServices.map((service, i) => (
              <motion.div
                key={service.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.2 + i * 0.06, ease: "easeOut" }}
                className="group flex flex-col gap-3 p-5 rounded-2xl bg-white/[0.06] border border-white/[0.08] hover:bg-white/[0.1] hover:border-[#FFB300]/30 transition-all duration-250"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FFB300]/15 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <service.icon size={18} className="text-[#FFB300]" strokeWidth={2} />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-white leading-tight mb-0.5">
                    {service.label}
                  </div>
                  <div className="text-xs text-white/45 font-medium">{service.description}</div>
                </div>
              </motion.div>
            ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
