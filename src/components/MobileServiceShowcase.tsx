"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Wrench, Zap, Shield, Settings, Car, Truck,
  ClipboardCheck, MapPin, Clock, Star, CheckCircle,
} from "lucide-react";
import Image from "next/image";

/* ── Data ──────────────────────────────────────────────────────── */
const LEFT_BADGES = [
  { icon: Wrench,         label: "Car Servicing",      sub: "All makes & models"   },
  { icon: Settings,       label: "General Repairs",    sub: "Engine & drivetrain"  },
  { icon: Car,            label: "Suspension",         sub: "Ride smooth again"    },
  { icon: ClipboardCheck, label: "Pre-Purchase Check", sub: "Buy with confidence"  },
];
const RIGHT_BADGES = [
  { icon: Shield,  label: "Safety & Roadworthy", sub: "Pass first time"       },
  { icon: Truck,   label: "Fleet Services",      sub: "Business solutions"    },
  { icon: Zap,     label: "Roadside Rescue",     sub: "We come fast"          },
  { icon: MapPin,  label: "Greater Adelaide",    sub: "All suburbs covered"   },
];
const STATS = [
  { icon: Star,          value: 500,  suffix: "+",  label: "Happy Customers"   },
  { icon: Clock,         value: 24,   suffix: "/7", label: "Always Available"  },
  { icon: MapPin,        value: 50,   suffix: "km", label: "Service Radius"    },
  { icon: CheckCircle,   value: 100,  suffix: "%",  label: "Fixed-Price Quotes"},
];

/* ── Animated counter ──────────────────────────────────────────── */
function Counter({ to, suffix, inView }: { to: number; suffix: string; inView: boolean }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(to / 40);
    const timer = setInterval(() => {
      start += step;
      if (start >= to) { setDisplay(to); clearInterval(timer); }
      else setDisplay(start);
    }, 30);
    return () => clearInterval(timer);
  }, [inView, to]);
  return <>{display}{suffix}</>;
}

