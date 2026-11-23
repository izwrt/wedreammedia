import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Short-Form Editing — Reels, TikTok & YouTube Shorts",
  description:
    "Scroll-stopping short-form video editing by We Dream Media. Instagram Reels, YouTube Shorts & TikTok — trending captions, transitions, sound design & beat-sync. Explore caption styles live.",
  alternates: {
    canonical: "https://wedreammedia.com/services/editing/short-form",
  },
  openGraph: {
    title: "Short-Form Editing — We Dream Media",
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
