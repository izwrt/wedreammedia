import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cinematic Production — Music Videos, Brand Films & Podcasts",
  description:
    "Cinematic video production by We Dream Media. Music videos, brand films, documentaries, live event coverage & podcast production in Mangalore, India. Founded by Ishwar T (@iamishwart).",
  alternates: {
    canonical: "https://wedreammedia.com/services/production",
  },
  openGraph: {
    title: "Cinematic Production — We Dream Media",
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
