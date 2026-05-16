"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import {
  Wrench,
  Settings,
  Truck,
  Car,
  Shield,
  ClipboardCheck,
  AlertTriangle,
  ArrowRight,
  Zap,
} from "lucide-react";

const services = [
  {
    id: "car-servicing",
    icon: Wrench,
    accent: "#FFB300",
    title: "General Car Servicing",
    description:
      "Complete log book servicing, oil changes, filter replacements & more. Keep your car running at peak performance with our expert care.",
    badge: "Most Popular",
    href: "/services/car-servicing",
  },
  {
    id: "repairs",
    icon: Settings,
    accent: "#FF8C00",
    title: "General Repairs",
    description:
      "Brake repairs, engine diagnostics, cooling systems & more. Our skilled mechanics handle all makes and models on-site.",
    badge: null,
    href: "/services/repairs",
  },
  {
    id: "fleet",
    icon: Truck,
    accent: "#FFB300",
    title: "Fleet Services",
    description:
      "Comprehensive fleet management to keep your business vehicles on the road and your operating costs down.",
    badge: "Business",
    href: "/services/fleet",
  },
  {
    id: "suspension",
    icon: Car,
    accent: "#FF8C00",
    title: "Suspension Repairs",
    description:
      "Expert suspension diagnosis and repairs. Shock absorbers, steering components & wheel alignment — we restore your ride.",
    badge: null,
    href: "/services/suspension",
  },
  {
    id: "safety",
    icon: Shield,
    accent: "#FFB300",
    title: "Safety & Roadworthy",
    description:
      "Comprehensive safety inspections and roadworthy certificates. Stay safe, stay compliant — we come to you.",
    badge: null,
    href: "/services/safety-checks",
  },
  {
    id: "pre-purchase",
    icon: ClipboardCheck,
    accent: "#FF8C00",
    title: "Pre-Purchase Inspections",
    description:
      "Don't buy blind. Our thorough inspection reveals hidden issues before you commit — saving you thousands.",
    badge: "Smart Choice",
    href: "/services/pre-purchase",
  },
  {
    id: "roadside",
    icon: AlertTriangle,
    accent: "#FFB300",
    title: "24/7 Roadside Assistance",
    description:
      "Stuck on the road? We'll be there fast. Battery jumps, tyre changes, emergency diagnostics & more — day or night.",
    badge: "24/7",
    href: "/services/roadside-assistance",
  },
];

