"use client";

const items = [
  "🔧 General Car Servicing",
  "⚡ 24/7 Roadside Assistance",
  "🛡️ Safety & Roadworthy",
  "🚛 Fleet Services",
  "🔍 Pre-Purchase Inspections",
  "🔩 Suspension Repairs",
  "⭐ 5.0 Google Rating",
  "📍 All Adelaide Suburbs",
  "💳 Fixed Price Quotes",
  "🏠 We Come to You",
  "🕐 Same Day Service",
  "✅ Licensed & Insured",
];

export default function MarqueeBanner() {
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden bg-[#FFF3CC] border-y border-[#FFB300]/25 py-3.5">
      <div className="flex whitespace-nowrap animate-marquee">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#1A1A2E]/65 px-6 shrink-0"
          >
            {item}
            <span className="text-[#FFB300] opacity-60 mx-1">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
