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
  metadataBase: new URL("https://buanatourtravel-2rya-cki66bp43-irvans-projects-e50e03e6.vercel.app"),
  title: {
    default: "Buana Tour & Travel - Liburan Impian, Nyata Bersama Kami",
    template: "%s | Buana Tour & Travel",
  },
  description: "Buana Tour & Travel menawarkan paket wisata premium ke destinasi favorit dunia. Honeymoon trip, family holiday, corporate travel dengan layanan concierge-style dan itinerary terkurasi.",
  keywords: [
    "travel agency",
    "tour package",
    "paket wisata",
    "honeymoon trip",
    "family holiday",
    "corporate travel",
    "wisata jepang",
    "wisata korea",
    "wisata eropa",
    "agen travel indonesia",
    "buana tour",
  ],
  authors: [{ name: "Buana Tour & Travel" }],
  creator: "Buana Tour & Travel",
  publisher: "Buana Tour & Travel",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    alternateLocale: ["en_US"],
    url: "https://buanatourtravel-2rya-cki66bp43-irvans-projects-e50e03e6.vercel.app",
    siteName: "Buana Tour & Travel",
    title: "Buana Tour & Travel - Liburan Impian, Nyata Bersama Kami",
    description: "Paket wisata premium ke destinasi favorit dunia dengan layanan concierge-style dan itinerary terkurasi. Honeymoon, family, dan corporate travel.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Buana Tour & Travel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Buana Tour & Travel - Liburan Impian, Nyata Bersama Kami",
    description: "Paket wisata premium ke destinasi favorit dunia dengan layanan concierge-style dan itinerary terkurasi.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "google-site-verification-code-here",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-zinc-900`}
      >
        {children}
      </body>
    </html>
  );
}
