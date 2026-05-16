import type { Metadata } from "next";
import ServicePageTemplate from "@/components/ServicePageTemplate";


export const metadata: Metadata = {
  title: "General Car Repairs Adelaide | AutoXpert Group — Mobile Mechanic",
  description:
    "Expert car repairs delivered to your door across Adelaide. Brakes, engine, cooling systems & more. Mobile mechanic — no towing needed. Call 1300 09 66 16.",
  keywords:
    "car repairs Adelaide, mobile mechanic repairs, brake repair Adelaide, engine repair, mechanic near me",
};

export default function RepairsPage() {
  return (
    <ServicePageTemplate
      title="General Car Repairs"
      subtitle="Expert repairs for all makes and models — we come to you."
      description="From noisy brakes to engine warning lights, AutoXpert's mobile mechanics diagnose and repair your vehicle on-site. No towing required. We bring the tools, expertise, and parts directly to your location across Adelaide."
      icon="settings"
      accent="#FF8C00"
      includes={[
        "Brake pad & rotor replacement",
        "Engine diagnostics & fault codes",
        "Cooling system repairs",
        "Clutch inspection & replacement",
        "Exhaust system repairs",
        "Fuel system service",
        "Electrical fault diagnosis",
        "AC system diagnosis",
        "Power steering service",
        "Wheel bearing replacement",
        "CV joint & axle repairs",
        "Digital diagnostic report",
      ]}
      benefits={[
        {
          title: "On-Site Diagnosis",
          description:
            "We use the latest diagnostic equipment to pinpoint issues fast — right where your car is parked.",
        },
        {
          title: "No Towing Costs",
          description:
            "Since we come to you, there's no expensive towing bill. In many cases we fix the issue on the spot.",
        },
        {
          title: "Quality Parts",
          description:
            "We only use quality OEM-equivalent or better parts — your safety and reliability come first.",
        },
        {
          title: "All Makes & Models",
          description:
            "Domestic, European, Asian, or American — our mechanics are trained across all major vehicle brands.",
        },
      ]}
      faq={[
        {
          q: "Can you repair my car if it won't start?",
          a: "Absolutely. If your car won't start, we can diagnose and often fix the issue on-site. Common causes include dead batteries, starter motors, and alternator faults.",
        },
        {
          q: "How quickly can you get to me?",
          a: "We aim for same-day service in most cases. For emergency breakdowns, we respond as quickly as possible — often within the hour.",
        },
        {
          q: "Do you provide a warranty on repairs?",
          a: "Yes. All our repairs come with a parts and labour warranty. Ask us for specific warranty details when you book.",
        },
      ]}
    />
  );
}
