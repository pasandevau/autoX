"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=1920&q=85&auto=format&fit=crop",
    fallbackGradient: "linear-gradient(135deg, #1A1A2E 0%, #2D2D4E 100%)",
    label: "Expert Mobile Mechanics",
    sub: "Fully equipped vans — ready to service your car wherever you are",
    tag: "Professional Service",
  },
  {
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1920&q=85&auto=format&fit=crop",
    fallbackGradient: "linear-gradient(135deg, #2D1A00 0%, #1A1A2E 100%)",
    label: "Engine Diagnostics & Repairs",
    sub: "OBD scanning, fault diagnosis and repairs — completed on the spot",
    tag: "All Makes & Models",
  },
  {
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=85&auto=format&fit=crop",
    fallbackGradient: "linear-gradient(135deg, #1A1A2E 0%, #FF8C00 100%)",
    label: "24/7 Roadside Assistance",
    sub: "Stuck on the road? We reach you across Adelaide in 30–60 minutes",
    tag: "Available Now",
  },
  {
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=85&auto=format&fit=crop",
    fallbackGradient: "linear-gradient(135deg, #0D0D1A 0%, #1A1A2E 100%)",
    label: "We Service Every Vehicle",
    sub: "From everyday hatchbacks to prestige vehicles and fleet vans",
    tag: "All Vehicles Welcome",
  },
  {
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&q=85&auto=format&fit=crop",
    fallbackGradient: "linear-gradient(135deg, #1A0A00 0%, #FF8C00 60%, #FFB300 100%)",
    label: "Across All of Adelaide",
    sub: "80+ suburbs covered — CBD, north, south, east and west",
    tag: "Greater Adelaide",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [paused, next]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: "clamp(340px, 45vw, 580px)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      <AnimatePresence initial={false} custom={direction} mode="sync">
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.7, ease: [0.32, 0, 0.2, 1] }}
          className="absolute inset-0"
        >
          {/* Image */}
          <img
            src={slides[current].image}
            alt={slides[current].label}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ background: slides[current].fallbackGradient }}
          />

          {/* Dark gradient overlay — deeper on left for text, lighter on right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D1A]/80 via-[#0D0D1A]/45 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D1A]/60 via-transparent to-[#0D0D1A]/20" />

          {/* Slide text */}
          <div className="absolute inset-0 flex items-end pb-14 sm:pb-16">
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 w-full">
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              >
                <span className="inline-flex items-center gap-2 bg-[#FFB300]/25 backdrop-blur-sm border border-[#FFB300]/40 text-[#FFB300] text-xs font-extrabold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFB300] animate-pulse" />
                  {slides[current].tag}
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-2 max-w-xl">
                  {slides[current].label}
                </h3>
                <p className="text-white/65 font-medium text-sm sm:text-base max-w-lg">
                  {slides[current].sub}
                </p>
              </motion.div>
            </div>
          </div>

          {/* Amber accent bar on top edge */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FFB300] via-[#FF8C00] to-transparent opacity-80" />
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center hover:bg-white/28 transition-all group"
        aria-label="Previous"
      >
        <ChevronLeft size={20} className="text-white group-hover:scale-110 transition-transform" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center hover:bg-white/28 transition-all group"
        aria-label="Next"
      >
        <ChevronRight size={20} className="text-white group-hover:scale-110 transition-transform" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
            className="transition-all duration-300"
            aria-label={`Go to slide ${i + 1}`}
          >
            <span
              className={`block rounded-full transition-all duration-300 ${
                i === current
                  ? "w-6 h-2 bg-[#FFB300]"
                  : "w-2 h-2 bg-white/40 hover:bg-white/65"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Progress bar */}
      {!paused && (
        <motion.div
          key={`progress-${current}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 5, ease: "linear" }}
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FFB300] origin-left z-20"
        />
      )}

      {/* Slide counter */}
      <div className="absolute top-4 right-5 z-20 text-white/50 text-xs font-bold tabular-nums">
        {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
      </div>
    </div>
  );
}
