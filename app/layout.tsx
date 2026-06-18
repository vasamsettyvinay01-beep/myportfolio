import type { Metadata } from "next";
import { DM_Sans, Handjet, Lobster } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { CursorRoot } from "@/components/experience/CursorRoot";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const lobster = Lobster({
  variable: "--font-lobster",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const handjet = Handjet({
  variable: "--font-handjet",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Vinay Vasamsetty — AI Operational Systems",
  description:
    "The operational ecosystem of an AI-native technical founder. Orchestration, infrastructure, and systems that ship.",
  keywords: [
    "AI Product Engineer",
    "Founding Engineer",
    "Operational AI",
    "Systems Builder",
    "Vinay Vasamsetty",
    "Agentrix",
    "Houston",
  ],
  authors: [{ name: "Vinay Vasamsetty" }],
  openGraph: {
    title: "Vinay Vasamsetty — AI Operational Systems",
    description:
      "AI-powered operational systems, agentic platforms, and production SaaS — built to ship.",
    type: "website",
    locale: "en_US",
    siteName: "vinay.systems",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vinay Vasamsetty — AI Operational Systems",
    description:
      "AI-powered operational systems, agentic platforms, and production SaaS — built to ship.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${lobster.variable} ${dmSans.variable} ${handjet.variable} scroll-smooth`}
    >
      <body className="min-h-screen overflow-x-hidden bg-bg font-sans text-text-primary antialiased">
        <JsonLd />
        <CursorRoot>{children}</CursorRoot>
      </body>
    </html>
  );
}
