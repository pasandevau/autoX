import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

const services = [
  { label: "General Car Servicing", href: "/services/car-servicing" },
  { label: "General Repairs", href: "/services/repairs" },
  { label: "Fleet Services", href: "/services/fleet" },
  { label: "Suspension Repairs", href: "/services/suspension" },
  { label: "Safety & Roadworthy", href: "/services/safety-checks" },
  { label: "Pre-Purchase Inspections", href: "/services/pre-purchase" },
  { label: "24/7 Roadside Assistance", href: "/services/roadside-assistance" },
];

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Book a Service", href: "/bookings" },
  { label: "All Services", href: "/services" },
  { label: "FAQ", href: "/faq" },
  { label: "Blog", href: "/blog" },
  { label: "Car Care Insights", href: "/insights" },
  { label: "Customer Reviews", href: "/#testimonials" },
  { label: "Contact", href: "/#contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1A1A2E] text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-11 h-11 rounded-xl overflow-hidden flex-shrink-0">
                <img src="/logo.png" alt="AutoXpert Group" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="font-extrabold text-xl leading-tight text-white">AutoXpert</div>
                <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#FF8C00]">Group</div>
              </div>
            </Link>
            <p className="text-white/50 text-sm font-medium leading-relaxed mb-6">
              Adelaide's most trusted mobile mechanic. We bring the workshop to you —
              expert servicing, repairs & 24/7 roadside assistance.
            </p>
            {/* Contact quick links */}
            <div className="flex flex-col gap-3">
              <a
                href="tel:1300096616"
                className="flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-[#FFB300] transition-colors"
              >
                <Phone size={14} className="text-[#FFB300]" />
                1300 09 66 16
              </a>
              <a
                href="mailto:info@autoxpertgroup.com.au"
                className="flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-[#FFB300] transition-colors"
              >
                <Mail size={14} className="text-[#FFB300]" />
                info@autoxpertgroup.com.au
              </a>
              <div className="flex items-center gap-2 text-sm font-semibold text-white/50">
                <MapPin size={14} className="text-[#FFB300]" />
                Adelaide & Surrounds
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-1">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-5">
              Our Services
            </h4>
            <ul className="flex flex-col gap-2.5">
              {services.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="text-sm text-white/50 font-medium hover:text-[#FFB300] transition-colors"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-1">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-5">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/50 font-medium hover:text-[#FFB300] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SEO keywords / service areas */}
          <div className="lg:col-span-1">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-5">
              Service Areas
            </h4>
            <p className="text-sm text-white/45 font-medium leading-relaxed">
              Adelaide CBD · North Adelaide · Norwood · Prospect · Unley · Burnside · Glenelg · Port Adelaide · Hindmarsh · Bowden · Campbelltown · Modbury · Tea Tree Gully · Mawson Lakes · Marion · Morphett Vale · Noarlunga · Seaford · Salisbury · Elizabeth · Golden Grove · Greenwith
            </p>
            <div className="mt-6 p-4 rounded-xl border border-white/10 bg-white/[0.04]">
              <div className="text-xs text-white/40 font-bold uppercase tracking-wider mb-1">24/7 Emergency</div>
              <a
                href="tel:1300096616"
                className="text-2xl font-extrabold brand-gradient-text hover:opacity-80 transition-opacity"
              >
                1300 09 66 16
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/35 font-medium">
            © {year} AutoXpert Group. All rights reserved. Adelaide, SA, Australia.
          </p>
          <p className="text-xs text-white/25 font-medium">
            Mobile Mechanic · Roadside Assistance · Car Servicing · Mechanic Near Me
          </p>
        </div>
      </div>
    </footer>
  );
}
