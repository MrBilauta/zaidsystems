import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { CursorSpotlight } from "@/components/ui/CursorSpotlight";
import { CommandPalette } from "@/components/ui/CommandPalette";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mohammed Zaid Khan | AI Systems Developer",
  description: "AI systems engineer building production-grade infrastructure, scalable backend systems, and intelligent automation platforms.",
  keywords: ["AI Systems Developer", "Backend Engineer", "Automation Engineer", "AI Infrastructure", "Rust Developer", "AI Agent Developer", "Mohammed Zaid Khan", "Zaid Systems", "Next.js"],
  authors: [{ name: "Mohammed Zaid Khan", url: "https://github.com/mrbilauta" }],
  openGraph: {
    title: "Mohammed Zaid Khan | AI Systems Developer",
    description: "Building production-grade AI systems and scalable infrastructure.",
    url: "https://zaidsystems.dev",
    siteName: "Zaid Systems",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Zaid Systems - AI Systems Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Zaid Khan | AI Systems Developer",
    description: "Building production-grade AI systems and scalable infrastructure.",
    images: ["/og-image.jpg"],
    creator: "@mrbilauta",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/30 relative">
        <ScrollProgress />
        <CursorSpotlight />
        <CommandPalette />
        <div className="fixed inset-0 bg-noise z-50 pointer-events-none" />
        {children}
      </body>
    </html>
  );
}
