import type { Metadata } from "next";
import ServicesOverviewClient from "./ServicesOverviewClient";

export const metadata: Metadata = {
  title: "All Services | AutoXpert Group — Mobile Mechanic Adelaide",
  description:
    "Explore all AutoXpert Group services: car servicing, general repairs, fleet management, suspension, roadworthy checks, pre-purchase inspections & 24/7 roadside assistance across Adelaide.",
};

export default function ServicesPage() {
  return <ServicesOverviewClient />;
}
