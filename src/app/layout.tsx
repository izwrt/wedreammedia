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

const SITE = "https://wedreammedia.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "We Dream Media | Cinematic Video Production & Editing — Mangalore",
    template: "%s | We Dream Media",
  },
  description:
    "We Dream Media is a premium cinematic production & video editing agency founded by Ishwar T in Mangalore, India. Music videos, reels, brand films, podcast production & content strategy for creators. Follow @iamishwart on Instagram & YouTube.",
  keywords: [
    "We Dream Media", "wedreammedia", "we dream media", "WDM",
    "Ishwar T", "ishwar", "iamishwart",
    "video production Mangalore", "cinematic production Mangalore",
    "video editing agency", "content creator Mangalore",
    "music video production India", "short form editing",
    "reels editing", "YouTube editor", "TikTok editor",
    "podcast production", "brand films India",
    "Mangalore media", "Mangalore content creator",
    "cinematic video editor", "social media content",
    "video production agency India", "creator strategy",
  ],
  authors: [{ name: "Ishwar T", url: "https://instagram.com/iamishwart" }],
  creator: "Ishwar T",
  publisher: "We Dream Media",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  alternates: { canonical: SITE },
  openGraph: {
    title: "We Dream Media | Cinematic Video Production & Editing",
    description:
      "Premium cinematic production & video editing agency by Ishwar T. Music videos, reels, brand films, podcasts — Mangalore, India.",
    siteName: "We Dream Media",
    url: SITE,
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "We Dream Media — Cinematic Production & Editing Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "We Dream Media | Cinematic Video Production",
    description:
      "Premium cinematic production & video editing by Ishwar T (@iamishwart). Mangalore, India.",
    images: ["/og-image.png"],
    creator: "@iamishwart",
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
  verification: {},
  category: "media production",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

/** JSON-LD structured data so Google connects everything */
function StructuredData() {
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "We Dream Media",
    alternateName: ["WDM", "wedreammedia", "We Dream"],
    url: SITE,
    logo: `${SITE}/android-chrome-512x512.png`,
    image: `${SITE}/og-image.png`,
    description:
      "Premium cinematic production & video editing agency in Mangalore, India. Music videos, reels, brand films, podcasts & content strategy.",
    founder: {
      "@type": "Person",
      name: "Ishwar T",
      alternateName: "iamishwart",
      url: "https://instagram.com/iamishwart",
      sameAs: [
        "https://instagram.com/iamishwart",
        "https://youtube.com/@iamishwart",
        "https://instagram.com/wedreammedia",
        "https://youtube.com/@wedreammedia",
      ],
    },
    foundingLocation: {
      "@type": "Place",
      name: "Mangalore",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Mangalore",
        addressRegion: "Karnataka",
        addressCountry: "IN",
      },
    },
    sameAs: [
      "https://instagram.com/wedreammedia",
      "https://youtube.com/@wedreammedia",
      "https://instagram.com/iamishwart",
      "https://youtube.com/@iamishwart",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "ishwar@wedreammedia.com",
      contactType: "customer service",
    },
    knowsAbout: [
      "Cinematic Video Production",
      "Video Editing",
      "Music Video Production",
      "Short-Form Content",
      "Instagram Reels Editing",
      "YouTube Video Editing",
      "Podcast Production",
      "Brand Films",
      "Content Strategy",
      "Social Media Content Creation",
    ],
  };

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ishwar T",
    alternateName: "iamishwart",
    jobTitle: "Founder & Creative Director",
    worksFor: { "@type": "Organization", name: "We Dream Media" },
    url: "https://instagram.com/iamishwart",
    sameAs: [
      "https://instagram.com/iamishwart",
      "https://youtube.com/@iamishwart",
      "https://instagram.com/wedreammedia",
      "https://youtube.com/@wedreammedia",
      SITE,
    ],
    knowsAbout: [
      "Video Production",
      "Video Editing",
      "Content Creation",
      "Filmmaking",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mangalore",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "We Dream Media",
    alternateName: "wedreammedia",
    url: SITE,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "We Dream Media",
    image: `${SITE}/og-image.png`,
    url: SITE,
    email: "ishwar@wedreammedia.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mangalore",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 12.9141,
      longitude: 74.856,
    },
    areaServed: [
      { "@type": "City", name: "Mangalore" },
      { "@type": "Country", name: "India" },
    ],
    priceRange: "$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "21:00",
    },
    sameAs: [
      "https://instagram.com/wedreammedia",
      "https://youtube.com/@wedreammedia",
      "https://instagram.com/iamishwart",
      "https://youtube.com/@iamishwart",
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
    </>
  );
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} antialiased`}>
      <head>
        <StructuredData />
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
