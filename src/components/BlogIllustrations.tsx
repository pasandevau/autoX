/* Inline SVG illustrations for blog card headers — one per category */

export function MaintenanceIllustration() {
  return (
    <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-w-[180px]">
      {/* Background glow circle */}
      <circle cx="100" cy="70" r="52" fill="#FFB300" fillOpacity="0.18" />
      <circle cx="100" cy="70" r="36" fill="#FFB300" fillOpacity="0.12" />

      {/* Gear (background) */}
      <g opacity="0.25" transform="translate(142,20) rotate(15)">
        <circle cx="0" cy="0" r="14" stroke="#FF8C00" strokeWidth="4" />
        <circle cx="0" cy="0" r="6" fill="#FF8C00" />
        {[0,45,90,135,180,225,270,315].map((a,i) => (
          <rect key={i} x="-3" y="-18" width="6" height="8" rx="2" fill="#FF8C00"
            transform={`rotate(${a})`} />
        ))}
      </g>

      {/* Small gear */}
      <g opacity="0.2" transform="translate(52,110) rotate(-10)">
        <circle cx="0" cy="0" r="10" stroke="#FFB300" strokeWidth="3" />
        <circle cx="0" cy="0" r="4" fill="#FFB300" />
        {[0,60,120,180,240,300].map((a,i) => (
          <rect key={i} x="-2" y="-13" width="4" height="6" rx="1.5" fill="#FFB300"
            transform={`rotate(${a})`} />
        ))}
      </g>

      {/* Wrench */}
      <g transform="translate(78,42) rotate(-38)">
        <rect x="-5" y="-2" width="52" height="10" rx="5" fill="#1A1A2E" />
        <circle cx="0" cy="3" r="11" fill="#1A1A2E" />
        <circle cx="0" cy="3" r="7" fill="#FFB300" />
        <circle cx="47" cy="3" r="11" fill="#1A1A2E" />
        <circle cx="47" cy="3" r="7" fill="#FFB300" />
        <rect x="-2" y="-1" width="51" height="8" rx="4" fill="#1A1A2E" />
      </g>

      {/* Screwdriver */}
      <g transform="translate(122,38) rotate(38)">
        <rect x="-4" y="-2" width="56" height="9" rx="4" fill="#FF8C00" />
        <rect x="-4" y="0" width="16" height="5" rx="2" fill="#1A1A2E" fillOpacity="0.4" />
        <rect x="48" y="-3" width="4" height="15" rx="2" fill="#1A1A2E" />
      </g>

      {/* Oil drop */}
      <g transform="translate(100,95)">
        <path d="M0,-16 C6,-6 12,2 12,8 A12,12 0 0,1 -12,8 C-12,2 -6,-6 0,-16Z" fill="#FF8C00" />
        <ellipse cx="4" cy="4" rx="3" ry="4" fill="white" fillOpacity="0.35" />
      </g>

      {/* Sparkles */}
      <g fill="#FFB300">
        <path d="M56,38 L57.5,34 L59,38 L63,39.5 L59,41 L57.5,45 L56,41 L52,39.5Z" />
        <path d="M148,96 L149,93 L150,96 L153,97 L150,98 L149,101 L148,98 L145,97Z" opacity="0.6" />
        <circle cx="60" cy="95" r="2.5" opacity="0.5" />
        <circle cx="148" cy="40" r="2" opacity="0.4" />
      </g>
    </svg>
  );
}

