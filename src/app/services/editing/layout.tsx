import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Video Editing Services — Short-Form, Long-Form & More",
  description:
    "Professional video editing by We Dream Media. Instagram Reels, YouTube Shorts, TikTok edits, long-form YouTube videos, color grading, sound design & caption styling. By Ishwar T, Mangalore.",
  alternates: { canonical: "https://wedreammedia.com/services/editing" },
  openGraph: {
    title: "Video Editing — We Dream Media",
    description:
      "Short-form reels, long-form YouTube edits, color grading & sound design.",
    url: "https://wedreammedia.com/services/editing",
  },
};

export default function EditingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