export default function ServicesGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="section bg-[#F8F8F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          ref={ref}
          className="text-center mb-16 relative"
        >
          {/* Floating tool decorations */}
          <motion.div className="absolute -left-4 top-2 hidden lg:block" animate={{ y: [0, -10, 0], rotate: [0, 12, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
            <div className="w-12 h-12 rounded-2xl bg-[#FFB300]/15 flex items-center justify-center">
              <Wrench size={22} className="text-[#FFB300]" strokeWidth={2} />
            </div>
          </motion.div>
          <motion.div className="absolute -right-4 top-6 hidden lg:block" animate={{ y: [0, -8, 0], rotate: [0, -10, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}>
            <div className="w-12 h-12 rounded-2xl bg-[#FF8C00]/15 flex items-center justify-center">
              <Settings size={22} className="text-[#FF8C00]" strokeWidth={2} />
            </div>
          </motion.div>
          <motion.div className="absolute left-16 -top-4 hidden xl:block" animate={{ y: [0, -12, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}>
            <div className="w-10 h-10 rounded-xl bg-[#FFB300]/10 flex items-center justify-center">
              <Zap size={18} className="text-[#FFB300]" strokeWidth={2} />
            </div>
          </motion.div>
          <motion.div className="absolute right-16 -top-2 hidden xl:block" animate={{ y: [0, -9, 0], rotate: [0, 8, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}>
            <div className="w-10 h-10 rounded-xl bg-[#FF8C00]/10 flex items-center justify-center">
              <Car size={18} className="text-[#FF8C00]" strokeWidth={2} />
            </div>
          </motion.div>
          <div className="inline-flex items-center gap-2 bg-[#FFB300]/12 text-[#FF8C00] px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase mb-4">
            What We Do
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1A1A2E] mb-4 leading-tight">
            Everything Your Car Needs,
            <br />
            <span className="brand-gradient-text">Delivered to Your Door</span>
          </h2>
          <p className="text-lg text-[#1A1A2E]/55 font-medium max-w-2xl mx-auto">
            From routine servicing to emergency roadside help, we bring the workshop to
            you — anywhere across Adelaide and surrounds.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => {
            const isLast = i === services.length - 1;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.08, ease: "easeOut" }}
                className={isLast ? "sm:col-span-2 lg:col-span-3" : ""}
              >
                {isLast ? (
                  /* Full-width featured card for Roadside Assistance */
                  <Link
                    href={service.href}
                    className="group flex flex-col sm:flex-row items-center gap-8 card p-8 lg:p-10 h-full hover:border-[#FFB300]/40 relative overflow-hidden"
                    style={{ background: "linear-gradient(135deg, #fff9ed 0%, #ffffff 60%)" }}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[20px]"
                      style={{ background: "linear-gradient(135deg, #FFB30010 0%, transparent 60%)" }} />

                    {/* Left: icon + badge */}
                    <div className="flex-shrink-0 flex flex-col items-center gap-4">
                      <div
                        className="w-20 h-20 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg"
                        style={{ background: `${service.accent}22` }}
                      >
                        <service.icon size={36} strokeWidth={2} style={{ color: service.accent }} />
                      </div>
                      <div
                        className="text-[10px] font-extrabold tracking-widest uppercase px-3 py-1.5 rounded-full text-white animate-pulse"
                        style={{ background: service.accent }}
                      >
                        {service.badge}
                      </div>
                    </div>

                    {/* Center: text */}
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-2xl lg:text-3xl font-extrabold text-[#1A1A2E] mb-3 group-hover:text-[#FF8C00] transition-colors duration-200">
                        {service.title}
                      </h3>
                      <p className="text-[#1A1A2E]/58 text-base leading-relaxed font-medium max-w-2xl">
                        {service.description}
                      </p>
                    </div>

                    {/* Right: CTA */}
                    <div className="flex-shrink-0">
                      <span className="inline-flex items-center gap-2 bg-[#FFB300] hover:bg-[#FF8C00] text-[#1A1A2E] font-extrabold px-7 py-3.5 rounded-2xl transition-all duration-200 group-hover:gap-3 shadow-md text-sm whitespace-nowrap">
                        Learn More
                        <ArrowRight size={16} strokeWidth={2.5} />
                      </span>
                    </div>
                  </Link>
                ) : (
                  /* Regular card */
                  <Link
                    href={service.href}
                    className="group block card p-7 h-full hover:border-[#FFB300]/40 relative overflow-hidden"
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[20px]"
                      style={{ background: `linear-gradient(135deg, ${service.accent}06 0%, transparent 60%)` }}
                    />
                    {service.badge && (
                      <div
                        className="absolute top-5 right-5 text-[10px] font-extrabold tracking-widest uppercase px-2.5 py-1 rounded-full text-white"
                        style={{ background: service.accent }}
                      >
                        {service.badge}
                      </div>
                    )}
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                      style={{ background: `${service.accent}18` }}
                    >
                      <service.icon size={26} strokeWidth={2} style={{ color: service.accent }} />
                    </div>
                    <h3 className="text-xl font-extrabold text-[#1A1A2E] mb-3 group-hover:text-[#FF8C00] transition-colors duration-200">
                      {service.title}
                    </h3>
                    <p className="text-[#1A1A2E]/58 text-sm leading-relaxed mb-5 font-medium">
                      {service.description}
                    </p>
                    <div className="flex items-center gap-1.5 text-sm font-bold text-[#FF8C00] group-hover:gap-3 transition-all duration-200">
                      Learn More
                      <ArrowRight size={16} strokeWidth={2.5} />
                    </div>
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