export function SafetyIllustration() {
  return (
    <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-w-[180px]">
      {/* Glow */}
      <circle cx="100" cy="68" r="50" fill="#FF8C00" fillOpacity="0.12" />

      {/* Shield */}
      <path d="M100,22 L134,36 L134,68 C134,88 118,106 100,114 C82,106 66,88 66,68 L66,36 Z"
        fill="#1A1A2E" />
      <path d="M100,28 L128,40 L128,68 C128,85 114,101 100,108 C86,101 72,85 72,68 L72,40 Z"
        fill="#FFB300" fillOpacity="0.15" stroke="#FFB300" strokeWidth="1.5" />

      {/* Brake disc */}
      <circle cx="100" cy="70" r="20" fill="#1A1A2E" stroke="#FFB300" strokeWidth="2" />
      <circle cx="100" cy="70" r="13" fill="none" stroke="#FF8C00" strokeWidth="1.5" strokeDasharray="4 3" />
      <circle cx="100" cy="70" r="6" fill="#FFB300" />
      <circle cx="100" cy="70" r="3" fill="#1A1A2E" />
      {/* Disc holes */}
      {[0,72,144,216,288].map((a,i) => (
        <circle key={i} cx={100 + 10*Math.cos((a-90)*Math.PI/180)} cy={70 + 10*Math.sin((a-90)*Math.PI/180)}
          r="2.5" fill="#FFB300" fillOpacity="0.7" />
      ))}

      {/* Checkmark */}
      <path d="M86,70 L95,80 L116,58" stroke="#FFB300" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity="0.0" />

      {/* Shield checkmark overlay */}
      <path d="M88,68 L96,77 L114,56" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />

      {/* Stars */}
      <path d="M148,36 L149.5,32 L151,36 L155,37.5 L151,39 L149.5,43 L148,39 L144,37.5Z" fill="#FFB300" opacity="0.7" />
      <path d="M46,90 L47,87 L48,90 L51,91 L48,92 L47,95 L46,92 L43,91Z" fill="#FF8C00" opacity="0.5" />
      <circle cx="55" cy="38" r="3" fill="#FFB300" fillOpacity="0.4" />
      <circle cx="148" cy="100" r="2" fill="#FFB300" fillOpacity="0.4" />
    </svg>
  );
}

export function IndustryIllustration() {
  return (
    <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-w-[180px]">
      {/* Road */}
      <rect x="0" y="105" width="200" height="12" rx="2" fill="#1A1A2E" fillOpacity="0.08" />
      <rect x="30" y="109" width="20" height="4" rx="2" fill="#FFB300" fillOpacity="0.4" />
      <rect x="70" y="109" width="20" height="4" rx="2" fill="#FFB300" fillOpacity="0.4" />
      <rect x="110" y="109" width="20" height="4" rx="2" fill="#FFB300" fillOpacity="0.4" />
      <rect x="150" y="109" width="20" height="4" rx="2" fill="#FFB300" fillOpacity="0.4" />

      {/* Speed lines */}
      <rect x="18" y="78" width="24" height="3" rx="1.5" fill="#FFB300" fillOpacity="0.4" />
      <rect x="12" y="86" width="18" height="3" rx="1.5" fill="#FFB300" fillOpacity="0.3" />
      <rect x="22" y="94" width="12" height="3" rx="1.5" fill="#FFB300" fillOpacity="0.2" />

      {/* Van body */}
      <rect x="48" y="72" width="110" height="36" rx="6" fill="#1A1A2E" />
      {/* Cab */}
      <path d="M128,72 L156,72 L162,88 L162,108 L128,108 Z" fill="#1A1A2E" />
      {/* Windscreen */}
      <path d="M130,75 L153,75 L158,88 L130,88 Z" fill="#FFB300" fillOpacity="0.25" stroke="#FFB300" strokeWidth="1" />
      {/* Side window */}
      <rect x="52" y="77" width="34" height="20" rx="3" fill="#FFB300" fillOpacity="0.2" stroke="#FFB300" strokeWidth="1" />
      {/* Logo on door */}
      <rect x="90" y="80" width="34" height="22" rx="3" fill="#FFB300" fillOpacity="0.15" />
      <text x="107" y="95" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#FFB300" fontFamily="system-ui">AX</text>
      {/* Top canopy */}
      <rect x="48" y="64" width="78" height="12" rx="4" fill="#FF8C00" fillOpacity="0.8" />
      {/* Amber stripe */}
      <rect x="48" y="100" width="110" height="5" rx="0" fill="#FFB300" fillOpacity="0.4" />

      {/* Wheels */}
      <circle cx="80" cy="108" r="12" fill="#1A1A2E" />
      <circle cx="80" cy="108" r="7" fill="#4A4A6A" />
      <circle cx="80" cy="108" r="3.5" fill="#FFB300" />
      <circle cx="148" cy="108" r="12" fill="#1A1A2E" />
      <circle cx="148" cy="108" r="7" fill="#4A4A6A" />
      <circle cx="148" cy="108" r="3.5" fill="#FFB300" />

      {/* Floating wrench */}
      <g transform="translate(175,50) rotate(-20)" opacity="0.7">
        <rect x="-3" y="-1.5" width="26" height="7" rx="3.5" fill="#FFB300" />
        <circle cx="0" cy="2" r="6" fill="#FFB300" />
        <circle cx="0" cy="2" r="3.5" fill="#FF8C00" />
        <circle cx="23" cy="2" r="6" fill="#FFB300" />
        <circle cx="23" cy="2" r="3.5" fill="#FF8C00" />
        <rect x="-1.5" y="0" width="25" height="4" rx="2" fill="#FFB300" />
      </g>

      {/* Stars */}
      <path d="M40,48 L41.5,44 L43,48 L47,49.5 L43,51 L41.5,55 L40,51 L36,49.5Z" fill="#FFB300" opacity="0.5" />
      <circle cx="170" cy="90" r="2.5" fill="#FFB300" fillOpacity="0.4" />
    </svg>
  );
}

