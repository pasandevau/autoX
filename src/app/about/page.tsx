"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import PageHero from "@/components/PageHero";
import { Shield, Clock, Star, Users, Wrench, Heart, Zap, CheckCircle } from "lucide-react";

const stats = [
  { value: 500, suffix: "+", label: "Happy Customers" },
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 24, suffix: "/7", label: "Always Available" },
  { value: 5, suffix: ".0★", label: "Google Rating" },
];

const values = [
  {
    icon: Shield,
    title: "Honest & Transparent",
    description: "We explain exactly what needs doing and why — in plain English. You'll always know what you're paying for before we start.",
  },
  {
    icon: Zap,
    title: "Fast Response",
    description: "Same day service in most cases. For roadside emergencies, we aim to reach you within 30–60 minutes, anywhere across Adelaide.",
  },
  {
    icon: Star,
    title: "Premium Quality",
    description: "We use quality parts and follow manufacturer specifications. Your car is treated with the same care we'd give our own.",
  },
  {
    icon: Users,
    title: "Local & Trusted",
    description: "We're Adelaide locals serving Adelaide people. We've built our reputation one happy customer at a time since day one.",
  },
  {
    icon: Heart,
    title: "Genuinely Caring",
    description: "We know a breakdown is stressful. Our team is friendly, patient and focused on making the experience as smooth as possible.",
  },
  {
    icon: Wrench,
    title: "Fully Equipped",
    description: "Our vans carry a comprehensive range of parts and tools. Most jobs — including emergency repairs — are completed on the spot.",
  },
];

const team = [
  { name: "Marcus D.", role: "Lead Mobile Mechanic", years: "12 years", colour: "#FFB300" },
  { name: "Jake P.", role: "Roadside Specialist", years: "8 years", colour: "#FF8C00" },
  { name: "Sam K.", role: "Fleet Services Lead", years: "10 years", colour: "#FFB300" },
  { name: "Ryan T.", role: "Diagnostics Technician", years: "6 years", colour: "#FF8C00" },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1200;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function AboutPage() {
  const valuesRef = useRef(null);
  const valuesInView = useInView(valuesRef, { once: true, margin: "-60px" });

  return (
    <>
      <Navigation />
      <main>
        <PageHero
          badge="AutoXpert Group"
          title="Adelaide's Mobile Mechanic"
          titleHighlight="You Can Trust"
          subtitle="We started AutoXpert Group with one mission: bring expert car care directly to Adelaide drivers, without the inconvenience, the wait, or the mystery pricing of a traditional workshop."
        />

        {/* Stats */}
        <section className="section bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                  className="card p-6 text-center"
                >
                  <div className="text-4xl sm:text-5xl font-extrabold brand-gradient-text mb-2">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm font-semibold text-[#1A1A2E]/55">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Our story */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="inline-flex items-center gap-2 bg-[#FFB300]/12 text-[#FF8C00] px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase mb-5">
                  Our Story
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A2E] mb-6 leading-tight">
                  Born From Frustration.<br />
                  <span className="brand-gradient-text">Built on Trust.</span>
                </h2>
                <div className="space-y-4 text-[#1A1A2E]/65 font-medium leading-relaxed">
                  <p>
                    AutoXpert Group was founded by a team of qualified mechanics who were tired of watching customers get overcharged, kept in the dark, and forced to rearrange their entire day around a workshop appointment.
                  </p>
                  <p>
                    We believed there was a better way — and mobile mechanics were the answer. We invested in fully equipped vans, built strong supplier relationships for quick parts access, and got to work serving Adelaide drivers on their terms.
                  </p>
                  <p>
                    Today, we've completed thousands of services and roadside callouts across the greater Adelaide area. Our growth has been entirely word-of-mouth — built on the simple principle of doing excellent work, being completely honest, and genuinely caring about every customer.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative"
              >
                <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-[#FFB300]/20 to-[#FF8C00]/10 p-8 lg:p-10">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Services Completed", value: "5,000+" },
                      { label: "Suburbs Covered", value: "80+" },
                      { label: "Years in Adelaide", value: "10+" },
                      { label: "5-Star Reviews", value: "500+" },
                    ].map((item) => (
                      <div key={item.label} className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 text-center">
                        <div className="text-2xl font-extrabold text-[#1A1A2E] mb-1">{item.value}</div>
                        <div className="text-xs font-semibold text-[#1A1A2E]/50">{item.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 p-5 bg-white/70 backdrop-blur-sm rounded-2xl">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} className="text-[#FFB300] fill-[#FFB300]" />
                        ))}
                      </div>
                      <span className="font-extrabold text-[#1A1A2E] text-sm">5.0 on Google</span>
                    </div>
                    <p className="text-sm text-[#1A1A2E]/60 font-medium italic leading-relaxed">
                      "The most professional and convenient car service I've ever experienced. Won't use anyone else."
                    </p>
                    <div className="text-xs text-[#1A1A2E]/40 font-bold mt-2">— David R., Norwood</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="section bg-[#F8F8F8]" ref={valuesRef}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 bg-[#FFB300]/12 text-[#FF8C00] px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase mb-4">
                What We Stand For
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A2E]">
                Our Values
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                  className="card p-7"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FFB300]/20 to-[#FF8C00]/10 flex items-center justify-center mb-5">
                    <v.icon size={22} className="text-[#FF8C00]" strokeWidth={2} />
                  </div>
                  <h3 className="font-extrabold text-[#1A1A2E] text-lg mb-2">{v.title}</h3>
                  <p className="text-sm text-[#1A1A2E]/58 font-medium leading-relaxed">{v.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="section bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 bg-[#FFB300]/12 text-[#FF8C00] px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase mb-4">
                The Team
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A2E] mb-4">
                Meet Your Mechanics
              </h2>
              <p className="text-lg text-[#1A1A2E]/55 font-medium max-w-xl mx-auto">
                Every AutoXpert mechanic is fully licensed, police-checked, and committed to providing the best possible service.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {team.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                  className="card p-6 text-center"
                >
                  <div
                    className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-extrabold text-white"
                    style={{ background: `linear-gradient(135deg, ${member.colour}, #FF8C00)` }}
                  >
                    {member.name.charAt(0)}
                  </div>
                  <div className="font-extrabold text-[#1A1A2E] mb-0.5">{member.name}</div>
                  <div className="text-sm text-[#FF8C00] font-bold mb-2">{member.role}</div>
                  <div className="text-xs text-[#1A1A2E]/45 font-medium">{member.years} experience</div>
                  <div className="mt-3 flex justify-center">
                    <div className="flex items-center gap-1 text-xs font-bold text-[#1A1A2E]/50 bg-[#F8F8F8] px-3 py-1 rounded-full">
                      <CheckCircle size={12} className="text-[#FFB300]" />
                      Licensed & Insured
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="section bg-[#1A1A2E]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-extrabold text-white mb-4">
                Licensed, Certified &amp; Insured
              </h2>
              <p className="text-white/55 font-medium max-w-xl mx-auto">
                Every mechanic on our team holds the relevant trade qualifications and our business carries full public liability insurance.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                "Motor Vehicle Technician Licence",
                "Full Public Liability Insurance",
                "SA Police Checked",
                "Log Book Service Certified",
              ].map((cert) => (
                <div
                  key={cert}
                  className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.06] border border-white/[0.08]"
                >
                  <CheckCircle size={18} className="text-[#FFB300] flex-shrink-0" />
                  <span className="text-sm font-semibold text-white/70">{cert}</span>
                </div>
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
