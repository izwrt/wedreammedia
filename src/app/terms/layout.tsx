import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms & conditions, payment policy, revision policy, and cancellation policy for We Dream Media video production & editing services.",
  alternates: { canonical: "https://wedreammedia.com/terms" },
  robots: { index: true, follow: true },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
