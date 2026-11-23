import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "We Dream Media: Short-Form Editing" },
  description:
    "Scroll-stopping short-form video editing by We Dream Media. Instagram Reels, YouTube Shorts & TikTok — trending captions, transitions, sound design & beat-sync. Explore caption styles live.",
  alternates: {
    canonical: "https://wedreammedia.com/services/editing/short-form",
  },
  openGraph: {
    title: "We Dream Media: Short-Form Editing",
    description:
      "Instagram Reels, TikTok & Shorts editing with trending captions & transitions.",
    url: "https://wedreammedia.com/services/editing/short-form",
  },
};

export default function ShortFormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
