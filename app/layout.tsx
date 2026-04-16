import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BinButler — Commercial Waste Pickup. Fast, Simple, Affordable.",
  description:
    "Bulk waste collection, recycling pickup, and tenant cleanouts for property managers, contractors, and businesses. Free quote in 30 minutes. Same-day & next-day availability in the Bay Area.",
  keywords: ["commercial waste removal", "bulk waste pickup", "tenant cleanout", "recycling pickup", "construction debris removal", "property manager waste", "Bay Area waste services"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
