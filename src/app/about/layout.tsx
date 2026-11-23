import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — Ishwar T & We Dream Media",
  description:
    "Meet Ishwar T (@iamishwart), founder of We Dream Media — a cinematic video production & editing agency based in Mangalore, India. Filmmaker, content creator, and creative director.",
  alternates: { canonical: "https://wedreammedia.com/about" },
  openGraph: {
    title: "About — Ishwar T & We Dream Media",
    description:
      "Filmmaker, content creator & creative director. Founded by Ishwar T in Mangalore, India.",
    url: "https://wedreammedia.com/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