export function BreakdownsIllustration() {
  return (
    <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-w-[180px]">
      {/* Glow */}
      <circle cx="100" cy="70" r="48" fill="#FF8C00" fillOpacity="0.10" />

      {/* Road */}
      <rect x="10" y="106" width="180" height="10" rx="2" fill="#1A1A2E" fillOpacity="0.08" />

      {/* Car body */}
      <rect x="32" y="80" width="108" height="28" rx="5" fill="#1A1A2E" fillOpacity="0.75" />
      {/* Roof */}
      <path d="M55,80 L72,58 L110,58 L130,80 Z" fill="#1A1A2E" fillOpacity="0.65" />
      {/* Windscreen */}
      <path d="M72,80 L80,63 L106,63 L118,80 Z" fill="#4A5568" fillOpacity="0.6" />
      {/* Windows */}
      <rect x="57" y="64" width="14" height="16" rx="2" fill="#4A5568" fillOpacity="0.5" />
      <rect x="119" y="64" width="11" height="16" rx="2" fill="#4A5568" fillOpacity="0.5" />
      {/* Wheels */}
      <circle cx="65" cy="108" r="12" fill="#2D3748" />
      <circle cx="65" cy="108" r="6.5" fill="#718096" />
      <circle cx="65" cy="108" r="3" fill="#A0AEC0" />
      <circle cx="130" cy="108" r="12" fill="#2D3748" />
      <circle cx="130" cy="108" r="6.5" fill="#718096" />
      <circle cx="130" cy="108" r="3" fill="#A0AEC0" />

      {/* Hazard triangles */}
      <g transform="translate(42,94)">
        <path d="M0,-8 L7,6 L-7,6 Z" fill="#FF8C00" opacity="0.9" />
        <path d="M0,-4 L4,4 L-4,4 Z" fill="#1A1A2E" fillOpacity="0.6" />
        <rect x="-0.5" y="-2" width="1" height="4" rx="0.5" fill="white" />
        <circle cx="0" cy="3" r="0.8" fill="white" />
      </g>
      <g transform="translate(150,94)">
        <path d="M0,-8 L7,6 L-7,6 Z" fill="#FF8C00" opacity="0.9" />
        <path d="M0,-4 L4,4 L-4,4 Z" fill="#1A1A2E" fillOpacity="0.6" />
        <rect x="-0.5" y="-2" width="1" height="4" rx="0.5" fill="white" />
        <circle cx="0" cy="3" r="0.8" fill="white" />
      </g>

      {/* Battery */}
      <g transform="translate(84,26)">
        <rect x="-20" y="-14" width="40" height="28" rx="4" fill="#1A1A2E" stroke="#FF8C00" strokeWidth="1.5" />
        <rect x="-7" y="-18" width="6" height="6" rx="1.5" fill="#1A1A2E" stroke="#FF8C00" strokeWidth="1.5" />
        <rect x="5" y="-18" width="6" height="6" rx="1.5" fill="#1A1A2E" stroke="#FF8C00" strokeWidth="1.5" />
        {/* Low battery fill */}
        <rect x="-17" y="-11" width="8" height="22" rx="2" fill="#FF8C00" fillOpacity="0.35" />
        {/* X mark */}
        <path d="M-4,-4 L8,8 M8,-4 L-4,8" stroke="#FF8C00" strokeWidth="2.5" strokeLinecap="round" />
      </g>

      {/* Lightning bolt */}
      <path d="M112,18 L103,40 L110,40 L100,62 L118,34 L110,34 Z" fill="#FFB300" />

      {/* Sparks */}
      <circle cx="56" cy="34" r="2.5" fill="#FFB300" fillOpacity="0.6" />
      <circle cx="158" cy="46" r="2" fill="#FF8C00" fillOpacity="0.5" />
      <path d="M148,24 L149.5,20 L151,24 L155,25.5 L151,27 L149.5,31 L148,27 L144,25.5Z" fill="#FFB300" opacity="0.5" />
    </svg>
  );
}

