import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AutoXpert Group | Mobile Mechanic & 24/7 Roadside Assistance Adelaide",
  description:
    "Adelaide's most trusted mobile mechanic. Expert car servicing, general repairs, fleet services & 24/7 roadside assistance. We come to you — same day service available. Call 1300 09 66 16.",
  keywords:
    "mobile mechanic, roadside assistance, car service near me, mechanic near me, auto electrician, AC regas, AC repair, car won't start, breakdown help, battery replacement, car diagnosis, vehicle inspection, mobile mechanic Adelaide, roadside assistance Adelaide, pre-purchase inspection, fleet services Adelaide, suspension repair, roadworthy check",
  authors: [{ name: "AutoXpert Group" }],
  openGraph: {
    title: "AutoXpert Group | Mobile Mechanic Adelaide",
    description:
      "Expert mobile mechanic, car servicing, repairs & 24/7 roadside assistance. We come to you anywhere in Adelaide.",
    type: "website",
    locale: "en_AU",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-AU" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