/* ── Connector line (SVG drawn on scroll) ──────────────────────── */
function ConnectorLine({ side, index, inView }: { side: "left" | "right"; index: number; inView: boolean }) {
  return (
    <svg
      className="absolute top-1/2 -translate-y-1/2 w-16 h-1 hidden xl:block"
      style={{ [side === "left" ? "right" : "left"]: "-64px" }}
      overflow="visible"
    >
      <motion.line
        x1={side === "left" ? 0 : 64}
        y1={0}
        x2={side === "left" ? 64 : 0}
        y2={0}
        stroke="#FFB300"
        strokeWidth="2"
        strokeDasharray="6 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 0.6 } : {}}
        transition={{ delay: 0.3 + index * 0.12, duration: 0.5 }}
      />
      <motion.circle
        cx={side === "left" ? 64 : 0}
        cy={0}
        r={4}
        fill="#FFB300"
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ delay: 0.55 + index * 0.12 }}
      />
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════════ */
export default function MobileServiceShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-60px" });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white py-28">

      {/* Decorative top wave */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-2"
        style={{ background: "linear-gradient(90deg,#FFB300,#FF8C00,#FFB300)" }} />

      {/* Soft amber radial glow */}
      <motion.div
        aria-hidden
        style={{ y: bgY, background: "radial-gradient(circle,rgba(255,179,0,0.10) 0%,transparent 65%)" }}
        className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
      />

      {/* Subtle dot grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle,#FFB300 1px,transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: 0.06,
        }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section label + heading */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 bg-[#FFB300]/10 text-[#FF8C00] text-xs font-extrabold tracking-[3px] uppercase px-4 py-2 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFB300] animate-pulse" />
            We Come To You
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1A1A2E] leading-tight tracking-tight">
            Adelaide&apos;s Most Trusted<br />
            <span style={{ background: "linear-gradient(90deg,#FFB300,#FF8C00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Mobile Mechanic
            </span>
          </h2>
          <p className="mt-4 text-[#1A1A2E]/50 font-medium text-base max-w-sm mx-auto leading-relaxed">
            Our fully-kitted ute rolls straight to your door — home, work, or roadside.
          </p>
        </motion.div>

        {/* Desktop: three-column layout */}
        <div className="hidden lg:grid grid-cols-[280px_1fr_280px] items-center gap-8 xl:gap-12">

          {/* Left badges */}
          <div className="flex flex-col gap-4">
            {LEFT_BADGES.map((b, i) => (
              <div key={b.label} className="relative">
                <BadgeCard badge={b} index={i} inView={inView} side="left" />
                <ConnectorLine side="left" index={i} inView={inView} />
              </div>
            ))}
          </div>

          {/* UTE centrepiece */}
          <div className="relative flex items-center justify-center">
            {/* Circular amber ring */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6, rotate: 0 }}
              animate={inView ? { opacity: 1, scale: 1, rotate: 360 } : {}}
              transition={{ opacity: { duration: 1 }, scale: { duration: 1, ease: [0.22,1,0.36,1] }, rotate: { duration: 30, repeat: Infinity, ease: "linear" } }}
              className="absolute w-[420px] h-[420px] rounded-full border-2 border-dashed border-[#FFB300]/25"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute w-[340px] h-[340px] rounded-full border border-[#FFB300]/15"
            />

            {/* Floating UTE */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                animate={inView ? { y: [0, -14, 0] } : {}}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="/UTE.png"
                  alt="AutoXpert Group mobile mechanic ute"
                  width={560}
                  height={392}
                  className="w-full max-w-[480px] h-auto relative z-10"
                  style={{ filter: "drop-shadow(0 32px 64px rgba(255,179,0,0.18)) drop-shadow(0 8px 24px rgba(0,0,0,0.12))" }}
                  priority
                />
              </motion.div>
            </motion.div>

            {/* "On call" pill */}
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.8 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 1, duration: 0.5, type: "spring", stiffness: 300 }}
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 flex items-center gap-2 bg-[#1A1A2E] text-white text-[11px] font-extrabold px-4 py-2 rounded-full shadow-xl whitespace-nowrap z-20"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFB300] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFB300]" />
              </span>
              Adelaide-wide · On call now
            </motion.div>

            {/* Ground shadow */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-6 rounded-full blur-2xl"
              style={{ background: "rgba(255,179,0,0.25)" }}
            />
          </div>

          {/* Right badges */}
          <div className="flex flex-col gap-4">
            {RIGHT_BADGES.map((b, i) => (
              <div key={b.label} className="relative">
                <BadgeCard badge={b} index={i} inView={inView} side="right" />
                <ConnectorLine side="right" index={i} inView={inView} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: image then 2-col grid */}
        <div className="lg:hidden">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex justify-center mb-8"
          >
            <Image
              src="/UTE.png"
              alt="AutoXpert Group mobile mechanic ute"
              width={480}
              height={336}
              className="w-full max-w-sm h-auto"
              style={{ filter: "drop-shadow(0 16px 32px rgba(255,179,0,0.2)) drop-shadow(0 4px 12px rgba(0,0,0,0.1))" }}
              priority
            />
          </motion.div>
          <div className="grid grid-cols-2 gap-3">
            {[...LEFT_BADGES, ...RIGHT_BADGES].map((b, i) => (
              <BadgeCard key={b.label} badge={b} index={i} inView={inView} side="left" />
            ))}
          </div>
        </div>

        {/* Stats strip */}
        <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
              className="relative flex flex-col items-center gap-2 rounded-2xl border border-[#FFB300]/20 bg-white px-5 py-6 text-center shadow-sm overflow-hidden group hover:shadow-md hover:border-[#FFB300]/50 transition-all duration-300"
            >
              <div className="absolute inset-x-0 top-0 h-0.5"
                style={{ background: "linear-gradient(90deg,#FFB300,#FF8C00)" }} />
              <s.icon size={20} className="text-[#FFB300]" />
              <span className="text-3xl font-extrabold text-[#1A1A2E] tabular-nums">
                <Counter to={s.value} suffix={s.suffix} inView={inView} />
              </span>
              <span className="text-xs font-semibold text-[#1A1A2E]/45 leading-tight">{s.label}</span>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Decorative bottom wave */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2"
        style={{ background: "linear-gradient(90deg,#FF8C00,#FFB300,#FF8C00)" }} />

    </section>
  );
}

/* ── Badge card ──────────────────────────────────────────────────── */
function BadgeCard({
  badge, index, inView, side,
}: {
  badge: { icon: React.ElementType; label: string; sub: string };
  index: number;
  inView: boolean;
  side: "left" | "right";
}) {
  const Icon = badge.icon;
  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.25 + index * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3, boxShadow: "0 12px 32px rgba(255,179,0,0.18)" }}
      className="flex items-center gap-3 rounded-2xl border border-[#1A1A2E]/[0.07] bg-white px-4 py-3.5 shadow-sm cursor-default transition-colors hover:border-[#FFB300]/40"
    >
      <div
        className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
        style={{ background: "linear-gradient(135deg,#FFB300,#FF8C00)" }}
      >
        <Icon size={17} className="text-[#1A1A2E]" strokeWidth={2.5} />
      </div>
      <div className="min-w-0">
        <div className="text-sm font-extrabold text-[#1A1A2E] leading-tight">{badge.label}</div>
        <div className="text-[11px] text-[#1A1A2E]/40 font-semibold mt-0.5 leading-tight">{badge.sub}</div>
      </div>
      <CheckCircle size={14} className="ml-auto flex-shrink-0 text-[#FFB300] opacity-60" />
    </motion.div>
  );
}