export function BuyingTipsIllustration() {
  return (
    <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-w-[180px]">
      {/* Clipboard */}
      <rect x="30" y="28" width="68" height="88" rx="6" fill="#1A1A2E" fillOpacity="0.08" stroke="#1A1A2E" strokeWidth="1.5" strokeOpacity="0.15" />
      <rect x="52" y="22" width="24" height="12" rx="4" fill="#1A1A2E" fillOpacity="0.2" />
      {/* Clipboard lines */}
      <rect x="40" y="52" width="48" height="3" rx="1.5" fill="#FFB300" fillOpacity="0.5" />
      <rect x="40" y="62" width="38" height="3" rx="1.5" fill="#1A1A2E" fillOpacity="0.15" />
      <rect x="40" y="72" width="44" height="3" rx="1.5" fill="#1A1A2E" fillOpacity="0.15" />
      <rect x="40" y="82" width="32" height="3" rx="1.5" fill="#1A1A2E" fillOpacity="0.15" />
      {/* Checkmarks on clipboard */}
      <path d="M40,54 L43,57 L50,49" stroke="#FFB300" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M40,64 L43,67 L50,59" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.3" />
      <path d="M40,74 L43,77 L50,69" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fillOpacity="0.6" />

      {/* Magnifying glass */}
      <circle cx="130" cy="76" r="36" fill="#FFB300" fillOpacity="0.08" />
      <circle cx="126" cy="72" r="30" fill="none" stroke="#1A1A2E" strokeWidth="5" strokeOpacity="0.15" />
      <circle cx="126" cy="72" r="30" fill="none" stroke="#FFB300" strokeWidth="3.5" />
      {/* Glass shine */}
      <path d="M110,55 Q116,50 124,52" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />

      {/* Mini car inside lens */}
      <g transform="translate(126,72)">
        <rect x="-18" y="-4" width="36" height="12" rx="3" fill="#1A1A2E" fillOpacity="0.7" />
        <path d="M-10,-4 L-4,-13 L10,-13 L16,-4 Z" fill="#1A1A2E" fillOpacity="0.6" />
        <circle cx="-10" cy="10" r="5" fill="#1A1A2E" fillOpacity="0.5" />
        <circle cx="10" cy="10" r="5" fill="#1A1A2E" fillOpacity="0.5" />
        {/* Checkmark over car */}
        <path d="M-8,-2 L-2,6 L12,-8" stroke="#FFB300" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Handle */}
      <rect x="147" y="96" width="30" height="7" rx="3.5" fill="#1A1A2E" fillOpacity="0.7"
        transform="rotate(40,147,96)" />

      {/* Stars */}
      <path d="M40,110 L41.2,106 L42.4,110 L46,111 L42.4,112 L41.2,116 L40,112 L36.4,111Z" fill="#FFB300" opacity="0.6" />
      <circle cx="168" cy="36" r="3" fill="#FF8C00" fillOpacity="0.5" />
    </svg>
  );
}

