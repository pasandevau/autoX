import type { Metadata } from "next";
import ServicePageTemplate from "@/components/ServicePageTemplate";


export const metadata: Metadata = {
  title: "Fleet Services Adelaide | AutoXpert Group — Mobile Fleet Mechanic",
  description:
    "Comprehensive mobile fleet servicing and repairs across Adelaide. Keep your business vehicles on the road. Scheduled maintenance, emergency repairs & more. Call AutoXpert.",
  keywords:
    "fleet mechanic Adelaide, mobile fleet service, commercial vehicle service Adelaide, fleet maintenance, business car service",
};

export default function FleetPage() {
  return (
    <ServicePageTemplate
      title="Fleet Services"
      subtitle="Keep your entire fleet on the road — we come to your depot or workplace."
      description="AutoXpert Group offers comprehensive fleet management solutions for Adelaide businesses. From scheduled servicing to emergency repairs, we minimise vehicle downtime and keep your operations running smoothly — all without disrupting your business day."
      icon="truck"
      accent="#FFB300"
      includes={[
        "Scheduled preventative maintenance",
        "Log book servicing for all fleet vehicles",
        "Fleet-wide safety inspections",
        "Emergency breakdown response",
        "Roadworthy certificates",
        "Brake & tyre management",
        "Engine diagnostics",
        "Fuel efficiency checks",
        "Fleet reporting & records",
        "Priority booking for fleet clients",
        "After-hours service available",
        "Dedicated fleet account manager",
      ]}
      benefits={[
        {
          title: "Minimise Downtime",
          description:
            "We service vehicles at your depot or workplace, so your drivers keep working while we handle maintenance.",
        },
        {
          title: "Flexible Scheduling",
          description:
            "We work around your business hours — evenings, weekends, and early mornings available for fleet clients.",
        },
        {
          title: "Cost Transparency",
          description:
            "Consolidated invoicing and detailed reporting keep your fleet maintenance costs predictable and controlled.",
        },
        {
          title: "Scalable Service",
          description:
            "Whether you have 2 vans or 200 vehicles, we scale our service to meet your fleet's exact needs.",
        },
      ]}
      faq={[
        {
          q: "Can you service vehicles at our business premises?",
          a: "Absolutely — this is one of our most popular arrangements. We come to your depot, warehouse or office to service your vehicles during business hours or after hours.",
        },
        {
          q: "Do you offer fleet service contracts?",
          a: "Yes. We offer tailored service contracts for fleet clients that include scheduled servicing, priority response, and consolidated billing. Contact us to discuss your requirements.",
        },
        {
          q: "What types of vehicles do you service?",
          a: "We service cars, vans, utes, light trucks, and commercial vehicles. Contact us regarding heavy vehicle requirements.",
        },
      ]}
    />
  );
}
