"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import PageHero from "@/components/PageHero";
import {
  Wrench, Settings, Truck, Car, Shield, ClipboardCheck, AlertTriangle,
  ArrowRight, Clock, CheckCircle,
} from "lucide-react";

const services = [
  {
    href: "/services/car-servicing",
    title: "General Car Servicing",
    icon: Wrench,
    colour: "#FFB300",
    description:
      "Log book servicing, oil changes, filter replacements and complete multi-point inspections — performed at your location to manufacturer specifications. Your warranty stays fully intact.",
    highlights: ["Log book compliant", "35-point safety check", "All makes & models", "Digital report"],
    time: "1–2 hours",
  },
  {
    href: "/services/repairs",
    title: "General Repairs",
    icon: Settings,
    colour: "#FF8C00",
    description:
      "From minor fixes to major repairs — we diagnose and resolve mechanical problems on the spot. Brakes, cooling system, starter motors, alternators, belts and more.",
    highlights: ["On-site diagnosis", "OBD fault scanning", "Quality parts", "Same-day in most cases"],
    time: "Varies by job",
  },
  {
    href: "/services/fleet",
    title: "Fleet Services",
    icon: Truck,
    colour: "#FFB300",
    description:
      "Tailored fleet maintenance programs for Adelaide businesses. We schedule and complete servicing around your operations — minimising downtime and keeping your vehicles compliant.",
    highlights: ["Dedicated fleet manager", "Flexible scheduling", "Service records", "Volume pricing"],
    time: "Scheduled visits",
  },
  {
    href: "/services/suspension",
    title: "Suspension Repairs",
    icon: Car,
    colour: "#FF8C00",
    description:
      "Worn shocks, damaged springs, failing control arms and steering components — we diagnose and repair suspension issues that affect your ride quality and vehicle safety.",
    highlights: ["Full suspension inspection", "Steering check", "Ride quality restoration", "Wheel alignment referral"],
    time: "2–4 hours",
  },
  {
    href: "/services/safety-checks",
    title: "Safety & Roadworthy",
    icon: Shield,
    colour: "#FFB300",
    description:
      "SA roadworthy certificates for vehicle sales, registration and peace of mind. We come to the vehicle and complete a thorough inspection covering all SA-required safety items.",
    highlights: ["SA compliant", "Written certificate", "Re-inspect after repairs", "Private or dealer vehicles"],
    time: "1–1.5 hours",
  },
  {
    href: "/services/pre-purchase",
    title: "Pre-Purchase Inspections",
    icon: ClipboardCheck,
    colour: "#FF8C00",
    description:
      "Don't buy a used car without knowing exactly what you're getting. We inspect any vehicle at the seller's location and provide a detailed written report with photos before you commit.",
    highlights: ["Written report & photos", "OBD scan", "Seller's location", "Negotiation ammunition"],
    time: "1–1.5 hours",
  },
  {
    href: "/services/roadside-assistance",
    title: "24/7 Roadside Assistance",
    icon: AlertTriangle,
    colour: "#FFB300",
    description:
      "Stuck on the road? We reach you within 30–60 minutes across Adelaide. Flat tyres, dead batteries, overheating, emergency breakdowns — fixed on the spot wherever possible.",
    highlights: ["30–60 min response", "Day, night & weekends", "Fix on site", "All suburbs covered"],
    time: "30–60 min to you",
  },
];

export default function ServicesOverviewClient() {
  return (
    <>
      <Navigation />
      <main>
        <PageHero
          badge="Our Services"
          title="Everything Your Car"
          titleHighlight="Needs, Delivered to You"
          subtitle="Seven specialist services. One trusted team. We come to your home, workplace, or wherever your car is — across all of Adelaide and surrounds."
          cta={{ label: "Book a Service", href: "/bookings" }}
        />

        {/* Services list */}
        <section className="section bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-8">
              {services.map((s, i) => (
                <motion.div
                  key={s.href}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                  className="card p-8 lg:p-10"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <div className="lg:col-span-2">
                      <div className="flex items-center gap-4 mb-5">
                        <div
                          className="w-14 h-14 rounded-2xl flex items-center justify-center"
                          style={{ background: `${s.colour}18` }}
                        >
                          <s.icon size={26} style={{ color: s.colour }} strokeWidth={2} />
                        </div>
                        <div>
                          <h2 className="text-xl font-extrabold text-[#1A1A2E]">{s.title}</h2>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <Clock size={12} className="text-[#1A1A2E]/35" />
                            <span className="text-xs font-semibold text-[#1A1A2E]/40">{s.time}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-[#1A1A2E]/65 font-medium leading-relaxed mb-6">{s.description}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {s.highlights.map((h) => (
                          <div key={h} className="flex items-center gap-2">
                            <CheckCircle size={15} className="text-[#FFB300] flex-shrink-0" strokeWidth={2.5} />
                            <span className="text-sm font-semibold text-[#1A1A2E]/70">{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Link
                          href={s.href}
                          className="flex items-center justify-center gap-2 w-full btn-brand text-[#1A1A2E] py-3.5 rounded-xl font-extrabold"
                        >
                          Learn More
                          <ArrowRight size={16} />
                        </Link>
                      </motion.div>
                      <motion.a
                        href="tel:1300096616"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center justify-center gap-2 w-full border-2 border-[#1A1A2E]/10 text-[#1A1A2E] py-3.5 rounded-xl font-extrabold hover:border-[#FFB300]/40 transition-colors"
                      >
                        Call to Book
                      </motion.a>
                      <Link
                        href="/bookings"
                        className="text-center text-sm font-bold text-[#FF8C00] hover:text-[#FFB300] transition-colors"
                      >
                        Get a Free Quote →
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
