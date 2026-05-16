import type { Metadata } from "next";
import ServicePageTemplate from "@/components/ServicePageTemplate";


export const metadata: Metadata = {
  title: "Safety Checks & Roadworthy Adelaide | AutoXpert Group",
  description:
    "Mobile roadworthy certificates and comprehensive vehicle safety inspections across Adelaide. We come to you. SA-compliant. Call AutoXpert on 1300 09 66 16.",
  keywords:
    "roadworthy check Adelaide, safety check Adelaide, vehicle inspection Adelaide, roadworthy certificate, mechanic near me safety inspection",
};

export default function SafetyChecksPage() {
  return (
    <ServicePageTemplate
      title="Safety Checks & Roadworthy"
      subtitle="SA-compliant safety inspections and roadworthy certificates — we come to you."
      description="Whether you're selling your vehicle, registering it, or simply want peace of mind, AutoXpert provides comprehensive safety checks and roadworthy inspections across Adelaide. Our thorough approach ensures your vehicle meets all legal requirements and is safe to drive."
      icon="shield"
      accent="#FFB300"
      includes={[
        "Brake system check (pads, rotors, lines)",
        "Steering & suspension inspection",
        "Tyre condition & tread depth",
        "All lights & indicators",
        "Windscreen & wiper condition",
        "Horn functionality check",
        "Seat belts & restraints",
        "Exhaust system inspection",
        "Fuel system check",
        "Body & chassis condition",
        "Engine & underbody inspection",
        "Comprehensive written report",
      ]}
      benefits={[
        {
          title: "Peace of Mind",
          description:
            "Know for certain that your vehicle is safe and roadworthy before every trip, sale, or registration renewal.",
        },
        {
          title: "Convenient Mobile Service",
          description:
            "No need to book into a workshop and wait. We inspect your vehicle wherever it's parked.",
        },
        {
          title: "Clear Written Report",
          description:
            "You receive a detailed written report outlining every item checked, with clear pass/fail results and recommendations.",
        },
        {
          title: "Repair & Recheck Option",
          description:
            "If we find issues, we can repair them on the spot and recheck — saving you time and multiple visits.",
        },
      ]}
      faq={[
        {
          q: "Is your roadworthy certificate Service SA-accepted?",
          a: "Yes. We are licensed Vehicle Tester Authorised Officers (VTAO), and our certificates are fully SA-compliant for vehicle registration and transfer purposes.",
        },
        {
          q: "How long does a safety check take?",
          a: "A comprehensive safety check typically takes 45–90 minutes depending on vehicle size and condition.",
        },
        {
          q: "What happens if my car fails the safety check?",
          a: "We'll explain exactly what needs to be fixed, provide a quote, and can repair most issues on the spot. Once repaired, we re-inspect at no extra charge.",
        },
        {
          q: "Do I need a roadworthy to sell my car in South Australia?",
          a: "Yes. SA law requires a current roadworthy certificate for most private car sales. We make the process simple and convenient — we come to you.",
        },
      ]}
    />
  );
}
