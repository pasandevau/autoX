"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const STARS: [number, number, number][] = [
  [30, 18, 1.5], [75, 42, 1], [115, 14, 1.8], [158, 32, 1],
  [200, 10, 1.5], [245, 36, 1], [288, 20, 1.8], [332, 8, 1],
  [375, 38, 1.5], [415, 22, 1], [455, 44, 1.5], [490, 14, 1],
  [52, 56, 1], [140, 50, 1.5], [270, 60, 1], [390, 52, 1.5],
  [480, 8, 1.8], [220, 48, 1], [340, 28, 1.5], [60, 70, 1],
];

export default function BreakdownCarScene() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="w-full select-none pointer-events-none rounded-2xl overflow-hidden mb-6">
      <svg viewBox="0 0 520 210" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">

        {/* Night sky */}
        <rect width="520" height="135" fill="#0A0A1A" />

        {/* Subtle horizon glow */}
        <rect x="0" y="115" width="520" height="22" fill="url(#horizonGrad)" opacity="0.5" />
        <defs>
          <linearGradient id="horizonGrad" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
            <stop offset="0" stopColor="#FFB300" stopOpacity="0" />
            <stop offset="1" stopColor="#1A1A2E" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Stars */}
        {STARS.map(([x, y, r], i) => (
          <motion.circle
            key={i}
            cx={x} cy={y} r={r}
            fill="white"
            animate={{ opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 1.5 + (i % 5) * 0.6, repeat: Infinity, delay: i * 0.11 }}
          />
        ))}

        {/* Moon */}
        <circle cx="460" cy="38" r="24" fill="#FFF8E1" opacity="0.92" />
        <circle cx="472" cy="30" r="20" fill="#0A0A1A" />

        {/* Road */}
        <rect x="0" y="133" width="520" height="77" fill="#151525" />

        {/* Road center dashes */}
        {Array.from({ length: 12 }).map((_, i) => (
          <rect key={i} x={i * 48 - 5} y="165" width="30" height="5" rx="2.5" fill="white" opacity="0.12" />
        ))}

        {/* Road edge lines */}
        <rect x="0" y="133" width="520" height="2.5" fill="#2A2A40" />
        <rect x="0" y="207" width="520" height="3" fill="#2A2A40" />

        {/* Broken-down car (center) */}
        <g transform="translate(182, 97)">
          {/* Body */}
          <rect x="0" y="28" width="138" height="42" rx="7" fill="#1E2A45" />
          {/* Roof */}
          <rect x="16" y="10" width="100" height="26" rx="12" fill="#182038" />
          {/* Windshield */}
          <rect x="18" y="12" width="40" height="22" rx="6" fill="#0D1520" opacity="0.9" />
          {/* Rear window */}
          <rect x="78" y="12" width="34" height="22" rx="6" fill="#0D1520" opacity="0.9" />
          {/* Body detail line */}
          <line x1="0" y1="42" x2="138" y2="42" stroke="#243050" strokeWidth="1.5" opacity="0.6" />
          {/* Wheels */}
          <circle cx="24" cy="70" r="16" fill="#0D0D1A" />
          <circle cx="24" cy="70" r="9" fill="#1A1A28" />
          <circle cx="114" cy="70" r="16" fill="#0D0D1A" />
          <circle cx="114" cy="70" r="9" fill="#1A1A28" />
          {/* Headlights (dim) */}
          <rect x="132" y="35" width="8" height="14" rx="3" fill="#2A3050" opacity="0.4" />
          {/* Tail lights */}
          <rect x="0" y="35" width="6" height="14" rx="3" fill="#5A0000" opacity="0.6" />
        </g>

        {/* ── Left Hazard Triangle ── */}
        <motion.g
          transform="translate(148, 92)"
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.0, repeat: Infinity, ease: "easeInOut", times: [0, 0.15, 0.5, 0.65] }}
        >
          {/* Glow behind */}
          <ellipse cx="24" cy="30" rx="28" ry="22" fill="#FFB300" opacity="0.2" />
          {/* Triangle */}
          <path d="M24 2 L48 42 L0 42Z" fill="#FFB300" />
          <path d="M24 2 L46 40 L2 40Z" fill="#FF8C00" opacity="0.6" />
          {/* Border */}
          <path d="M24 2 L48 42 L0 42Z" fill="none" stroke="#FF8C00" strokeWidth="2" />
          {/* Exclamation mark */}
          <rect x="21.5" y="14" width="5" height="14" rx="2.5" fill="white" />
          <circle cx="24" cy="34" r="3" fill="white" />
          {/* Road glow */}
          <ellipse cx="24" cy="60" rx="32" ry="10" fill="#FFB300" opacity="0.15" />
        </motion.g>

        {/* ── Right Hazard Triangle ── */}
        <motion.g
          transform="translate(320, 92)"
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.0, repeat: Infinity, ease: "easeInOut", times: [0, 0.15, 0.5, 0.65] }}
        >
          <ellipse cx="24" cy="30" rx="28" ry="22" fill="#FFB300" opacity="0.2" />
          <path d="M24 2 L48 42 L0 42Z" fill="#FFB300" />
          <path d="M24 2 L46 40 L2 40Z" fill="#FF8C00" opacity="0.6" />
          <path d="M24 2 L48 42 L0 42Z" fill="none" stroke="#FF8C00" strokeWidth="2" />
          <rect x="21.5" y="14" width="5" height="14" rx="2.5" fill="white" />
          <circle cx="24" cy="34" r="3" fill="white" />
          <ellipse cx="24" cy="60" rx="32" ry="10" fill="#FFB300" opacity="0.15" />
        </motion.g>

        {/* ── Mechanic Van approaching from right ── */}
        <motion.g
          initial={{ x: 160, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : { x: 160, opacity: 0 }}
          transition={{ duration: 3.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.8 }}
        >
          <g transform="translate(395, 142)">
            {/* Headlight beam */}
            <motion.path
              d="M72 8 L115 -10 L115 28Z"
              fill="#FFF9C4"
              animate={{ opacity: [0.15, 0.35, 0.15] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            />
            {/* Van body */}
            <rect x="0" y="4" width="72" height="35" rx="5" fill="#FFB300" />
            {/* Cab */}
            <rect x="52" y="-6" width="22" height="45" rx="5" fill="#FF8C00" />
            {/* Windshield */}
            <rect x="54" y="-2" width="18" height="20" rx="4" fill="#B8DCEE" opacity="0.85" />
            {/* Side window */}
            <rect x="8" y="9" width="36" height="20" rx="3" fill="#B8DCEE" opacity="0.4" />
            {/* Wheels */}
            <motion.g style={{ transformBox: "fill-box", transformOrigin: "center" }}
              animate={{ rotate: 360 }} transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}>
              <circle cx="14" cy="39" r="10" fill="#0D0D1A" />
              <circle cx="14" cy="39" r="6" fill="#1A1A28" />
              <line x1="14" y1="29" x2="14" y2="49" stroke="#333" strokeWidth="2" />
              <line x1="4" y1="39" x2="24" y2="39" stroke="#333" strokeWidth="2" />
            </motion.g>
            <motion.g style={{ transformBox: "fill-box", transformOrigin: "center" }}
              animate={{ rotate: 360 }} transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}>
              <circle cx="56" cy="39" r="10" fill="#0D0D1A" />
              <circle cx="56" cy="39" r="6" fill="#1A1A28" />
              <line x1="56" y1="29" x2="56" y2="49" stroke="#333" strokeWidth="2" />
              <line x1="46" y1="39" x2="66" y2="39" stroke="#333" strokeWidth="2" />
            </motion.g>
            {/* Headlights */}
            <motion.rect x="70" y="8" width="6" height="10" rx="2" fill="#FFFDE7"
              animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 0.5, repeat: Infinity }} />
            {/* Roof light bar */}
            <motion.rect x="4" y="-4" width="46" height="5" rx="2.5" fill="#FFD54F"
              animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 0.8, repeat: Infinity }} />
          </g>
        </motion.g>

        {/* "Help is on the way" badge (appears after delay) */}
        <motion.g
          transform="translate(174, 58)"
          initial={{ opacity: 0, y: 8, scale: 0.85 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: 2.2, duration: 0.5, type: "spring" }}
        >
          <rect x="0" y="0" width="168" height="32" rx="16" fill="#FFB300" />
          <rect x="2" y="2" width="164" height="28" rx="14" fill="#FF8C00" opacity="0.3" />
          {/* Dot indicator */}
          <motion.circle cx="16" cy="16" r="5" fill="#1A1A2E"
            animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 0.8, repeat: Infinity }} />
          {/* Text via SVG */}
          <text x="28" y="21" fill="#1A1A2E" fontSize="12" fontWeight="800" fontFamily="system-ui, sans-serif" letterSpacing="0.5">
            Help is on the way!
          </text>
        </motion.g>

      </svg>
    </div>
  );
}
