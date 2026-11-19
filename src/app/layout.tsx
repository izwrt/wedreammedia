import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "We Dream Media | Creative Agency",
  description:
    "Turning visions into digital reality. We Dream Media is a high-end creative agency specializing in video, design, and digital experiences.",
  metadataBase: new URL("https://wedreammedia.com"),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "We Dream Media | Creative Agency",
    description: "Turning visions into digital reality.",
    siteName: "We Dream Media",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} antialiased`}>
      <head>
        {/* Preconnect to font & video CDNs */}
        <link rel="preconnect" href="https://use.typekit.net" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://p.typekit.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googleapis.com" />
        {/* Preload hero video for instant playback */}
        <link rel="preload" href="/hero-reel.mp4" as="video" type="video/mp4" />
      </head>
      <body className="min-h-screen" suppressHydrationWarning>
        <link
          rel="stylesheet"
          href="https://use.typekit.net/wqh8aje.css"
          precedence="default"
        />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
