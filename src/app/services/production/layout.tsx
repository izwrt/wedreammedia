import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "We Dream Media: Cinematic Production" },
  description:
    "Cinematic video production by We Dream Media. Music videos, brand films, documentaries, live event coverage & podcast production in Mangalore, India.",
  alternates: {
    canonical: "https://wedreammedia.com/services/production",
  },
  openGraph: {
    title: "We Dream Media: Cinematic Production",
    description:
      "Music videos, brand films, documentaries & podcast production in Mangalore.",
    url: "https://wedreammedia.com/services/production",
  },
};

export default function ProductionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
