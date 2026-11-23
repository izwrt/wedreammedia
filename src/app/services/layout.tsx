import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Professional video production & editing services by We Dream Media. Cinematic music videos, short-form reels, brand films, podcast production & content strategy. Mangalore, India.",
  alternates: { canonical: "https://wedreammedia.com/services" },
  openGraph: {
    title: "We Dream Media: Our Services",
    description:
      "Video production, editing, brand films, podcasts & creator strategy.",
    url: "https://wedreammedia.com/services",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
