import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet Ishwar T, founder of We Dream Media — a cinematic video production & editing agency based in Mangalore, India. Filmmaker, content creator, and creative director.",
  alternates: { canonical: "https://wedreammedia.com/about" },
  openGraph: {
    title: "We Dream Media: About Us",
    description:
      "Filmmaker, content creator & creative director. Founded by Ishwar T in Mangalore, India.",
    url: "https://wedreammedia.com/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
