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

import { JsonLd, personSchema, organizationSchema, websiteSchema } from "@/components/seo/JsonLd";
import type { Viewport } from "next";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.zaidsystems.dev"),
  title: {
    default: "Mohammed Zaid Khan | AI Systems Developer",
    template: "%s | Mohammed Zaid Khan",
  },
  description: "Official portfolio of Mohammed Zaid Khan. AI systems developer specializing in production-grade infrastructure, scalable backend systems, and intelligent automation platforms.",
  applicationName: "Zaid Systems",
  category: "Technology",
  keywords: [
    "Mohammed Zaid Khan", 
    "Mohammed Zaid Khan AI Developer",
    "Mohammed Zaid Khan Software Engineer",
    "Mohammed Zaid Khan Portfolio",
    "Mohammed Zaid Khan Zaid Systems", 
    "AI Developer Mumbai", 
    "Cybersecurity Engineer India", 
    "Rust Developer",
    "AI Agent Orchestration"
  ],
  authors: [{ name: "Mohammed Zaid Khan", url: "https://www.zaidsystems.dev" }],
  creator: "Mohammed Zaid Khan",
  publisher: "Mohammed Zaid Khan",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-IN": "/",
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    title: "Mohammed Zaid Khan | AI Systems Developer",
    description: "Building production-grade AI systems and scalable infrastructure.",
    url: "https://www.zaidsystems.dev",
    siteName: "Zaid Systems",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mohammed Zaid Khan - AI Systems Developer",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Zaid Khan | AI Systems Developer",
    description: "Building production-grade AI systems and scalable infrastructure.",
    images: ["/og-image.jpg"],
    creator: "@mrbilauta",
    site: "@mrbilauta",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Zaid Systems",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    "geo.region": "IN-MH",
    "geo.placename": "Mumbai",
    "geo.position": "19.0760;72.8777",
    "ICBM": "19.0760, 72.8777",
    "generator": "Next.js",
    "mobile-web-app-capable": "yes",
  }
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

import { ClientSideComponents } from "@/components/providers/ClientSideComponents";

// ... other imports ...

import { dark } from "@clerk/themes";
import { Analytics } from '@vercel/analytics/next';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "oklch(0.6 0.15 260)",
          colorBackground: "oklch(0.13 0 0)",
          colorInputBackground: "oklch(1 0 0 / 5%)",
          colorInputText: "white",
          borderRadius: "0.625rem",
        },
        elements: {
          card: "shadow-2xl border border-white/10 glass",
          navbar: "hidden",
          footer: "hidden",
          headerTitle: "tracking-tight font-bold",
          headerSubtitle: "text-muted-foreground",
          socialButtonsBlockButton: "border-white/10 hover:bg-white/5 transition-all",
          formButtonPrimary: "bg-primary hover:bg-primary/90 transition-all text-white font-bold",
        },
      }}
    >
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} dark`}
        suppressHydrationWarning
      >
        <body className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/30 relative">
          <JsonLd data={personSchema} />
          <JsonLd data={organizationSchema} />
          <JsonLd data={websiteSchema} />
          <ClientSideComponents />
          {/* Lowered z-index and improved opacity for the noise overlay to prevent portal interference */}
          <div className="fixed inset-0 bg-noise z-[1] pointer-events-none opacity-20" />
          <div className="relative z-10 flex flex-col min-h-screen">
            {children}
          </div>
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
