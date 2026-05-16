import type { Metadata } from "next";
import ServicePageTemplate from "@/components/ServicePageTemplate";


export const metadata: Metadata = {
  title: "24/7 Roadside Assistance Adelaide | AutoXpert Group — Emergency Mechanic",
  description:
    "Fast 24/7 roadside assistance across Adelaide. Flat tyres, dead batteries, overheating, breakdown help & emergency diagnostics. Call AutoXpert now: 1300 09 66 16.",
  keywords:
    "roadside assistance Adelaide, emergency mechanic Adelaide, car won't start Adelaide, flat tyre help, battery jump start Adelaide, breakdown help, mobile mechanic 24/7",
};

export default function RoadsideAssistancePage() {
  return (
    <ServicePageTemplate
      title="24/7 Roadside Assistance"
      subtitle="Stuck anywhere in Adelaide? We're on the way — day or night, 365 days a year."
      description="When your car lets you down, AutoXpert Group responds fast. Our mobile mechanics are strategically located across Adelaide to reach you quickly. Don't wait for a tow truck — call us and we'll often fix the problem right where you are."
      icon="alert-triangle"
      accent="#FFB300"
      includes={[
        "Flat tyre repair or replacement",
        "Battery jump start service",
        "Dead battery supply & fitting",
        "Engine overheating assistance",
        "Emergency fuel delivery",
        "Lockout assistance (where possible)",
        "Emergency diagnostic scanning",
        "On-site minor repairs",
        "Towing coordination if required",
        "Breakdown assessment & report",
        "AC failure emergency checks",
        "Highly skilled mobile diagnosis",
      ]}
      benefits={[
        {
          title: "Fast Response Times",
          description:
            "We aim to reach you within 30–60 minutes across Adelaide. Your safety is always our top priority.",
        },
        {
          title: "Available Day & Night",
          description:
            "24 hours a day, 7 days a week, 365 days a year — including Christmas. Emergencies don't take holidays.",
        },
        {
          title: "Fix It On the Spot",
          description:
            "Unlike a tow truck, we bring tools and parts. Many breakdowns are fixed right where your car is stranded.",
        },
        {
          title: "Stay Calm, We Handle It",
          description:
            "Our friendly mechanics put you at ease immediately. You're in safe hands from the moment we arrive.",
        },
      ]}
      faq={[
        {
          q: "How fast can you get to me?",
          a: "Response times vary by location and time of day, but we aim to reach you within 30–60 minutes across most of Adelaide and surrounds.",
        },
        {
          q: "My car won't start — can you diagnose it remotely?",
          a: "Call us and describe the symptoms. We can often give a likely diagnosis over the phone and bring exactly the right parts when we come to you.",
        },
        {
          q: "What if my car can't be fixed roadside?",
          a: "If we can't fix it on-site, we'll coordinate a tow to a workshop and stay with you until everything is sorted. We won't leave you stranded.",
        },
        {
          q: "Do you charge extra for night or weekend callouts?",
          a: "We apply a callout fee for after-hours and weekend service. All fees are communicated clearly before we dispatch — no surprise charges.",
        },
        {
          q: "Can you help with overheating engines?",
          a: "Yes. We'll diagnose the cause — whether it's a coolant leak, thermostat failure, or water pump issue — and often fix it on the spot.",
        },
      ]}
    />
  );
}
