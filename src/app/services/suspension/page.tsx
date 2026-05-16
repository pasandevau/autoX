import type { Metadata } from "next";
import ServicePageTemplate from "@/components/ServicePageTemplate";


export const metadata: Metadata = {
  title: "Suspension Repairs Adelaide | AutoXpert Group — Mobile Mechanic",
  description:
    "Expert suspension repairs and diagnostics across Adelaide. Shock absorbers, struts, steering, wheel alignment & more. Mobile mechanic — we come to you. Call 1300 09 66 16.",
  keywords:
    "suspension repair Adelaide, shock absorber replacement Adelaide, steering repair, wheel alignment, mobile suspension mechanic",
};

export default function SuspensionPage() {
  return (
    <ServicePageTemplate
      title="Suspension Repairs"
      subtitle="Restore your ride quality and handling — expert suspension work at your location."
      description="Poor suspension can make driving uncomfortable, dangerous, and expensive long-term. AutoXpert's mobile mechanics diagnose and repair all suspension components on-site, restoring your vehicle's ride quality, safety, and tyre wear efficiency."
      icon="car"
      accent="#FF8C00"
      includes={[
        "Shock absorber & strut replacement",
        "Coil spring inspection & replacement",
        "Sway bar links & bushings",
        "Control arm & ball joint service",
        "Wheel bearing replacement",
        "Steering rack diagnosis",
        "Tie rod end replacement",
        "Wheel alignment check",
        "Suspension height inspection",
        "CV joint & boot replacement",
        "Comprehensive suspension report",
        "Pre & post-repair safety check",
      ]}
      benefits={[
        {
          title: "Improved Safety",
          description:
            "Worn suspension components dramatically reduce your ability to brake and steer safely. We restore full vehicle control.",
        },
        {
          title: "Better Tyre Life",
          description:
            "Faulty suspension causes uneven tyre wear. Our repairs help your tyres wear evenly and last longer.",
        },
        {
          title: "Accurate Diagnosis",
          description:
            "We pinpoint the exact problem before recommending any work — no unnecessary parts replacements.",
        },
        {
          title: "Mobile Service",
          description:
            "We come to you, even if your car is hard to drive. No towing, no hassle — we work where you are.",
        },
      ]}
      faq={[
        {
          q: "How do I know if my suspension needs repair?",
          a: "Common signs include a bouncy or rough ride, pulling to one side, uneven tyre wear, knocking sounds over bumps, or difficulty steering. Call us and we'll diagnose it on the spot.",
        },
        {
          q: "Can you do wheel alignment on-site?",
          a: "We can inspect alignment and identify if it needs adjustment. For full computerised alignment, we'll refer you to a trusted alignment specialist if required.",
        },
        {
          q: "How long do suspension repairs take?",
          a: "Most suspension repairs take 1–3 hours depending on the component and vehicle. We'll give you a time estimate before we start.",
        },
      ]}
    />
  );
}