export function DIYTipsIllustration() {
  return (
    <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full max-w-[180px]">
      {/* Glow */}
      <circle cx="100" cy="62" r="48" fill="#FFB300" fillOpacity="0.12" />

      {/* Lightbulb glass */}
      <path d="M100,16 C78,16 62,30 62,50 C62,64 70,74 76,82 L76,92 L124,92 L124,82 C130,74 138,64 138,50 C138,30 122,16 100,16Z"
        fill="#1A1A2E" fillOpacity="0.08" stroke="#FFB300" strokeWidth="2" />
      <path d="M100,16 C78,16 62,30 62,50 C62,64 70,74 76,82 L76,92 L124,92 L124,82 C130,74 138,64 138,50 C138,30 122,16 100,16Z"
        fill="#FFB300" fillOpacity="0.18" />

      {/* Bulb shine */}
      <path d="M80,28 Q86,22 96,22" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.6" />

      {/* Inner glow */}
      <ellipse cx="100" cy="55" rx="24" ry="22" fill="#FFB300" fillOpacity="0.35" />

      {/* Wrench inside bulb */}
      <g transform="translate(100,55) rotate(-30)">
        <rect x="-3" y="-16" width="6" height="32" rx="3" fill="#1A1A2E" fillOpacity="0.8" />
        <circle cx="0" cy="-16" r="8" fill="#1A1A2E" fillOpacity="0.8" />
        <circle cx="0" cy="-16" r="5" fill="#FFB300" />
        <circle cx="0" cy="16" r="8" fill="#1A1A2E" fillOpacity="0.8" />
        <circle cx="0" cy="16" r="5" fill="#FFB300" />
        <rect x="-2" y="-14" width="4" height="28" rx="2" fill="#1A1A2E" fillOpacity="0.8" />
      </g>

      {/* Base */}
      <rect x="82" y="92" width="36" height="6" rx="3" fill="#1A1A2E" fillOpacity="0.25" />
      <rect x="86" y="98" width="28" height="6" rx="3" fill="#1A1A2E" fillOpacity="0.2" />
      <rect x="90" y="104" width="20" height="6" rx="3" fill="#1A1A2E" fillOpacity="0.15" />

      {/* Rays */}
      <g stroke="#FFB300" strokeWidth="2.5" strokeLinecap="round" opacity="0.6">
        <line x1="100" y1="8" x2="100" y2="2" />
        <line x1="122" y1="14" x2="126" y2="9" />
        <line x1="140" y1="32" x2="146" y2="28" />
        <line x1="78" y1="14" x2="74" y2="9" />
        <line x1="60" y1="32" x2="54" y2="28" />
        <line x1="55" y1="55" x2="49" y2="55" />
        <line x1="145" y1="55" x2="151" y2="55" />
      </g>

      {/* Floating tools */}
      <g transform="translate(162,92) rotate(20)" opacity="0.5">
        <rect x="-2" y="-10" width="4" height="20" rx="2" fill="#FF8C00" />
        <rect x="-5" y="-10" width="10" height="6" rx="2" fill="#FF8C00" />
      </g>
      <g transform="translate(36,85) rotate(-15)" opacity="0.4">
        <rect x="-1.5" y="-12" width="3" height="24" rx="1.5" fill="#FFB300" />
        <polygon points="-4,-12 4,-12 0,-18" fill="#FFB300" />
      </g>
    </svg>
  );
}

export const categoryIllustrations: Record<string, () => JSX.Element> = {
  Maintenance:   MaintenanceIllustration,
  Safety:        SafetyIllustration,
  Industry:      IndustryIllustration,
  Breakdowns:    BreakdownsIllustration,
  "Buying Tips": BuyingTipsIllustration,
  "DIY Tips":    DIYTipsIllustration,
};
