import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
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


// ... other imports ...

import { dark } from "@clerk/themes";
import { ThemeProvider } from "@/components/providers/theme-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${newsreader.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased relative">
        <ClerkProvider
          appearance={{
            baseTheme: dark,
          }}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <JsonLd data={personSchema} />
            <JsonLd data={organizationSchema} />
            <JsonLd data={websiteSchema} />
            
            <div id="root">
              <div className="app-layout">
                {children}
              </div>
            </div>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
