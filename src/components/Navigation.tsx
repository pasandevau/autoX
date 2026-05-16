"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  Phone, Menu, X, Wrench, ChevronDown,
  Settings, Truck, Car, Shield, ClipboardCheck, AlertTriangle,
} from "lucide-react";

const services = [
  { href: "/services/car-servicing", label: "General Car Servicing", icon: Wrench, desc: "Log book & full servicing" },
  { href: "/services/repairs", label: "General Repairs", icon: Settings, desc: "All makes & models" },
  { href: "/services/fleet", label: "Fleet Services", icon: Truck, desc: "Business fleet management" },
  { href: "/services/suspension", label: "Suspension Repairs", icon: Car, desc: "Handling & ride comfort" },
  { href: "/services/safety-checks", label: "Safety & Roadworthy", icon: Shield, desc: "SA roadworthy certificates" },
  { href: "/services/pre-purchase", label: "Pre-Purchase Inspections", icon: ClipboardCheck, desc: "Buy with confidence" },
  { href: "/services/roadside-assistance", label: "24/7 Roadside Assistance", icon: AlertTriangle, desc: "Emergency help, day or night" },
];

const mainLinks = [
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/insights", label: "Insights" },
  { href: "/faq", label: "FAQ" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-md shadow-black/[0.06] border-b border-black/[0.05]"
            : "bg-white/95 backdrop-blur-xl border-b border-black/[0.06]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px]">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
              <div className="w-11 h-11 rounded-xl overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform duration-200 shadow-sm">
                <img
                  src="/logo.png"
                  alt="AutoXpert Group"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="font-extrabold text-lg leading-tight tracking-tight text-[#1A1A2E]">AutoXpert</div>
                <div className="text-[9px] font-bold tracking-[0.22em] uppercase text-[#FF8C00]">Group</div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-0.5">
              {/* Services dropdown */}
              <div ref={servicesRef} className="relative">
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-[#1A1A2E]/65 hover:text-[#FF8C00] hover:bg-[#FFB300]/8 transition-all duration-200"
                >
                  Services
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${servicesOpen ? "rotate-180 text-[#FF8C00]" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.16, ease: "easeOut" }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-2xl shadow-2xl border border-black/[0.06] overflow-hidden"
                      style={{ width: "320px" }}
                    >
                      <div className="p-2">
                        {services.map((s) => (
                          <Link
                            key={s.href}
                            href={s.href}
                            onClick={() => setServicesOpen(false)}
                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#FFB300]/8 group/item transition-colors"
                          >
                            <div className="w-9 h-9 rounded-lg bg-[#FFB300]/12 flex items-center justify-center flex-shrink-0 group-hover/item:bg-[#FFB300]/22 transition-colors">
                              <s.icon size={15} className="text-[#FF8C00]" />
                            </div>
                            <div>
                              <div className="text-sm font-bold text-[#1A1A2E] group-hover/item:text-[#FF8C00] transition-colors leading-tight">
                                {s.label}
                              </div>
                              <div className="text-xs text-[#1A1A2E]/40 font-medium mt-0.5">{s.desc}</div>
                            </div>
                          </Link>
                        ))}
                        <div className="mt-1 pt-2 border-t border-black/[0.05] px-1 pb-1">
                          <Link
                            href="/services"
                            onClick={() => setServicesOpen(false)}
                            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-[#FFB300]/12 to-[#FF8C00]/12 text-[#FF8C00] text-sm font-bold hover:from-[#FFB300]/20 hover:to-[#FF8C00]/20 transition-all"
                          >
                            View All Services →
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {mainLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold text-[#1A1A2E]/65 hover:text-[#FF8C00] hover:bg-[#FFB300]/8 transition-all duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="tel:1300096616"
                className="flex items-center gap-2 text-sm font-bold text-[#1A1A2E]/75 hover:text-[#FF8C00] transition-colors duration-200"
              >
                <div className="w-8 h-8 rounded-full bg-[#FFB300]/12 flex items-center justify-center">
                  <Phone size={14} className="text-[#FF8C00]" />
                </div>
                1300 09 66 16
              </a>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/bookings"
                  className="btn-brand text-[#1A1A2E] px-5 py-2.5 rounded-xl text-sm font-extrabold inline-block"
                >
                  Book Now
                </Link>
              </motion.div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-[#FFB300]/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X size={22} className="text-[#1A1A2E]" />
              ) : (
                <Menu size={22} className="text-[#1A1A2E]" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="fixed top-[72px] left-0 right-0 z-40 bg-white border-b border-black/5 shadow-xl lg:hidden max-h-[82vh] overflow-y-auto"
          >
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="text-[10px] font-extrabold text-[#1A1A2E]/30 uppercase tracking-widest px-3 pt-1 pb-2">
                Our Services
              </div>
              {services.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#FFB300]/10 hover:text-[#FF8C00] transition-colors text-sm font-semibold text-[#1A1A2E]"
                >
                  <s.icon size={15} className="text-[#FF8C00] flex-shrink-0" />
                  {s.label}
                </Link>
              ))}

              <div className="text-[10px] font-extrabold text-[#1A1A2E]/30 uppercase tracking-widest px-3 pt-4 pb-2">
                Pages
              </div>
              {mainLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2.5 text-[#1A1A2E] font-semibold rounded-xl hover:bg-[#FFB300]/10 hover:text-[#FF8C00] transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-4 border-t border-black/5 mt-3 space-y-2">
                <Link
                  href="/bookings"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full btn-brand text-[#1A1A2E] py-4 rounded-2xl font-extrabold text-base"
                >
                  Book a Service
                </Link>
                <a
                  href="tel:1300096616"
                  className="flex items-center justify-center gap-2 w-full border-2 border-[#1A1A2E]/10 text-[#1A1A2E] py-3.5 rounded-2xl font-extrabold text-base hover:border-[#FFB300]/50 transition-colors"
                >
                  <Phone size={18} />
                  Call 1300 09 66 16
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
