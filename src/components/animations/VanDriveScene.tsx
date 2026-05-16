"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function VanDriveScene() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="w-full select-none pointer-events-none overflow-hidden rounded-2xl">
      <svg viewBox="0 0 820 170" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
        {/* Sky */}
        <rect width="820" height="100" fill="#EDF6FF" />

        {/* Sun */}
        <circle cx="760" cy="34" r="26" fill="#FFD54F" opacity="0.5" />
        <circle cx="760" cy="34" r="18" fill="#FFB300" opacity="0.8" />

        {/* Clouds */}
        <g opacity="0.75">
          <ellipse cx="130" cy="28" rx="42" ry="20" fill="white" />
          <ellipse cx="165" cy="24" rx="32" ry="17" fill="white" />
          <ellipse cx="100" cy="32" rx="25" ry="14" fill="white" />
        </g>
        <g opacity="0.6">
          <ellipse cx="430" cy="20" rx="34" ry="16" fill="white" />
          <ellipse cx="460" cy="17" rx="26" ry="13" fill="white" />
          <ellipse cx="405" cy="23" rx="20" ry="11" fill="white" />
        </g>

        {/* Grass */}
        <rect x="0" y="97" width="820" height="12" fill="#72C060" />
        <rect x="0" y="104" width="820" height="5" fill="#5BAA4A" />

        {/* Road */}
        <rect x="0" y="108" width="820" height="62" fill="#3A3A50" />

        {/* Lane dashes */}
        {Array.from({ length: 18 }).map((_, i) => (
          <rect key={i} x={i * 52 - 10} y="136" width="34" height="5" rx="2.5" fill="white" opacity="0.18" />
        ))}

        {/* Road edges */}
        <rect x="0" y="108" width="820" height="3" fill="#FFB300" opacity="0.45" />
        <rect x="0" y="167" width="820" height="3" fill="#FFB300" opacity="0.28" />

        {/* ── Left: House (origin) ── */}
        <g transform="translate(40, 22)">
          {/* Body */}
          <rect x="0" y="44" width="82" height="56" fill="#F2EDE4" rx="3" />
          {/* Roof */}
          <polygon points="41,2 -6,48 88,48" fill="#A8795A" />
          <polygon points="41,2 -4,48 86,48" fill="#C49070" opacity="0.4" />
          {/* Door */}
          <rect x="30" y="68" width="22" height="32" fill="#8B5E3C" rx="2" />
          <circle cx="49" cy="84" r="2" fill="#D4A96A" />
          {/* Windows */}
          <rect x="5" y="54" width="20" height="16" fill="#87CEEB" rx="2" opacity="0.85" />
          <rect x="57" y="54" width="20" height="16" fill="#87CEEB" rx="2" opacity="0.85" />
          {/* Window cross */}
          <line x1="15" y1="54" x2="15" y2="70" stroke="#7BB8CC" strokeWidth="1" opacity="0.6" />
          <line x1="5" y1="62" x2="25" y2="62" stroke="#7BB8CC" strokeWidth="1" opacity="0.6" />
        </g>

        {/* Trees left */}
        {([155, 210, 265] as number[]).map((x, i) => (
          <g key={i} transform={`translate(${x}, ${38 + i * 5})`}>
            <rect x="9" y="46" width="8" height="24" fill="#5D4037" />
            <ellipse cx="13" cy="36" rx="20" ry="24" fill="#52A447" />
            <ellipse cx="13" cy="26" rx="13" ry="16" fill="#3D8B38" />
          </g>
        ))}

        {/* ── Right: Destination car ── */}
        <g transform="translate(622, 70)">
          {/* Body */}
          <rect x="0" y="26" width="120" height="40" rx="7" fill="#5B8DEF" />
          {/* Roof */}
          <rect x="16" y="8" width="82" height="24" rx="11" fill="#4A7ADE" />
          {/* Windshield front */}
          <rect x="18" y="10" width="36" height="20" rx="5" fill="#B8E0FA" opacity="0.88" />
          {/* Rear window */}
          <rect x="64" y="10" width="30" height="20" rx="5" fill="#B8E0FA" opacity="0.88" />
          {/* Wheels */}
          <circle cx="22" cy="66" r="15" fill="#1A1A2E" />
          <circle cx="22" cy="66" r="8" fill="#333344" />
          <circle cx="98" cy="66" r="15" fill="#1A1A2E" />
          <circle cx="98" cy="66" r="8" fill="#333344" />
          {/* Headlight (facing right) */}
          <rect x="114" y="33" width="8" height="13" rx="2.5" fill="#FFF9C4" opacity="0.9" />
          {/* Tail light */}
          <rect x="0" y="33" width="6" height="13" rx="2.5" fill="#FF5252" opacity="0.8" />
          {/* Door line */}
          <line x1="55" y1="30" x2="55" y2="66" stroke="#4A7ADE" strokeWidth="1.5" opacity="0.5" />
        </g>

        {/* Trees right */}
        {([590, 545, 500] as number[]).map((x, i) => (
          <g key={i} transform={`translate(${x}, ${42 + i * 4})`}>
            <rect x="9" y="46" width="8" height="22" fill="#5D4037" />
            <ellipse cx="13" cy="36" rx="18" ry="22" fill="#52A447" />
            <ellipse cx="13" cy="26" rx="11" ry="14" fill="#3D8B38" />
          </g>
        ))}

        {/* Location pin (bouncing) */}
        <motion.g transform="translate(666, -2)">
          <motion.g
            initial={{ opacity: 0, y: -8 }}
            animate={inView ? { opacity: 1, y: [0, -9, 0] } : {}}
            transition={{ opacity: { delay: 0.2, duration: 0.4 }, y: { delay: 0.6, duration: 1.8, repeat: Infinity, ease: "easeInOut" } }}
          >
            <path d="M16 0C7.2 0 0 7.2 0 16C0 28 16 40 16 40C16 40 32 28 32 16C32 7.2 24.8 0 16 0Z" fill="#F44336" />
            <circle cx="16" cy="16" r="7" fill="white" />
          </motion.g>
        </motion.g>

        {/* Wrench pop over destination car */}
        <motion.g
          transform="translate(650, 28)"
          initial={{ opacity: 0, scale: 0, rotate: -30 }}
          animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
          transition={{ delay: 3.4, duration: 0.5, type: "spring", stiffness: 200 }}
        >
          <circle cx="22" cy="22" r="22" fill="#FFB300" opacity="0.18" />
          {/* Wrench SVG path */}
          <g transform="translate(8, 5) rotate(-20, 14, 14)">
            <rect x="11" y="6" width="6" height="24" rx="3" fill="#FF8C00" />
            <circle cx="14" cy="8" r="10" fill="#FF8C00" />
            <circle cx="14" cy="8" r="6" fill="#FFF3CC" />
            <circle cx="14" cy="30" r="8" fill="#FF8C00" />
            <circle cx="14" cy="30" r="4.5" fill="#FFF3CC" />
          </g>
        </motion.g>

        {/* ✅ Checkmark badge */}
        <motion.g
          transform="translate(730, 30)"
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 3.9, duration: 0.45, type: "spring", stiffness: 260 }}
        >
          <circle cx="20" cy="20" r="20" fill="#4CAF50" />
          <path d="M10 20 L17 27 L30 12" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.g>

        {/* ── MECHANIC VAN (main actor) ── */}
        <motion.g
          initial={{ x: -210 }}
          animate={inView ? { x: 450 } : { x: -210 }}
          transition={{ duration: 3.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.5 }}
        >
          {/* Speed lines */}
          <line x1="-65" y1="118" x2="-8" y2="118" stroke="#FFB300" strokeWidth="2" strokeDasharray="10 5" opacity="0.45" />
          <line x1="-85" y1="128" x2="-12" y2="128" stroke="#FFB300" strokeWidth="2" strokeDasharray="14 7" opacity="0.3" />
          <line x1="-70" y1="138" x2="-10" y2="138" stroke="#FFB300" strokeWidth="2" strokeDasharray="11 5" opacity="0.4" />

          {/* Van body */}
          <rect x="0" y="50" width="158" height="64" rx="9" fill="#FFB300" />
          {/* Cab section */}
          <rect x="114" y="34" width="44" height="80" rx="9" fill="#FF8C00" />
          {/* Windshield */}
          <rect x="117" y="40" width="38" height="35" rx="6" fill="#C8E8F8" opacity="0.88" />
          {/* Driver silhouette */}
          <circle cx="133" cy="54" r="10" fill="#FFCC80" />
          <rect x="126" y="62" width="14" height="10" rx="3" fill="#FF8C00" opacity="0.6" />
          {/* Side windows */}
          <rect x="10" y="58" width="42" height="28" rx="5" fill="#C8E8F8" opacity="0.52" />
          <rect x="62" y="58" width="42" height="28" rx="5" fill="#C8E8F8" opacity="0.52" />
          {/* Roof light bar */}
          <rect x="4" y="42" width="108" height="10" rx="5" fill="#FF8C00" />
          {/* Roof light blink */}
          <motion.rect x="10" y="43" width="18" height="8" rx="3" fill="#FFD54F"
            animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 0.6, repeat: Infinity }} />
          <motion.rect x="90" y="43" width="18" height="8" rx="3" fill="#FFD54F"
            animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.6, repeat: Infinity }} />
          {/* Company stripe */}
          <rect x="4" y="102" width="108" height="8" rx="0" fill="#FF8C00" opacity="0.38" />
          {/* Front bumper */}
          <rect x="150" y="96" width="16" height="10" rx="3" fill="#CC7000" />
          {/* Headlight */}
          <motion.rect x="155" y="48" width="10" height="16" rx="3" fill="#FFFDE7"
            animate={{ opacity: [0.65, 1, 0.65] }} transition={{ duration: 0.7, repeat: Infinity }} />

          {/* Left wheel (spinning) */}
          <motion.g style={{ transformBox: "fill-box", transformOrigin: "center" }}
            animate={{ rotate: 360 }} transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}>
            <circle cx="32" cy="114" r="19" fill="#1A1A2E" />
            <circle cx="32" cy="114" r="11" fill="#2A2A3A" />
            <line x1="32" y1="95" x2="32" y2="133" stroke="#555" strokeWidth="2.5" />
            <line x1="13" y1="114" x2="51" y2="114" stroke="#555" strokeWidth="2.5" />
            <line x1="18" y1="100" x2="46" y2="128" stroke="#444" strokeWidth="2" />
            <line x1="46" y1="100" x2="18" y2="128" stroke="#444" strokeWidth="2" />
          </motion.g>

          {/* Right wheel (spinning) */}
          <motion.g style={{ transformBox: "fill-box", transformOrigin: "center" }}
            animate={{ rotate: 360 }} transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}>
            <circle cx="126" cy="114" r="19" fill="#1A1A2E" />
            <circle cx="126" cy="114" r="11" fill="#2A2A3A" />
            <line x1="126" y1="95" x2="126" y2="133" stroke="#555" strokeWidth="2.5" />
            <line x1="107" y1="114" x2="145" y2="114" stroke="#555" strokeWidth="2.5" />
            <line x1="112" y1="100" x2="140" y2="128" stroke="#444" strokeWidth="2" />
            <line x1="140" y1="100" x2="112" y2="128" stroke="#444" strokeWidth="2" />
          </motion.g>

          {/* Exhaust puff */}
          <motion.g animate={{ opacity: [0.5, 0, 0.5], x: [-4, -12, -4] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "easeOut" }}>
            <circle cx="-8" cy="108" r="6" fill="white" opacity="0.4" />
            <circle cx="-18" cy="104" r="4" fill="white" opacity="0.25" />
            <circle cx="-26" cy="100" r="3" fill="white" opacity="0.15" />
          </motion.g>
        </motion.g>
      </svg>
    </div>
  );
}
